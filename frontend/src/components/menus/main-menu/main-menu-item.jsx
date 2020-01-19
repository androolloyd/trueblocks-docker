import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Chevron from './chevron';

export default function MainMenuItem({ id, active: mainMenuActive, page, items, onClick }) {
  const subMenuPresent = items && items.length > 0;
  const toLocation = '/' + (subMenuPresent ? page.toLowerCase() : '');
  const onThisMenuClick = onClick.bind(null, { menuId: id });

  const subMenu = (() => {
    if (!subMenuPresent || !mainMenuActive) return null;

    return items.map((item, index) => {
      if (item.subpage.includes('-')) return null;

      return <MainMenuItem key={index} page={page} item={item} onClick={onThisMenuClick} />;
    });
  })();

  return (
    <Fragment>
      <NavLink
        className="menu-item"
        activeClassName="is-active"
        exact={!subMenuPresent}
        onClick={onThisMenuClick}
        to={toLocation}
      >
        <span>{page}</span>
        {subMenuPresent ? <Chevron active={mainMenuActive} /> : null}
      </NavLink>
      {subMenu}
    </Fragment>
  );
}

/*
import React from 'react';
import { NavLink } from 'react-router-dom';
import MainMenuItem from './main-menu-item';
import Chevron from './chevron';

export default function MainMenuItem({ item, page, onClick }) {
  const to = `/${page}/${item.subpage.replace(' ', '_')}/${item.route}+${item.query}`;

  return (
    <NavLink className="submenu-item" activeClassName="is-active" to={to} onClick={onClick}>
      {item.subpage}
    </NavLink>
  );
}
*/