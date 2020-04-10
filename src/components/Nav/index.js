import React, { useState } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import Search from "../Search";
import Productenfilter from "../Productenfilter";
import useCurrentWidth from "../common/use-current-width";
import { kalender } from "../common/common";
import NavAdd from "./NavAdd";

const Nav = ({ user, thecart, sorts, ...props }) => {
  const [isOn, setIsOn] = useState(false);
  const [visible, setVisible] = useState(false);
  const width = useCurrentWidth();
  const recipes = props.recipes;
  const location = props.location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    console.log("isopen?");
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  console.log("props");
  console.log(props);
  console.log("user");
  console.log(user);

  const favorites = thecart.filter((c) => c.favorite === true);
  // console.log("favorites.length");
  // console.log(favorites.length);

  const handleMouseDown = (e) => {
    toggleMenu();
    toggleSwitch();
    e.stopPropagation();
  };

  const toggleMenu = () => {
    setVisible(!visible);
  };

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  // function toggle() {
  //   isOn ? setIsOn(false) : setIsOn(true);
  // }

  const isMobile = width <= 992;
  var visibility = "hide";
  var expanded = "false";
  if (visible) {
    visibility = "show";
    expanded = "true";
  }

  return (
    <>
      <div className="w-full bg-white px-20 py-15 mb-15">
        <div className="flex items-center">
          <Link className="" to="/">
            <div
              className="flex items-center"
              onClick={isOn ? handleMouseDown : null}
            >
              <img src="/img/icons/hetkookt.svg" alt="" />
              <span className="hidden lg:block font-400 tracking-normal text-30 pl-10">
                <span className="font-400 text-28">het</span>kookt
              </span>
            </div>
          </Link>
          <Search recipes={recipes} />
          <div
            className={`navbox-panel ${isOn ? visibility : null}`}
            id="navPanel"
            onClick={isMobile ? handleMouseDown : null}
            aria-expanded={expanded}
          >
            <div className="navbar">
              {!user && (
                <NavLink className="" to="/login">
                  <div className="">login</div>
                </NavLink>
              )}
              {user && (
                // <NavLink className="" to="/user">
                <button onClick={() => handleIsOpen()}>
                  <div className={`flex items-center mr-24 text-19 font-300`}>
                    <span className="pr-5">kookschrift</span>
                    <img className="w-25" src="/img/feather/user.svg" alt="" />
                  </div>
                </button>

                // </NavLink>
              )}
            </div>
            <NavAdd isOpen={isOpen} user={user} thecart={thecart} />
          </div>
          <div className="relative">
            <button
              onClick={handleMouseDown}
              className={isOn ? "hamburger navbox--menu-open" : "hamburger"}
              aria-label="Open Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      <div className="container-x">
        {location === "/" ? <Productenfilter sorts={sorts} /> : null}
      </div>
    </>
  );
  // }
};

export default withRouter(Nav);
