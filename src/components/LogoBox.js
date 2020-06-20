import React from "react";
import { Link, NavLink } from "react-router-dom";

const LogoBox = ({ user, me }) => {
  return (
    <div className="logo-box">
      {user && (
        <NavLink aria-label="to login" className="" to="/user">
          <button className="button-loginmenu">{me.name}</button>
        </NavLink>
      )}
      {!user && (
        <NavLink aria-label="to login" className="" to="/login">
          <button className="button-loginmenu">login</button>
        </NavLink>
      )}
      <div className="hetkookt-logo">
        <NavLink to="/">
          <img src="/img/icons/hetkookt.png" alt="" />
        </NavLink>
      </div>
      {/* <div className="logo-hetkookt">
        h
        <span className="shift">
          <span>e</span>
        </span>
        t <br />
        kookt
      </div> */}
    </div>
  );
};

export default LogoBox;
