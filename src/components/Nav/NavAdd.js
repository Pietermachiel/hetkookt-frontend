import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import NavWeekmenu from "./NavWeekmenu";
import {
  dedag,
  hetjaar,
  slugify,
  kalender,
  theweek,
} from "../common/common.js";

const NavAdd = ({
  user,
  favorites,
  handleIsOpen,
  isOpen,
  thecart,
  ...props
}) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const handleIsOpen = () => {
  //   console.log("isopen?");
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="nav-add">
      <div
        onClick={handleIsOpen}
        className={`w-500 font-500 text-white text-24 px-30 p-36 add-panel ${
          isOpen ? "add-panel__open" : null
        }`}
      >
        {/* <NavWeekmenu props={props} thecart={thecart} user={user} /> */}
        {/* <p className="maandjaar">loguit</p> */}
        <NavLink className="text-white " to="/">
          <div onClick={handleIsOpen} className="flex items-center mb-18">
            <img className="w-25" src="/img/feather/home.svg" alt="" />
            <span className="pl-12 hover:text-black">home</span>
            {/* <span className="pr-5">{props.user.name}</span> */}
          </div>
        </NavLink>
        <NavLink className="" to="/weekmenu">
          <div onClick={handleIsOpen} className="flex items-center mb-18 mt-0">
            <img className="w-25" src="/img/feather/list.svg" alt="" />
            <span className="pl-12 hover:text-black">weekmenu</span>
            {/* <span className="pr-5">{props.user.name}</span> */}
          </div>
        </NavLink>
        <NavLink className="" to="/favorites">
          <div onClick={handleIsOpen} className="flex items-center mb-18">
            <img className="w-25" src="/img/feather/bookmark.svg" alt="" />
            <span className="pl-12 hover:text-black">
              kookschrift
              <span className="text-red-300">&nbsp;{favorites.length}</span>
            </span>
          </div>
        </NavLink>
        <NavLink className="" to="/books">
          <div onClick={handleIsOpen} className="flex items-center mb-18">
            <img className="w-25" src="/img/feather/book.svg" alt="" />
            <span className="pl-12 hover:text-black">
              boekentop<span className="text-22">100</span>
            </span>
          </div>
        </NavLink>
        {user && (
          <NavLink className="" to="/user">
            <div onClick={handleIsOpen} className="flex items-center mb-18">
              <img className="w-25" src="/img/feather/user.svg" alt="" />
              <span className="pl-12 hover:text-black">{user.name}</span>
            </div>
          </NavLink>
        )}
        {!user && (
          <NavLink className="" to="/user">
            <div onClick={handleIsOpen} className="flex items-center mb-18">
              <img className="w-25" src="/img/feather/user.svg" alt="" />
              <span className="pl-12 hover:text-black">gebruikersprofiel</span>
            </div>
          </NavLink>
        )}
        {user && (
          <NavLink className="" to="/logout">
            <div onClick={handleIsOpen} className="flex items-center">
              <img className="w-25" src="/img/feather/logout.svg" alt="" />
              <span className="pl-12 text-indigo-700 font-500 hover:text-black">
                logout >
              </span>
            </div>
          </NavLink>
        )}
        {!user && (
          <NavLink className="" to="/login">
            <div onClick={handleIsOpen} className="flex items-center">
              <img className="w-25" src="/img/feather/logout.svg" alt="" />
              <span className="pl-12 text-indigo-700 font-500 hover:text-black">
                login >
              </span>
            </div>
          </NavLink>
        )}

        {/* <NavLink to="/logout">
          <div className="pl-60" onClick={handleIsOpen}>
            loguit >
          </div>
        </NavLink> */}
      </div>
    </div>
  );
};

export default NavAdd;
