#!/bin/bash
set -ex
CONFIG_FILE=/root/.local/share/trueblocks/trueBlocks.toml
BLOCKSCRAPE_FILE=/root/.local/share/trueblocks/blockScrape.toml
MANIFEST_DIR=/root/.local/share/trueblocks/manifest
export DOCKER_MODE=true

chifra --version

if [ "$IS_API" -eq "1" ]; then
  chifra serve --port 0.0.0.0:8080
else

mkdir -p $MANIFEST_DIR

# write the RPC provider to quickBlocks.toml:
# write the RPC provider to quickBlocks.toml
if grep -q rpcProvider "$CONFIG_FILE"; then
    sed -i "s|rpcProvider =.*|rpcProvider = \"$RPC_PROVIDER\"|" $CONFIG_FILE
    sed -i "s|etherscan_key =.*|etherscan_key = \"$ETHERSCAN_KEY\"|" $CONFIG_FILE
else
    echo "Writing RPC provider for the first run"
    echo "rpcProvider = \"$RPC_PROVIDER\"" >> $CONFIG_FILE
    echo "etherscan_key = \"$ETHERSCAN_KEY\"" >> $CONFIG_FILE
fi
# create blockScrape.toml as a workaround for https://github.com/TrueBlocks/trueblocks-core/issues/1577
# (if this file is missing, RPC returns empty response)
if [ ! -f "$BLOCKSCRAPE_FILE" ]; then
    touch $BLOCKSCRAPE_FILE
    echo "[requires]" >> "$BLOCKSCRAPE_FILE"
    echo "tracing=false" >> "$BLOCKSCRAPE_FILE"
    cat $BLOCKSCRAPE_FILE
fi

  chifra init -k
fi

# the host has to be set to 0.0.0.0, otherwise Docker will refuse connections
