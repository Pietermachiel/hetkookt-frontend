import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  dedag,
  hetjaar,
  slugify,
  kalender,
  theweek,
} from "../common/common.js";

const NavAdd = ({ favorites, handleIsOpen, isOpen, thecart, ...props }) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const handleIsOpen = () => {
  //   console.log("isopen?");
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="add">
      <div
        onMouseLeave={handleIsOpen}
        className={`add-panel ${isOpen ? "add-panel__open" : null}`}
      >
        <div onClick={handleIsOpen} className="zetophetweekmenu-box">
          <NavLink className="" to="/weekmenu">
            <div
              onClick={handleIsOpen}
              className="flex items-center ml-20 mt-20"
            >
              <img className="w-25" src="/img/feather/list-orange.svg" alt="" />
              <span className="pl-12">weekmenu</span>
              {/* <span className="pr-5">{props.user.name}</span> */}
            </div>
          </NavLink>
          {/* <button className="btn-menu" onClick={() => handleIsOpen()}>
            <svg width="100" height="100" viewBox="0 0 50 50">
              <path d="M14.691,13.382l21.101,21.101" />
              <path d="M35.792,13.382l-21.102,21.101" />
            </svg>
          </button> */}
        </div>

        <div className="mt-10 grid grid-cols-4 gap-10 pt-24 px-24">
          {kalender.map((k, xid) => {
            var cart = thecart.filter((c) =>
              c.date ? c.date.includes(k.year) : null
            );
            return (
              <div
                key={k.index}
                // onClick={() => handleSave(therecipe, hetjaar(xid))}
                className={`relative ${
                  cart.length !== 0 ? "bg-orange-400" : "bg-gray-400"
                } text-black rounded-50 h-48 w-48 mb-20`}
              >
                <div className="absolute inset-0">
                  <span className="flex justify-center pt-12">{k.index}</span>
                </div>
                <div className="absolute inset-0">
                  <span className="flex justify-center kalender-index">
                    {/* {k.day !== "vandaag" ? k.index : null} */}
                    {k.day.slice(0, 2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* <p className="maandjaar">loguit</p> */}
        <NavLink className="" to="/favorites">
          <div onClick={handleIsOpen} className="flex items-center ml-20 mb-9">
            <img className="w-25" src="/img/feather/bookmark.svg" alt="" />
            <span className="pl-12">
              kookschrift{" "}
              <span className="text-red-500">{favorites.length}</span>
            </span>
            {/* <span className="pr-5">{props.user.name}</span> */}
          </div>
        </NavLink>
        <NavLink className="" to="/user">
          <div onClick={handleIsOpen} className="flex items-center ml-20 mb-9">
            <img className="w-25" src="/img/feather/user.svg" alt="" />
            <span className="pl-12">gebruikersprofiel</span>
            {/* <span className="pr-5">{props.user.name}</span> */}
          </div>
        </NavLink>
        <NavLink className="" to="/logout">
          <div onClick={handleIsOpen} className="flex items-center ml-20 mb-9">
            <img className="w-25" src="/img/feather/logout.svg" alt="" />
            <span className="pl-12 text-blue-500">logout ></span>
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
