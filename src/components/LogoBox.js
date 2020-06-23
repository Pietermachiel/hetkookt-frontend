import React from "react";
import { NavLink } from "react-router-dom";

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
          <img src="/img/icons/hetkookt.png" alt="logo hetkookt" />
        </NavLink>
      </div>
    </div>
  );
};

export default LogoBox;
