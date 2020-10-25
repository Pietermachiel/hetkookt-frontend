import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const KookschriftNav = ({ width, user, location }) => {
  const [kookschriftOpen, setKookschriftOpen] = useState(false);

  const handleClick = () => {
    setKookschriftOpen(!kookschriftOpen);
  };

  return (
    <Fragment>
      <div className={`pl-20 ${user && "bg-bgkookschrift"}`}>
        {/* ${user && "bg-kookschrift"} */}
        <div className={`${user ? "kookschrift-user" : "kookschrift-user"}`}>
          {user ? (
            <Fragment>
              <div
                onClick={() =>
                  width < 768 ? setKookschriftOpen(!kookschriftOpen) : null
                }
                className="kookschrift-title"
              >
                <Link to="/kookschrift">
                  <div className="flex items-center">
                    <img
                      className="h-25"
                      src="/img/feather/bookmark-red.svg"
                      alt=""
                    />
                    {width < 768 && (
                      <span className="ml-5 text-white">Kookschrift</span>
                    )}
                  </div>{" "}
                </Link>

                {/* <span className="kookschrift-arrow text-white"></span> */}
              </div>
              <ul
                className={`text-white ${
                  kookschriftOpen ? "kookschrift-open" : ""
                }`}
              >
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
          ) : (
            <Fragment>
              <Link to="/login" className="kookschrift-title">
                <div className="flex items-center">
                  <img
                    className="h-25"
                    src="/img/feather/bookmark-red.svg"
                    alt=""
                  />
                  <span className="ml-5">Kookschrift</span>
                </div>
                {/* <span className="kookschrift-arrow"></span> */}
              </Link>
              {/* <ul className={`${kookschriftOpen ? "kookschrift-open" : ""}`}>
                <Link onClick={() => handleClick()} to="/kookschrift">
                  <li>favorieten</li>
                </Link>
                <Link onClick={() => handleClick()} to="/weekmenu">
                  <li>weekmenu</li>
                </Link>
                <Link onClick={() => handleClick()} to="/boodschappen">
                  <li>boodschappen</li>
                </Link>
              </ul> */}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default KookschriftNav;
