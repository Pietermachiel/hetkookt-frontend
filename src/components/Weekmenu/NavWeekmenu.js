import React from "react";
import { Link } from "react-router-dom";
import { kalender } from "../common/common";

const NavWeekmenu = ({ thecart, ...props }) => {
  console.log("navWeekmenu");
  console.log(props);
  console.log(kalender);
  console.log(thecart);
  return (
    <div className="font-light lg:flex lg:items-center">
      {props.user && (
        <>
          {/* <Link
            className={`nav-link
            ${props.location.pathname === "favorites" ? `active` : ``}
            `}
            to={"/weekmenu"}
          >
            <div className="items-center">weekmenu</div>
          </Link> */}
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
                </div>
              );
            })}
          </div>
          <p className="text-16 pl-3 mb-0 leading-7 text-gray-500 pt-3">
            april <span className="text-14">2020</span>
          </p>
          {/* <div className="font-light flex lg:ml-18 md:border-solid lg:border-none md:border-4">
              {props.user && (
                <>
                  <Link
                    className={
                      "favorites" === props.location.pathname
                        ? `nav-link flex active`
                        : `nav-link flex`
                    }
                    to={"/favorites"}
                  >
                    <span className="pr-5">kookschrift</span>
                  </Link>
                  <span className="text-red-500">{favorites.length}</span>
                </>
              )}
            </div> */}
        </>
      )}
    </div>
  );
};

export default NavWeekmenu;
