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
      <div className="w-full bg-white px-20 py-15 mb-15">
        <div className="flex items-center">
          <Link className="" to="/">
            <div
              className="flex items-center"
              onClick={isOn ? handleMouseDown : null}
            >
              {/* <svg
                width="35px"
                height="35px"
                viewBox="0 0 50 50"
                style={{
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  strokeLinejoin: "round",
                  strokeMiterlimit: "2",
                }}
              >
                <path
                  d="M13.258,3.742c5.832,0 10.568,4.519 10.568,10.084c0,5.566 -4.736,10.084 -10.568,10.084c-5.833,0 -10.568,-4.518 -10.568,-10.084c0,-5.565 4.735,-10.084 10.568,-10.084Zm0,4.261c3.11,0 5.636,2.617 5.636,5.84c0,3.223 -2.526,5.839 -5.636,5.839c-3.111,0 -5.636,-2.616 -5.636,-5.839c0,-3.223 2.525,-5.84 5.636,-5.84Z"
                  style={{ fill: "#f00" }}
                />
                <path
                  d="M36.742,3.742c5.833,0 10.568,4.519 10.568,10.084c0,5.566 -4.735,10.084 -10.568,10.084c-5.832,0 -10.568,-4.518 -10.568,-10.084c0,-5.565 4.736,-10.084 10.568,-10.084Zm0,4.261c3.111,0 5.636,2.617 5.636,5.84c0,3.223 -2.525,5.839 -5.636,5.839c-3.11,0 -5.636,-2.616 -5.636,-5.839c0,-3.223 2.526,-5.84 5.636,-5.84Z"
                  style={{ fill: "#f00" }}
                />
                <path
                  d="M13.258,26.09c5.832,0 10.568,4.518 10.568,10.084c0,5.565 -4.736,10.084 -10.568,10.084c-5.833,0 -10.568,-4.519 -10.568,-10.084c0,-5.566 4.735,-10.084 10.568,-10.084Zm0,4.261c3.11,0 5.636,2.616 5.636,5.839c0,3.223 -2.526,5.84 -5.636,5.84c-3.111,0 -5.636,-2.617 -5.636,-5.84c0,-3.223 2.525,-5.839 5.636,-5.839Z"
                  style={{ fill: "#f00" }}
                />
                <path
                  d="M36.742,26.09c5.833,0 10.568,4.518 10.568,10.084c0,5.565 -4.735,10.084 -10.568,10.084c-5.832,0 -10.568,-4.519 -10.568,-10.084c0,-5.566 4.736,-10.084 10.568,-10.084Zm0,4.261c3.111,0 5.636,2.616 5.636,5.839c0,3.223 -2.525,5.84 -5.636,5.84c-3.11,0 -5.636,-2.617 -5.636,-5.84c0,-3.223 2.526,-5.839 5.636,-5.839Z"
                  style={{ fill: "#f00" }}
                />
              </svg> */}
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
              {/* <li className="nav-item font-light lg:flex lg:items-center">
                {props.user && (
                  <>
                    <Link
                      className={`nav-link
                        ${
                          props.location.pathname === "favorites"
                            ? `active`
                            : ``
                        }
                      `}
                      to={"/weekmenu"}
                    >
                      <div className="items-center">weekmenu</div>
                    </Link>
                    <div className="flex ml-10 pt-3">
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
                    <p className="text-16 pl-3 mb-0 leading-7 text-gray-500 pt-3">
                      april <span className="text-14">2020</span>
                    </p>
                    <div className="font-light flex lg:ml-18 md:border-solid lg:border-none md:border-4">
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
              </li> */}
              {!props.user && (
                <NavLink className="" to="/login">
                  <div className="">login</div>
                </NavLink>
              )}
              {props.user && (
                <NavLink className="" to="/user">
                  <div className="flex items-center mr-20">
                    <span className="pr-5">{props.user.name}</span>
                    <img className="w-25" src="/img/feather/user.svg" alt="" />
                  </div>
                </NavLink>
              )}
            </div>
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
