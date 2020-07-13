import React from "react";
import { NavLink } from "react-router-dom";

const LogoBox = ({ user, me }) => {
  return (
    <div className="logo-box">
      {user && (
        <NavLink aria-label="to login" className="" to="/user">
          <button className="button-loginmenu  flex items-center">
            <div className="absolute top-0 left-0"></div>
            <img className="h-25 w-25" src="/img/feather/user.svg" alt="" />
            <span className="pr-7"></span>
            {me.name}
          </button>
        </NavLink>
      )}
      {!user && (
        <NavLink aria-label="to login" className="" to="/login">
          <button className="button-loginmenu">login</button>
        </NavLink>
      )}
      {/* <NavLink aria-label="to loginreact" className="" to="/loginreact">
        <button className="button-loginreact">loginreact</button>
      </NavLink> */}
      <div className="hetkookt-logo">
        <NavLink to="/">
          <img src="/img/icons/hetkookt.png" alt="logo hetkookt" />
        </NavLink>
      </div>
    </div>
  );
};

export default LogoBox;
