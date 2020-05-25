import React from "react";
// import { Link } from "react-router-dom";
import { kalender } from "../common/common";

const KalenderWeekmenu = ({ thecart, ...props }) => {
  return (
    <div className="pb-18 font-light lg:flex lg:items-center">
      {props.user && (
        <>
          <div className="flex pt-3">
            {kalender.map((k) => {
              var cart = thecart.filter((c) =>
                c.date ? c.date.includes(k.year) : null
              );
              return (
                <div key={k.index} className={`relative mr-4`}>
                  {cart.length === 0 ? (
                    <img
                      className="w-30 h-30"
                      src="/img/feather/circle-gray.svg"
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-30 h-30"
                      src="/img/feather/circle-orange.svg"
                      alt=""
                    />
                  )}

                  <div className={`absolute inset-0 text-12`}>
                    <span className="flex justify-center pt-6">{k.index}</span>
                  </div>
                  <div className="absolute inset-0">
                    <span className="flex justify-center text-gray-500 -mt-15 text-14">
                      {k.day.slice(0, 1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default KalenderWeekmenu;
