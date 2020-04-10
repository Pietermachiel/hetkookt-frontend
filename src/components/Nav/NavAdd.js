import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  dedag,
  hetjaar,
  slugify,
  kalender,
  theweek,
} from "../common/common.js";

const NavAdd = ({ isOpen, thecart, ...props }) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const handleIsOpen = () => {
  //   console.log("isopen?");
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="add">
      <div className={`add-panel ${isOpen ? "add-panel__open" : null}`}>
        <div className="zetophetweekmenu-box">
          <Link to="/weekmenu">
            <h6 className="pt-24 pb-5 mx-auto">weekmenu</h6>
          </Link>
          {/* <button className="btn-menu" onClick={() => handleIsOpen()}>
            <svg width="100" height="100" viewBox="0 0 50 50">
              <path d="M14.691,13.382l21.101,21.101" />
              <path d="M35.792,13.382l-21.102,21.101" />
            </svg>
          </button> */}
        </div>

        <div className="mt-10 grid grid-cols-4 gap-10 p-24">
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
        <NavLink className="" to="/user">
          <div className="flex items-center mr-20">
            <span className="pr-5">gebruikersprofiel</span>
            {/* <span className="pr-5">{props.user.name}</span> */}
            {/* <img className="w-25" src="/img/feather/user.svg" alt="" /> */}
          </div>
        </NavLink>
        <NavLink className="" to="/favorites">
          <div className="flex items-center mr-20">
            <span className="pr-5">favorieten</span>
            {/* <span className="pr-5">{props.user.name}</span> */}
            {/* <img className="w-25" src="/img/feather/user.svg" alt="" /> */}
          </div>
        </NavLink>
        <div>loguit</div>
      </div>
    </div>
  );
};

export default NavAdd;
