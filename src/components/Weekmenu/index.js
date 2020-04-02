import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import today from "../common/today";
import { vandaag, kalender, slugify, theweek } from "../common/common";

const Weekmenu = ({ thecart, handleDelete, handleUpdate }) => {
  // console.log("props collecties");
  // console.log(props);
  // console.log(vandaag(0));
  // console.log("thecart");
  // console.log(thecart);
  // console.log(kalender);

  // kalender = [{index: "30", year: "maandag 30 maart 2020", day: "maandag"}, ...]

  return (
    <div className="container-x">
      {/* <h1 className="mb-10 flex item-center">
        week {theweek()}
        <span className="pt-6 ml-10">
          <img className="w-30" src="/img/feather/list.svg" alt="" />
        </span>
      </h1> */}
      {/* -ml-15  */}

      {/* <div className="mt-18 flex">
        <span className="text-19 pt-11 pr-15">week {theweek()}</span>

        {kalender.map(k => {
          var cart = thecart.filter(c =>
            c.date ? c.date.includes(k.year) : null
          );
          return (
            <p
              key={k.index}
              className={`relative mr-10 p-10 w-48 h-48 text-center ${
                cart.length !== 0 ? "bg-red" : "bg-gray-500"
              } text-white rounded-50`}
            >
              {k.day.slice(0, 2)}
              <span className="kalender-index">
                {k.index}
              </span>
            </p>
          );
        })}
        <span className="text-19 pt-11 pl-5">april 2020</span>
      </div> */}

      <div className="mb-10">
        {kalender.map(k => {
          var cart = thecart.filter(c =>
            c.date ? c.date.includes(k.year) : null
          );
          // console.log("cart");
          // console.log(cart);
          return (
            <Fragment key={k.index}>
              {cart.length !== 0 ? (
                <h1 className="text-orange border-b-4 border-gray-400 pt-15 first:pt-0 pb-15 ">
                  {/* {k.day} {k.day !== "vandaag" ? k.index : null} */}
                  {k.day} {k.index}
                </h1>
              ) : null}

              {cart
                ? cart.map(c => (
                    <Fragment key={c._id}>
                      <div
                        key={c._id}
                        // style={style}
                        className="wborder-b-2 border-gray-400  pt-10 unvisable slide work-grid-item grid-box__gray weekmenu-vandaag"
                      >
                        {/* <div className="day-flag">
                    <span className="px-15 py-6 bg-red text-white rounded">
                      {w.day} {w.index}
                    </span>
                  </div> */}
                        <p
                          className={`uppercase tracking-widest text-14 pt-15 pl-15 mb-0`}
                        >
                          {c.dish}
                        </p>
                        <div className={`min-h-full70 px-15 pt-15`}>
                          <Link to={`/recipe/${slugify(c.title)}`}>
                            <h3 className={`break-words mb-15`}>{c.title}</h3>
                          </Link>{" "}
                          <ul className="mb-12">
                            {c.basics.map((b, id) => (
                              <li
                                key={id}
                                className={`mb-0 leading-tight font-700 text-18 md:text-19 `}
                              >
                                {b}
                              </li>
                            ))}
                          </ul>
                          {c.tags.map((t, id) => {
                            const thelength = c.tags.length - 1;
                            return (
                              <Fragment key={id}>
                                <span className={`text-16`}>{t}</span>
                                {thelength === id ? "" : ", "}
                              </Fragment>
                            );
                          })}
                        </div>
                        <div className="h-60 relative overflow-hidden">
                          <div
                            className={`recipe-footer__box-delete ${
                              c.isOpen ? "box-delete__open" : null
                            }`}
                          >
                            <div className="recipe-footer__box-buttons">
                              <button
                                className="btn-delete"
                                onClick={() => handleDelete(c._id, k.year)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="100"
                                  height="100"
                                  viewBox="0 0 19 19"
                                  // stroke-linejoin="round"
                                >
                                  <path d="M14.9 17.5l2.6-2.6 -5.4-5.4 5.4-5.4 -2.6-2.6 -5.4 5.4 -5.4-5.4 -2.6 2.6 5.4 5.4 -5.4 5.4 2.6 2.6 5.4-5.4 5.4 5.4Z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(c._id, k.year)}
                                className="btn-weg"
                              >
                                Wegdoen
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))
                : null}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Weekmenu;
