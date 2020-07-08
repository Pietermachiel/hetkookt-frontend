import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Kookschrift = ({ width, user, location }) => {
  const [kookschriftOpen, setKookschriftOpen] = useState(false);
  // const [kookschriftItem, setKookschriftItem] = useState("weekmenu");

  // console.log("props-kookschrift");
  // console.log(location);

  const handleClick = () => {
    setKookschriftOpen(!kookschriftOpen);
  };

  // console.log("width2");
  // console.log(width);

  return (
    <Fragment>
      <div className="pl-20">
        <div className="kookschrift">
          {user ? (
            <Fragment>
              <div
                onClick={() =>
                  width < 768 ? setKookschriftOpen(!kookschriftOpen) : null
                }
                className="kookschrift-title"
              >
                <div className="flex items-center">
                  <img
                    className="h-25"
                    src="/img/feather/bookmark-red.svg"
                    alt=""
                  />
                  <span className="ml-5">Kookschrift</span>
                </div>
                <span className="kookschrift-arrow"></span>
              </div>
              <ul className={`${kookschriftOpen ? "kookschrift-open" : ""}`}>
                <Link onClick={() => handleClick()} to="/kookschrift">
                  <li>favorieten</li>
                </Link>
                <Link onClick={() => handleClick()} to="/weekmenu">
                  <li>weekmenu</li>
                </Link>
                <Link onClick={() => handleClick()} to="/boodschappen">
                  <li>boodschappen</li>
                </Link>
              </ul>
            </Fragment>
          ) : (
            <div className="kookschrift-title"></div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Kookschrift;
