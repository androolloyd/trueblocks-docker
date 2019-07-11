FROM python:3.7 as builder

WORKDIR /root

RUN curl https://dl.google.com/go/go1.12.7.linux-amd64.tar.gz --output go1.12.7.linux-amd64.tar.gz && \
	tar -C /usr/local -xzf go1.12.7.linux-amd64.tar.gz && \
	ln -s /usr/local/go/bin/* /usr/local/bin/

RUN apt-get update && \
	apt-get install -y \
	build-essential \
	cmake \
	git \
	nano \
	libcurl3-dev

ADD https://api.github.com/repos/Great-Hill-Corporation/trueblocks-core/git/refs/heads/develop version.json
RUN git clone -b 'develop' --single-branch --progress \ 
	https://github.com/Great-Hill-Corporation/trueblocks-core \
	/root/quickBlocks-src

RUN cd /root/quickBlocks-src && \
	mkdir -v build /root/.quickBlocks && \
	cd build && \
	cmake ../src && \
	make && \
	cp ../src/other/install/quickBlocks.toml /root/.quickBlocks/quickBlocks.toml && \
	cp ../src/other/install/blockScrape.docker.toml /root/.quickBlocks/blockScrape.toml

FROM node:slim as base
WORKDIR /root

RUN apt-get update && apt-get install -y libcurl3-dev python procps
COPY src /root/api
COPY --from=builder /root/quickBlocks-src/bin /usr/local/bin
COPY --from=builder /root/.quickBlocks /root/.quickBlocks
RUN cd /root/api && \
	npm install && \
	npm install -g forever && \
	mkdir /root/.quickBlocks/monitors
COPY trueblocks.entrypoint.sh /root

EXPOSE 80

ENTRYPOINT bash /root/trueblocks.entrypoint.sh
