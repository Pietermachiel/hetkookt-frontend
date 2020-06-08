import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink, withRouter } from "react-router-dom";
import NavAdd from "./NavAdd";
import Search from "../Search";
import CollectionsFilter from "../CollectionsFilter";
import CategoriesFilter from "../CategoriesFilter";
import NavAccordion from "./NavAccordion";

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
      <div className="bg-red-500">
        <span className="text-16 ml-18 font-300 text-white">
          <Link to="/">week</Link>
        </span>{" "}
        <span className="text-16 ml-18 font-300 text-white">
          <Link to="/boodschappen">boodschappen</Link>
        </span>
        <span className="text-16 ml-18 font-300 text-white">
          {" "}
          <Link to="/favorites">favorites</Link>
        </span>
      </div>{" "}
      <div className="bg-rose">
        <div className="px-25 relative pt-10">
          <div className="flex items-baseline">
            <Link aria-label="logo hetkookt" to="/">
              <span className="space-x-1 text-red-500 text-32 font-500">
                het<span className="font-700 text-36">kookt</span>
              </span>

              {/* <img
                className="h-50"
                src="/img/icons/hetkookt_picture.svg"
                alt=""
              /> */}
            </Link>
            <div className="w-full flex flex-row items-baseline justify-between ml-9 mr-36">
              {!user && (
                <div className="lg:absolute right-0 -mt-60 sm:-mt-30 lg:mt-0 lg:relative lg:mr-36">
                  <NavLink aria-label="login" to="/login">
                    <p className="mr-60 lg:mr-0 font-300 text-21">login</p>
                  </NavLink>
                </div>
              )}
              {user && (
                <div className="relative ">
                  <NavLink aria-label="login" to="/login">
                    {/* <p className="mr-60 lg:mr-0 font-300 text-21"> */}
                    <div className="absolute -mt-25 bg-rose rounded-full h-30 w-30 flex items-center justify-center">
                      <span className="">{namestring}</span>
                    </div>
                    {/* </p> */}
                  </NavLink>
                </div>
              )}
              {/* <div className="font-300 text-24">Q</div> */}
              {/* <Search recipes={recipes} /> */}
            </div>
          </div>
          <div className="hamburger-box">
            <button
              aria-label="hamburger menu"
              onClick={handleMouseDown}
              className={isOn ? "hamburger navbox--menu-open" : "hamburger"}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        <div className="container-x">
          <ul className="flex justify-around text-21 pt-0">
            <CategoriesFilter categories={categories} />
            {/* <NavAccordion title="categorieën"> */}
            <CollectionsFilter dishes={dishes} />
            {/* </NavAccordion> */}
          </ul>
        </div>
        <div className="container-x"></div>
      </div>
      <div className={`navbox-panel ${isOpen ? "show " : null}`} id="navPanel">
        <NavAdd
          handleIsOpen={handleIsOpen}
          isOpen={isOpen}
          user={user}
          thecart={thecart}
          thefavorites={thefavorites}
          // favorites={favorites}
        />
      </div>
    </>
  );
};

export default withRouter(Nav);
