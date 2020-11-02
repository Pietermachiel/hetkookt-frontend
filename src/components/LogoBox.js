import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useCurrentWitdh from "./common/use-current-width2";

const LogoBox = ({ user, me }) => {
  const [kookschriftOpen, setKookschriftOpen] = useState(false);

  // const handleClick = () => {
  //   setKookschriftOpen(!kookschriftOpen);
  // };

  const width = useCurrentWitdh();

  return (
    <div
      className={`lg:ml-150 ${user ? "mt-16" : "mt-48"} ${
        width < 768 ? "ml-100 pl-18" : "ml-125"
      }`}
    >
      {user && (
        <div className="flex items-center">
          <div aria-label="to user" className="">
            <NavLink to="/user">
              <button className="">
                <img className="h-25 w-25" src="/img/feather/user.svg" alt="" />
                {/* {me.name} */}
              </button>
            </NavLink>
          </div>{" "}
          <div className="ml-10">
            <Link to="/mijnrecepten">
              {" "}
              <img
                className="h-25"
                src="/img/feather/bookmark-red.svg"
                alt=""
              />
            </Link>
          </div>
          <div className="ml-10">
            <Link to="/weekmenu" className="font-700 text-24">
              <img className="h-25" src="/img/feather/list.svg" alt="" />
            </Link>
          </div>{" "}
          <div className="ml-10">
            <Link to="/boodschappen">
              <img
                className="h-25"
                src="/img/feather/shopping-cart.svg"
                alt=""
              />
            </Link>
          </div>{" "}
          {width > 768 && (
            <Fragment>
              {/* <div className="ml-10">
                <NavLink className="ml-36 text-indigo-600" to="/collections">
                  Recepten
                </NavLink>
                <NavLink className="ml-36 text-indigo-600" to="/about">
                  About
                </NavLink>
              </div> */}
              <NavLink
                className="ml-36 font-500 text-18 text-gray-500"
                to="/about"
              >
                De kunst van lekker eten
              </NavLink>
            </Fragment>
          )}
          {user && user.isAdmin && width > 768 && (
            <Fragment>
              <NavLink className="ml-36 text-indigo-600" to="/recipes">
                (Recipes)
              </NavLink>
              <NavLink className="ml-36 text-indigo-600" to="/markdown">
                (Markdown)
              </NavLink>
            </Fragment>
          )}
          {!user && !user.isAdmin && width > 768 && (
            <span className="ml-36 font-500 text-18 text-gray-500">
              De kunst van lekker eten
            </span>
          )}
          {/* <ul className={`${kookschriftOpen ? "kookschrift-open" : null}`}>
            <Link onClick={() => handleClick()} to="/mijnrecepten">
              <li>Mijn recepten</li>
            </Link>
            <Link onClick={() => handleClick()} to="/weekmenu">
              <li>&nbsp;Weekmenu</li>
            </Link>
            <Link onClick={() => handleClick()} to="/boodschappen">
              <li>&nbsp;Boodschappen</li>
            </Link>
          </ul> */}
        </div>
      )}
      {!user && (
        <div className="button-loginmenu flex items-center">
          <NavLink aria-label="to login" className="" to="/login">
            <button className="">Login</button>
          </NavLink>
          {width > 768 && (
            <Fragment>
              {/* <NavLink className="ml-36 text-indigo-600" to="/collections">
                Recepten
              </NavLink>
              <NavLink className="ml-36 text-indigo-600" to="/about">
                About
              </NavLink> */}

              <NavLink
                className="ml-36 font-500 text-18 text-gray-500"
                to="/about"
              >
                De kunst van lekker eten
              </NavLink>
            </Fragment>
          )}
        </div>
      )}
      {/* {user && (
        <NavLink
          className={`button-kookschrift text-red-600 font-700 `}
          to="/kookschrift"
        >
          Kookschrift
        </NavLink>
      )} */}

      <div
        className={`flex flex-col`}
        // className={`${user ? "kookschrift-user" : "kookschrift-user"}`}
      >
        {/* {user && (
          <Fragment>
            <div
              onClick={() => setKookschriftOpen(!kookschriftOpen)}
              className="kookschrift-title"
            >
              <Link to="/kookschrift">
                <div className="flex items-center">
                  <img
                    className="h-25"
                    src="/img/feather/bookmark-red.svg"
                    alt=""
                  />

                  <span className="ml-5 ">Kookschrift</span>
                </div>{" "}
              </Link>
            </div>
            <ul className={`${kookschriftOpen ? "kookschrift-open" : null}`}>
              <Link onClick={() => handleClick()} to="/mijnrecepten">
                <li>Mijn recepten</li>
              </Link>
              <Link onClick={() => handleClick()} to="/weekmenu">
                <li>&nbsp;Weekmenu</li>
              </Link>
              <Link onClick={() => handleClick()} to="/boodschappen">
                <li>&nbsp;Boodschappen</li>
              </Link>
            </ul>
          </Fragment>
        )} */}
      </div>
      {/* <NavLink aria-label="to loginreact" className="" to="/loginreact">
        <button className="button-loginreact">loginreact</button>
      </NavLink> */}
      <div className="hetkookt-logo">
        <NavLink to="/">
          <img src="/img/icons/hetkookt.png" alt="logo hetkookt" />
        </NavLink>
      </div>
    </div>
  );
};

export default LogoBox;
