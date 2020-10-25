import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useCurrentWitdh from "./common/use-current-width2";

const LogoBox = ({ user, me }) => {
  const [kookschriftOpen, setKookschriftOpen] = useState(false);

  const handleClick = () => {
    setKookschriftOpen(!kookschriftOpen);
  };

  const width = useCurrentWitdh();

  return (
    <div
      className={`lg:ml-150 ${width < 768 ? "mt-14 ml-100 pl-18" : "ml-125"}`}
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
              <img
                className="h-25"
                src="/img/feather/bookmark-red.svg"
                alt=""
              />
            </Link>
          </div>{" "}
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
          {user && user.isAdmin && (
            <NavLink className="ml-36 text-indigo-600" to="/recipes">
              (Recipes)
            </NavLink>
          )}
          {user && !user.isAdmin && width > 768 && (
            <p className="font-500 text-18 mt-21 ml-36 text-gray-500">
              De kunst van lekker eten
            </p>
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
        <NavLink aria-label="to login" className="" to="/login">
          <button className="button-loginmenu">login</button>
        </NavLink>
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
