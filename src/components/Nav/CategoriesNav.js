import React from "react";
import { Link } from "react-router-dom";

// https://codepen.io/davidmunro/pen/xxxeoOo
const AccordionNav = ({ handleCatOpen, isCatOpen, setCatOpen, categories }) => {
  return (
    <div className="accordion-nav-wrapper">
      <div
        onClick={() => setCatOpen(!isCatOpen)}
        className={`accordion-nav-title ${isCatOpen ? "open" : ""}`}
      >
        Recepten
        <div className="accordion-nav-arrow"></div>
      </div>
      <div className={`accordion-nav-item ${!isCatOpen ? "collapsed" : ""}`}>
        <div className="accordion-nav-content">
          {categories.map((c, xid) => (
            <div key={xid}>
              <ul className="item-links">
                <li>
                  <Link
                    onClick={handleCatOpen}
                    className=""
                    to={`/categories/${c.title}`}
                  >
                    {c.title}
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordionNav;
