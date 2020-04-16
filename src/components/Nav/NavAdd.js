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
    <div className="add">
      <div
        onClick={handleIsOpen}
        className={`px-30 p-36 add-panel ${isOpen ? "add-panel__open" : null}`}
      >
        <NavWeekmenu props={props} thecart={thecart} user={user} />
        {/* <p className="maandjaar">loguit</p> */}
        <NavLink className="" to="/weekmenu">
          <div onClick={handleIsOpen} className="flex items-center mb-18 mt-0">
            <img className="w-25" src="/img/feather/list.svg" alt="" />
            <span className="pl-12 text-gray-500 hover:text-black">
              weekmenu
            </span>
            {/* <span className="pr-5">{props.user.name}</span> */}
          </div>
        </NavLink>
        <NavLink className="" to="/favorites">
          <div onClick={handleIsOpen} className="flex items-center mb-18">
            <img className="w-25" src="/img/feather/bookmark-red.svg" alt="" />
            <span className="pl-12 text-gray-500 hover:text-black">
              kookschrift{" "}
              <span className="text-red-500">{favorites.length}</span>
            </span>
            {/* <span className="pr-5">{props.user.name}</span> */}
          </div>
        </NavLink>
        <NavLink className="" to="/user">
          <div onClick={handleIsOpen} className="flex items-center mb-18">
            <img className="w-25" src="/img/feather/user.svg" alt="" />
            <span className="pl-12 text-gray-500 hover:text-black">
              gebruikersprofiel
            </span>
            {/* <span className="pr-5">{props.user.name}</span> */}
          </div>
        </NavLink>
        <NavLink className="" to="/logout">
          <div onClick={handleIsOpen} className="flex items-center">
            <img className="w-25" src="/img/feather/logout.svg" alt="" />
            <span className="pl-12 text-blue-500 font-600">logout ></span>
            {/* <span className="pr-5">{props.user.name}</span> */}
          </div>
        </NavLink>

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
