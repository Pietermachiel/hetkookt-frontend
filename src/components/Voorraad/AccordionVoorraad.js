import React, { useState } from "react";

// https://codepen.io/davidmunro/pen/xxxeoOo
const AccordionVoorraad = ({ title, children }) => {
  const [isVoorraadOpen, setVoorraadOpen] = useState(true);

  // console.log(s);
  return (
    <div className="mb-10">
      <div className="">
        {/* <div className={` ${isVoorraadOpen ? "open" : ""}`}> */}
        <div
          onClick={() => setVoorraadOpen(!isVoorraadOpen)}
          className="accordion-voorraad-title"
        >
          <h2 className="text-36 mb-10 flex items-baseline">{title}&nbsp; </h2>
        </div>
      </div>
      <div
        className={`accordion-voorraad-item ${
          !isVoorraadOpen ? "collapsed" : ""
        }`}
      >
        <div className="accordion-voorraad-content">{children}</div>
      </div>
    </div>
  );
};

export default AccordionVoorraad;
