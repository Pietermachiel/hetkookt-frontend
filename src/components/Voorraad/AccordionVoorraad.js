import React, { useState } from "react";

// https://codepen.io/davidmunro/pen/xxxeoOo
const AccordionVoorraad = ({ s, title, children, me, setMe, id, year }) => {
  const [isVoorraadOpen, setVoorraadOpen] = useState(false);

  console.log(s);
  return (
    <div className="mb-10">
      <div className={` ${isVoorraadOpen ? "open" : ""}`}>
        <div
          onClick={() => setVoorraadOpen(!isVoorraadOpen)}
          className="accordion-voorraad-title"
        >
          <h2 className="text-36 mb-10 flex items-baseline">
            {title}&nbsp;{" "}
            {s.item.map((i) => {
              if (me.stock.includes(i.title))
                return (
                  <span className="h-20 w-20 ml-5">
                    <img src="/img/feather/circle-orange.svg" alt="" />
                  </span>
                );
            })}
          </h2>
          <span
            className={`accordion-voorraad-arrow ${
              isVoorraadOpen ? "open" : ""
            }`}
          ></span>
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
