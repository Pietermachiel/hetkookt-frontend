import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Kookschrift = ({ user, location }) => {
  const [kookschriftOpen, setKookschriftOpen] = useState(false);
  // const [kookschriftItem, setKookschriftItem] = useState("weekmenu");

  // console.log("props-kookschrift");
  // console.log(location);

  const handleClick = () => {
    setKookschriftOpen(!kookschriftOpen);
  };

  return (
    <Fragment>
      {/* {location === "/weekmenu" ||
      location === "/boodschappen" ||
      location === "/favorites" ||
      location === "/voorraad" ? (
        
      ) : null} */}

      <div className="pl-20">
        <div className="kookschrift">
          <Link to="/kookschrift">
            <div className="kookschrift-title">
              Kookschrift
              <span
                onClick={() => setKookschriftOpen(!kookschriftOpen)}
                className="kookschrift-arrow"
              ></span>
            </div>
          </Link>
          {user && (
            <ul className={`${kookschriftOpen ? "kookschrift-open" : ""}`}>
              {/* <Link to="/weekmenu">
              <li>weekmenu</li>
            </Link> */}
              <Link onClick={() => handleClick()} to="/weekmenu">
                <li>weekmenu</li>
              </Link>{" "}
              <Link onClick={() => handleClick()} to="/boodschappen">
                <li>boodschappen</li>
              </Link>
              {/* <Link onClick={() => handleClick()} to="/voorraad">
                {" "}
                <li>voorraad</li>
              </Link> */}
              {/* <li onClick={() => handleClick("weekmenu")}>weekmenu</li>
          <li onClick={() => handleClick("boodschappen")}>boodschappen</li>
          <li onClick={() => handleClick("voorraad")}>voorraad</li>
          <li onClick={() => handleClick("favorieten")}>favorieten</li> */}
            </ul>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Kookschrift;
