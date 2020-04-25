import React from "react";
import { Link } from "react-router-dom";
import { kalender, dedag, vandaag } from "../common/common";

const KalenderWeekmenu = ({ thecart, ...props }) => {
  // console.log("KalenderWeekmenu");
  // console.log(props);
  // console.log(kalender);
  // console.log(thecart);
  console.log("vandaag(0)");
  console.log(vandaag(0));
  return (
    <div className="font-light lg:flex lg:items-center">
      {props.user && (
        <>
          <div className="flex pt-3">
            {kalender.map((k, xid) => {
              var cart = thecart.filter((c) =>
                c.date ? c.date.includes(k.year) : null
              );
              return (
                <div key={k.index} className={`relative mr-4 mt-12`}>
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
                  <div className={`absolute inset-0`}>
                    <span className="flex justify-center -mt-16 text-12 font-700 text-gray-500">
                      {vandaag(xid).slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-16 pl-3 mb-0 leading-7 text-gray-500 pt-3">
            april <span className="text-14">2020</span>
          </p>
        </>
      )}
    </div>
  );
};

export default KalenderWeekmenu;
