import React, { useState } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../common/common";
import { handleDelete } from "../../services/userService";

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
          {categories.map((c) => (
            <li key={c.id}>
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
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordionNav;
