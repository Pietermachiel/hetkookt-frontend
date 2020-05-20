import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink, withRouter } from "react-router-dom";
import NavAdd from "./NavAdd";
import CategoriesFilter from "../CategoriesFilter";
import CollectionsFilter from "../CollectionsFilter/index";

const Nav = ({
  user,
  dishes,
  categories,
  thecart,
  isWat,
  setIsWat,
  ...props
}) => {
  const [isOn, setIsOn] = useState(false);
  const [visible, setVisible] = useState(false);
  const recipes = props.recipes;
  const [isOpen, setIsOpen] = useState(false);

  // console.log("props nav");
  // console.log(props);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
    toggleSwitch();
  };

  const favorites = thecart.filter((c) => c.favorite === true);

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
  };

  return (
    <>
      <Helmet>
        <html className={isOpen ? "menu-open" : null} />
      </Helmet>
      <div className="bg-white">
        <div className="container-x relative pt-10">
          <div className="flex flex-col md:flex-row md:items-center">
            <Link aria-label="logo hetkookt" to="/">
              <img
                className="w-250"
                src="/img/icons/hetkookt_muts.svg"
                alt=""
              />
            </Link>
            <div className="flex items-baseline sm:justify-between w-full ml-25 mr-40 xl:mr-0">
              <ul className="flex text-21 pt-0">
                <NavLink aria-label="home" to="/">
                  <li
                    onClick={() => setIsWat(false)}
                    className={`mb-0 ${
                      isWat === false ? "text-green-600 font-700" : null
                    } hover:text-green-600`}
                  >
                    <span className="pr-24">wat</span>
                  </li>
                </NavLink>

                <NavLink aria-label="home" to="/">
                  <li
                    onClick={() => setIsWat(true)}
                    className={`${
                      isWat === true ? "text-indigo-600 font-700" : null
                    } mb-0 mr-24 hover:text-indigo-600`}
                  >
                    <span className="pr-1">hoe</span>
                  </li>
                </NavLink>
                <NavLink aria-label="waarom het kookt" to="/waarom">
                  <li className="hidden md:inline-block mr-24 mb-0 font-500 hover:text-red-500">
                    <span className="font-300 pr-1">waarom</span>hetkookt
                  </li>
                </NavLink>
                <NavLink aria-label="waarom het kookt" to="/voorraad">
                  <li className="hidden md:inline-block mb-0 font-500 hover:text-red-500">
                    <span className="font-300 pr-1">voorraad</span>
                  </li>
                </NavLink>
              </ul>
              {!user && (
                <div className="hidden lg:absolute right-0 -mt-60 sm:-mt-30 lg:mt-0 lg:relative lg:mr-36">
                  <NavLink aria-label="login" to="/login">
                    <p className="mt-18 mr-60 lg:mr-0 font-300 text-21">
                      login
                    </p>
                  </NavLink>
                </div>
              )}
              {user && (
                <div className="hidden lg:absolute right-0 md:relative md:mr-36">
                  <NavLink aria-label="user" to="/user">
                    <p className="mt-15 mr-60 md:mt-18 md:mr-0 font-300 text-21">
                      {user.name}
                    </p>
                  </NavLink>
                </div>
              )}
            </div>
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
      </div>

      <div className={`navbox-panel ${isOpen ? "show " : null}`} id="navPanel">
        <NavAdd
          handleIsOpen={handleIsOpen}
          isOpen={isOpen}
          user={user}
          thecart={thecart}
          favorites={favorites}
          setIsWat={setIsWat}
          isWat={isWat}
        />
      </div>
      {isWat ? (
        <CollectionsFilter dishes={dishes} isWat={isWat} />
      ) : (
        <CategoriesFilter categories={categories} isWat={isWat} />
      )}
    </>
  );
};

export default withRouter(Nav);
