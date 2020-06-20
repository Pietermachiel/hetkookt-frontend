import React from "react";
import { NavLink } from "react-router-dom";
import { kalender } from "../common/common.js";

const NavAdd = ({ user, handleIsOpen, isOpen, thecart, thefavorites }) => {
  const thedates = kalender.filter((k) => {
    const item = thecart.find((c) => (c.date ? c.date.includes(k.year) : null));
    return item;
  });

  return (
    <div className="container-x nav-add">
      <div
        onClick={handleIsOpen}
        className={`w-500 font-500 text-white text-24 px-30 p-36 add-panel ${
          isOpen ? "add-panel__open" : null
        }`}
      >
        <NavLink aria-label="to home" className="text-white " to="/">
          <div onClick={handleIsOpen} className="flex items-center mb-18">
            <img className="w-25" src="/img/feather/home.svg" alt="" />
            <span className="pl-12 text-24 hover:text-black">home</span>
          </div>
        </NavLink>
        <NavLink aria-label="to home" className="text-white " to="/waarom">
          <div onClick={handleIsOpen} className="flex items-center mb-18">
            <img className="w-25" src="/img/feather/help-circle.svg" alt="" />
            <span className="pl-12 text-24 hover:text-black">
              waarom het kookt
            </span>
          </div>
        </NavLink>
        <NavLink aria-label="to books" className="" to="/books">
          <div onClick={handleIsOpen} className="flex items-center mb-18">
            <img className="w-25" src="/img/feather/book.svg" alt="" />
            <span className="pl-12 hover:text-black">
              boekentop<span className="text-22">100</span>
            </span>
          </div>
        </NavLink>
        <div className="hairline"></div>
        <div className="font-300 mb-15">recepten</div>
        <NavLink aria-label="to home" className="text-white " to="/">
          <div onClick={handleIsOpen} className="flex items-center mb-18">
            <img
              className="h-36 w-initial"
              src="/img/icons/tomaat2.svg"
              alt=""
            />
            <span className="pl-12 text-24 hover:text-black">ingrediënten</span>
          </div>
        </NavLink>
        <NavLink aria-label="to home" className="text-white " to="/">
          <div onClick={handleIsOpen} className="flex items-center mb-18">
            <img
              className="h-36 w-initial"
              src="/img/icons/flame3.svg"
              alt=""
            />
            <span className="pl-12 text-24 hover:text-black">gerechten</span>
          </div>
        </NavLink>
        {/* <span onClick={handleIsOpen} className="flex items-center mb-18">
            <NavLink aria-label="to home" className="text-white " to="/">
              <span className={`pl-12 text-24 font-300 hover:text-black`}>
                hoe
              </span>
            </NavLink>
          </span> */}
        <div className="hairline"></div>
        <div className="font-300 mb-15">user</div>
        {user && (
          <NavLink aria-label="to user" className="" to="/user">
            <div onClick={handleIsOpen} className="flex items-center mb-18">
              <img className="w-25" src="/img/feather/user.svg" alt="" />
              <span className="pl-12 hover:text-black">{user.name}</span>
            </div>
          </NavLink>
        )}
        {!user && (
          <NavLink aria-label="to user" className="" to="/user">
            <div onClick={handleIsOpen} className="flex items-center mb-18">
              <img className="w-25" src="/img/feather/user.svg" alt="" />
              <span className="pl-12 hover:text-black">gebruikersprofiel</span>
            </div>
          </NavLink>
        )}{" "}
        <NavLink aria-label="to weekmenu" className="" to="/weekmenu">
          <div onClick={handleIsOpen} className="flex items-center mb-18 mt-0">
            <img className="w-25" src="/img/feather/list.svg" alt="" />
            <span className="pl-12 font-300 hover:text-black">
              weekmenu
              <span className="text-red-300">&nbsp;{thedates.length}</span>
            </span>
          </div>
        </NavLink>
        <NavLink aria-label="to favorites" className="" to="/boodschappen">
          <div onClick={handleIsOpen} className="flex items-center mb-18">
            <img className="w-25" src="/img/feather/shopping-cart.svg" alt="" />
            <span className="pl-12 font-300 hover:text-black">
              boodschappen
              <span className="text-red-300">&nbsp;{thefavorites.length}</span>
            </span>
          </div>
        </NavLink>
        <NavLink aria-label="to favorites" className="" to="/favorites">
          <div onClick={handleIsOpen} className="flex items-center mb-18">
            <img className="w-25" src="/img/feather/bookmark.svg" alt="" />
            <span className="pl-12 font-300 hover:text-black">
              favorieten
              <span className="text-red-300">&nbsp;{thefavorites.length}</span>
            </span>
          </div>
        </NavLink>
        {user && (
          <NavLink aria-label="to logout" className="" to="/logout">
            <div onClick={handleIsOpen} className="flex items-center">
              <img className="w-25" src="/img/feather/logout.svg" alt="" />
              <span className="pl-12 text-indigo-700 font-500 hover:text-black">
                logout >
              </span>
            </div>
          </NavLink>
        )}
        {!user && (
          <NavLink aria-label="to logout" className="" to="/login">
            <div onClick={handleIsOpen} className="flex items-center">
              <img className="w-25" src="/img/feather/logout.svg" alt="" />
              <span className="pl-12 text-indigo-700 font-500 hover:text-black">
                login >
              </span>
            </div>
          </NavLink>
        )}
        {/* <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
          modi eum vero id, non nemo maxime perspiciatis dignissimos quod minima
          illo ex illum culpa nisi laboriosam obcaecati vitae ullam neque.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
          modi eum vero id, non nemo maxime perspiciatis dignissimos quod minima
          illo ex illum culpa nisi laboriosam obcaecati vitae ullam neque.
        </p> */}
      </div>
    </div>
  );
};

export default NavAdd;
