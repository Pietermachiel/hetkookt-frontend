import React, { useState } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../common/common";
import { handleDelete } from "../../services/userService";

// https://codepen.io/davidmunro/pen/xxxeoOo
const Accordion = ({ title, children, me, setMe, id, year }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="accordion-wrapper">
      <div className={`accordion-title ${isOpen ? "open" : ""}`}>
        <div className="">
          <Link to={`/recipe/${slugify(title)}`}>{title} </Link>{" "}
          <span
            className="text-red-500"
            onClick={() => handleDelete(me, setMe, id, year)}
          >
            &nbsp;<span className="text-19">x</span>
          </span>
        </div>

        <span
          onClick={() => setOpen(!isOpen)}
          className={`accordion-arrow ${isOpen ? "open" : ""}`}
        ></span>
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
