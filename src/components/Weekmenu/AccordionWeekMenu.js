import React, { useState } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../common/common";
import { deleteFromMenu } from "../../services/userService";

// https://codepen.io/davidmunro/pen/xxxeoOo
const AccordionWeekMenu = ({ title, children, me, setMe, id, dayall }) => {
  const [isOpen, setOpen] = useState(false);
  console.log("dayall");
  console.log(dayall);
  return (
    <div className="accordion-wrapper">
      <div className={`accordion-title ${isOpen ? "open" : ""}`}>
        <div className="">
          <Link to={`/kookschrift/${slugify(title)}`}>{title} </Link>{" "}
          <span
            className="text-red-500"
            onClick={() => deleteFromMenu(me, setMe, id, dayall)}
          >
            &nbsp;
            <span className="text-19">
              <span className="ml-5 text-16 font-300">verwijder</span> x
            </span>
          </span>
        </div>
        <div onClick={() => setOpen(!isOpen)} className="relative flex ">
          <span className="font-300 mr-10 text-16">verse ingredienten</span>
          <span
            className={`accordion-arrow mt-10 ${isOpen ? "open" : ""}`}
          ></span>
        </div>
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content lg:px-18">{children}</div>
      </div>
    </div>
  );
};

export default AccordionWeekMenu;
