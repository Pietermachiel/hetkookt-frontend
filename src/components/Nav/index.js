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
      <div className="w-full bg-white md:px-20 pt-10 mb-15">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <Link aria-label="logo hetkookt" className="" to="/">
            <div
              className="flex items-center pl-15 md:pl-0"
              onClick={isOn ? handleMouseDown : null}
            >
              <img
                className="w-40 h-40 pr-5 mr-5"
                src="/img/icons/koksmuts.png"
                alt=""
              />
              <div className="flex items-baseline">
                <div className="hetkookt_logo block font-700 text-rood tracking-wide text-36 pl-5 pr-18">
                  <span className="font-500 text-32 pr-1">het</span>
                  kookt
                </div>
                <ul className="flex text-21">
                  {/* <li className="mb-0 mr-18 font-500 hover:text-red-500">
                  <span className="font-300">wat</span>hetkookt
                </li> */}
                  <li className="mb-0 mr-18 font-500 hover:text-red-500">
                    <span className="font-300">waarom</span>hetkookt
                  </li>
                  {/* <li className="mb-0 mr-18 font-500 hover:text-red-500">
                  <span className="font-300">hoe</span>hetkookt
                </li> */}
                </ul>
              </div>
            </div>
          </Link>
          {/* <Search recipes={recipes} /> */}

          {!user && (
            <div className="absolute right-0 md:relative md:mr-36">
              <NavLink aria-label="login" to="/login">
                <p className="mt-15 mr-60 md:mt-18 md:mr-0 font-300 text-21">
                  login
                </p>
              </NavLink>
            </div>
          )}
        </div>
        <div
          className={`navbox-panel ${isOpen ? "show " : null}`}
          id="navPanel"
          // onClick={isMobile ? handleMouseDown : null}
          // aria-expanded={expanded}
        >
          {/* <div className="navbar">
              {!user && (
                <NavLink className="" to="/login">
                  <div className="">login</div>
                </NavLink>
              )}
              {user && (
                // <NavLink className="" to="/user">
                <button onClick={() => handleIsOpen()}>
                  <div className={`flex items-center mr-24 text-19 font-300`}>
                    <span className="pr-5">
                      <span className="text-red-500 pr-10">
                        {favorites.length}
                      </span>
                      {user.name}
                    </span>
                    <img className="w-25" src="/img/feather/user.svg" alt="" />
                  </div>
                </button>

                // </NavLink>
              )}
            </div> */}
          <img src="/img/icons/hetkookt-oowit.svg" alt="" />
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
      </div>
    </>
  );
  // }
};

export default withRouter(Nav);
