import React from "react";
import { Link } from "react-router-dom";

// https://codepen.io/davidmunro/pen/xxxeoOo
const AccordionNav = ({ handleColOpen, isColOpen, setColOpen, dishes }) => {
  //   console.log(dishes);
  return (
    <div className="accordion-nav-wrapper">
      <div
        onClick={() => setColOpen(!isColOpen)}
        className={`accordion-nav-title ${isColOpen ? "open" : ""}`}
      >
        Collecties
        <div className="accordion-nav-arrow"></div>
      </div>
      <div className={`accordion-nav-item ${!isColOpen ? "collapsed" : ""}`}>
        <div className="accordion-nav-content">
          {dishes.map((c) => (
            <li key={c.id}>
              <ul className="item-links">
                <li>
                  <Link
                    onClick={handleColOpen}
                    className=""
                    to={`/collections/${c}`}
                  >
                    {c}
                  </Link>
                </li>
              </ul>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordionNav;
