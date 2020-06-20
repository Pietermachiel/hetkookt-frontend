import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink, withRouter } from "react-router-dom";
import NavAdd from "./NavAdd";
import Search from "../Search";
import CollectionsFilter from "../CollectionsFilter";
import CategoriesFilter from "../CategoriesFilter";
// import NavAccordion from "./NavAccordion";

const Nav = ({
  user,
  dishes,
  recipes,
  categories,
  thefavorites,
  thecart,
  ...props
}) => {
  const [isOn, setIsOn] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // console.log("user");
  // console.log(user.name);
  // console.log("props nav");
  // console.log(props);

  if (user) {
    var name = user.name;
    if (name === undefined) return "";
    var namestring = name.charAt(0);
  }
  // console.log(namestring.charAt(0));

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
    toggleSwitch();
  };

  // const favorites = thecart.filter((c) => c.favorite === true);

  const handleMouseDown = (e) => {
    // toggleMenu();
    toggleSwitch();
    setIsOpen(!isOpen);
    e.stopPropagation();
  };

  // const toggleMenu = () => {
  //   setVisible(!visible);
  // };

  // hamburger: = => x, red => white
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <>
      <Helmet>
        <html className={isOpen ? "menu-open" : null} />
      </Helmet>
      {/* {user ? (
        <div className="container-y bg-red-600 py-9">
          <span className="text-16 mr-18 font-500 text-white">
            <Link to="/weekmenu">Week 24</Link>
          </span>
          <span className="text-16 mr-18 font-500 text-white">
            <Link to="/boodschappen">Boodschappen</Link>
          </span>
          <span className="text-16 mr-18 font-500 text-white">
            {" "}
            <Link to="/favorites">Favorites</Link>
          </span>
        </div>
      ) : null} */}

      <div
        className={`container-y ${
          props.location.pathname.includes("/recipe/") ||
          props.location.pathname.includes("/sorts/") ||
          props.location.pathname.includes("/categories/")
            ? "bg-red-100"
            : "bg-red-500"
        }`}
      >
        <div className="">
          <div className="relative pt-10">
            <div className="flex items-center">
              <Link
                className={`${!isOpen ? null : "z-100"}`}
                aria-label="logo hetkookt"
                to="/"
              >
                <span
                  className={`space-x-1 text-30 font-300 ${
                    props.location.pathname.includes("/recipe/") ||
                    props.location.pathname.includes("/sorts/") ||
                    props.location.pathname.includes("/categories/")
                      ? `${!isOpen ? "text-red-500" : "z-100 text-white"}`
                      : "text-white"
                  }`}
                >
                  het<span className="font-700 text-32">kookt</span>
                </span>

                {/* <img
                  className="h-50"
                  src="/img/icons/hetkookt_picture.svg"
                  alt=""
                /> */}
              </Link>
              <div className="flex items-center ml-9 mr-36 pb-5">
                {!user && (
                  <div className="lg:absolute right-0 -mt-60 sm:-mt-30 lg:mt-0 lg:relative lg:mr-36">
                    <NavLink aria-label="login" to="/login">
                      <p className="mr-60 lg:mr-0 font-300 text-21">login</p>
                    </NavLink>
                  </div>
                )}
                {user && (
                  <Fragment>
                    {/* <NavLink aria-label="login" to="/login">
                        <div className="absolute mt-5 ml-5 bg-rose rounded-full h-30 w-30 flex items-center justify-center">
                          <span className="">{namestring}</span>
                        </div>
                      </NavLink> */}
                    {/* <img
                      className="h-36 w-initial ml-10"
                      src="/img/icons/tomaat2.svg"
                      alt=""
                    />
                    <img
                      className="h-36 w-initial ml-10"
                      src="/img/icons/flame3.svg"
                      alt=""
                    /> */}
                  </Fragment>
                )}
                {/* <div className="font-300 text-24">Q</div> */}
                {/* <Search recipes={recipes} /> */}
              </div>
            </div>
            <div className="hamburger-box">
              <button
                aria-label="hamburger menu"
                onClick={handleMouseDown}
                // className={isOn ? "hamburger navbox--menu-open" : "hamburger"}
                className={`${
                  props.location.pathname.includes("/recipe/") ||
                  props.location.pathname.includes("/sorts/") ||
                  props.location.pathname.includes("/categories/")
                    ? `hamburger recipesection ${
                        isOn ? "hamburger navbox--menu-open" : "hamburger"
                      }`
                    : `hamburger ${
                        isOn ? "hamburger navbox--menu-open" : "hamburger"
                      }`
                }`}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
          {/* <div className="container-x">
            <ul className="flex justify-around text-21 pt-0">
              <CategoriesFilter categories={categories} />
              <CollectionsFilter dishes={dishes} />
            </ul>
          </div> */}
          <div className="container-x"></div>
        </div>
        <div
          className={`navbox-panel bg-red-600 ${isOpen ? "show " : null}`}
          id="navPanel"
        >
          <NavAdd
            handleIsOpen={handleIsOpen}
            isOpen={isOpen}
            user={user}
            thecart={thecart}
            thefavorites={thefavorites}
            // favorites={favorites}
          />
        </div>
      </div>
    </>
  );
};

export default withRouter(Nav);
