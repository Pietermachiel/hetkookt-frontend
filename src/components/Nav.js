import React, { useState } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import Search from "../components/Search";
import Productenfilter from "../components/Productenfilter";
import useCurrentWidth from "./common/use-current-width";
import { kalender } from "./common/common";

const Nav = ({ sorts, ...props }) => {
  const [isOn, setIsOn] = useState(false);
  const [visible, setVisible] = useState(false);
  const width = useCurrentWidth();
  const recipes = props.recipes;
  const location = props.location.pathname;

  // console.log("props");
  // console.log(props);

  const favorites = props.thecart.filter((c) => c.favorite === true);
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
      <div className="navbox bg-white pb-10 mb-15">
        <div className="container-nav pl-15 pr-15">
          <button
            onClick={handleMouseDown}
            className={isOn ? "hamburger navbox--menu-open" : "hamburger"}
            aria-label="Open Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Link className="logo" to="/">
            <div
              className="navbox-logo"
              onClick={isOn ? handleMouseDown : null}
            >
              <span className="het">het</span>
              <span className="spatie">&nbsp;</span>kookt
            </div>
          </Link>

          <div
            className={isOn ? `navbox-panel ${visibility}` : `navbox-panel`}
            id="navPanel"
            onClick={isMobile ? handleMouseDown : null}
            aria-expanded={expanded}
          >
            <ul className="navbar">
              <li className="nav-item font-light lg:flex">
                {/* <Link
                  className={
                    "favorites" === props.location.pathname
                      ? `nav-link ml-15 active`
                      : `nav-link ml-15`
                  }
                  to={"/test"}
                >
                  test
                </Link>
                <Link
                  className={
                    "favorites" === props.location.pathname
                      ? `nav-link ml-15 active`
                      : `nav-link ml-15`
                  }
                  to={"/collections"}
                >
                  collections
                </Link> */}
                {props.user && (
                  <>
                    {/* weekmenu */}
                    <Link
                      className={
                        "favorites" === props.location.pathname
                          ? `nav-link ml-15 active`
                          : `nav-link ml-15`
                      }
                      to={"/weekmenu"}
                    >
                      <div className="items-center mr-10">weekmenu</div>
                    </Link>
                    <div className="flex">
                      {kalender.map((k) => {
                        var cart = props.thecart.filter((c) =>
                          c.date ? c.date.includes(k.year) : null
                        );
                        return (
                          <div key={k.index} className={`relative mr-4`}>
                            {cart.length === 0 ? (
                              <img
                                className="w-30 h-30"
                                src="/img/feather/circle-gray.svg"
                                alt=""
                              />
                            ) : (
                              <img
                                className="w-30 h-30"
                                src="/img/feather/circle-orange.svg"
                                alt=""
                              />
                            )}

                            <div className={`absolute inset-0 text-12`}>
                              <span className="flex justify-center pt-6">
                                {k.index}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-16 pl-3 leading-7 text-gray-500">
                      april <span className="text-14">2020</span>
                    </p>
                    {/* kookschrift */}
                    <div className="font-light flex lg:ml-18 md:border-solid lg:border-none md:border-4 md:pb-10">
                      {props.user && (
                        <>
                          <Link
                            className={
                              "favorites" === props.location.pathname
                                ? `nav-link flex active`
                                : `nav-link flex`
                            }
                            to={"/favorites"}
                          >
                            <span className="pr-5">kookschrift</span>
                          </Link>
                          <span className="text-red-500">
                            {favorites.length}
                          </span>
                        </>
                      )}
                    </div>{" "}
                  </>
                )}
              </li>
              {/* <li className="nav-item">
                <Link
                  className={
                    "favorites" === props.location.pathname
                      ? `nav-link active`
                      : `nav-link`
                  }
                  to={"/recipetable"}
                >
                  recipe-table
                </Link>
              </li> */}

              {!props.user && (
                <li className="nav-me">
                  <NavLink className="nav-user nav-link" to="/login">
                    login
                  </NavLink>
                </li>
              )}
              {props.user && (
                <NavLink className="nav-user nav-link" to="/user">
                  <div className="nav-me pt-16 flex items-center">
                    <span className="pr-5">{props.user.name}</span>
                    <img className="w-25" src="/img/feather/user.svg" alt="" />
                  </div>
                </NavLink>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Search recipes={recipes} />
      <div className="container-x">
        {location === "/" ? <Productenfilter sorts={sorts} /> : null}
      </div>
    </>
  );
  // }
};

export default withRouter(Nav);
