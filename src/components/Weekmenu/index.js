import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import today from "../common/today";
import { vandaag, dedatum, kalender, slugify, theweek } from "../common/common";
import KalenderWeekmenu from "./KalenderWeekmenu";

const Weekmenu = ({ user, thecart, handleDelete, handleUpdate, ...props }) => {
  // console.log("props collecties");
  // console.log(props);
  // console.log(vandaag(0));
  // console.log("thecart");
  // console.log(thecart);
  // console.log(kalender);

  // kalender = [{index: "30", year: "maandag 30 maart 2020", day: "maandag"}, ...]
  const thedates = kalender.filter((k) => {
    const item = thecart.find((c) => (c.date ? c.date.includes(k.year) : null));
    return item;
  });

  // console.log("thedates");
  // console.log(thedates.length);

  return (
    <div className="container-x">
      <h1 className="text-gray-500">weekmenu</h1>
      <KalenderWeekmenu props={props} thecart={thecart} user={user} />
      {thedates.length === 0 ? (
        <>
          <p className="font-600 mt-21">Er staat nog niets op het menu.</p>
          <p className="w-full md:w-50">
            Stel je eigen menu samen voor vandaag&nbsp;
            <span className="font-600 text-gray-600">
              {vandaag(0)} {dedatum(0)} april
            </span>
            en de zeven daaropvolgende dagen. <br />
            <br />
            Zoek een recept en zet op het weekmenu.
          </p>
        </>
      ) : null}

      <div className="mb-10 mt-18">
        {kalender.map((k) => {
          var cart = thecart.filter((c) =>
            c.date ? c.date.includes(k.year) : null
          );
          // console.log("cart");
          // console.log(cart);
          return (
            <Fragment key={k.index}>
              {cart.length !== 0 ? (
                <Fragment>
                  <h2 className="text-orange border-b-4 border-gray-400 pt-15 first:pt-0 pb-15 ">
                    {/* {k.day} {k.day !== "vandaag" ? k.index : null} */}
                    {k.day === vandaag(0) ? "vandaag" : k.day} {k.index}
                  </h2>
                  <p></p>
                </Fragment>
              ) : null}

              {cart
                ? cart.map((c) => (
                    <Fragment key={c._id}>
                      <div
                        key={c._id}
                        // style={style}
                        className="shadow-md wborder-b-2 border-gray-400  pt-10 unvisable slide work-grid-item grid-box__gray weekmenu-vandaag"
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
