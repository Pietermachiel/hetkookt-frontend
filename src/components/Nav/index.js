import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink, withRouter } from "react-router-dom";
import Search from "../Search";
// import CategoriesFilter from "../CategoriesFilter";
// import useCurrentWidth from "../common/use-current-width";
// import { kalender } from "../common/common";
import NavAdd from "./NavAdd";

const Nav = ({ user, thecart, ...props }) => {
  const [isOn, setIsOn] = useState(false);
  const [visible, setVisible] = useState(false);
  // const width = useCurrentWidth();
  const recipes = props.recipes;
  // const location = props.location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    // console.log("isopen?");
    setIsOpen(!isOpen);
    toggleSwitch();
    // console.log(isOpen);
  };
  // console.log("props");
  // console.log(props);
  // console.log("user");
  // console.log(user);

  const favorites = thecart.filter((c) => c.favorite === true);
  // console.log("favorites.length");
  // console.log(favorites.length);

  const handleMouseDown = (e) => {
    toggleMenu();
    toggleSwitch();
    setIsOpen(!isOpen);
    e.stopPropagation();
  };

  const toggleMenu = () => {
    setVisible(!visible);
  };

  const toggleSwitch = () => {
    setIsOn(!isOn);
    // console.log(isOn);
  };

  // function toggle() {
  //   isOn ? setIsOn(false) : setIsOn(true);
  // }

  // const isMobile = width <= 992;
  // var visibility = "hide";
  // var expanded = "false";
  // if (visible) {
  //   visibility = "show";
  //   expanded = "true";
  // }

  return (
    <>
      <Helmet>
        <html className={isOpen ? "menu-open" : null} />
      </Helmet>
      <div className="w-full bg-white md:px-25 xl:px-60 pt-10 mb-15">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div
            className="flex items-center pl-15 md:pl-0 lg:-mt-12 mr-36"
            onClick={isOn ? handleMouseDown : null}
          >
            <img
              className="w-40 h-40 pr-5 mr-5"
              src="/img/icons/koksmuts_c.svg"
              alt=""
            />
            <div className="flex items-center block font-700 text-rood tracking-wide text-36 pl-5 pr-36">
              <Link
                aria-label="logo hetkookt"
                // className=""
                to="/"
              >
                <span className="font-500 text-32 pr-1">het</span>
                kookt
              </Link>
            </div>
          </div>
          <div className="flex items-baseline sm:justify-between w-full">
            <ul className="hidden lg:flex text-21 ">
              <li className="mb-0 font-500 hover:text-red-500">
                <span className="font-300 pr-1">wat</span>/
              </li>
              <li className="mb-0 mr-24 font-500 hover:text-red-500">
                <span className="font-300 pr-1">hoe</span>
              </li>
              <li className="mb-0 font-500 hover:text-red-500">
                <span className="font-300 pr-1">waarom</span>hetkookt
              </li>
            </ul>
            {!user && (
              <div className="absolute right-0 -mt-60 sm:-mt-30 md:mt-0 md:relative md:mr-36">
                <NavLink aria-label="login" to="/login">
                  <p className="mt-15 mr-60 md:mt-18 md:mr-0 font-300 text-21">
                    login
                  </p>
                </NavLink>
              </div>
            )}
            {user && (
              <div className="absolute right-0 md:relative md:mr-36">
                <NavLink aria-label="user" to="/user">
                  <p className="mt-15 mr-60 md:mt-18 md:mr-0 font-300 text-21">
                    {user.name}
                  </p>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`navbox-panel ${isOpen ? "show " : null}`} id="navPanel">
        {/* <img src="/img/icons/hetkookt-oowit.svg" alt="" /> */}
        <NavAdd
          handleIsOpen={handleIsOpen}
          isOpen={isOpen}
          user={user}
          thecart={thecart}
          favorites={favorites}
        />
      </div>
      <div className="hamburger-box">
        <button
          aria-label="hamburger menu"
          onClick={handleMouseDown}
          className={isOn ? "hamburger navbox--menu-open" : "hamburger"}
          aria-label="Open Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </>
  );
  // }
};

export default withRouter(Nav);
