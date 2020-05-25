import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { vandaag, dedatum, kalender, slugify } from "../common/common";
import KalenderWeekmenu from "./KalenderWeekmenu";
import { handleDelete } from "../../services/userService";

const Weekmenu = ({
  me,
  setMe,
  user,
  thecart,
  // handleDelete,
  // handleUpdate,
  ...props
}) => {
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
      <div className="lg:flex lg:items-center">
        <h1 className="text-gray-500 mr-18 mt-18">weekmenu</h1>
        <KalenderWeekmenu props={props} thecart={thecart} user={user} />
      </div>
      {thedates.length === 0 ? (
        <>
          <p className="font-600 mt-21">Er staat nog niets op het menu.</p>
          <p className="w-full md:w-50">
            Stel je eigen menu samen voor vandaag&nbsp;
            <span className="font-600 text-gray-600">
              {vandaag(0)} {dedatum(0)} april
            </span>
            &nbsp; en de zeven daaropvolgende dagen. <br />
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
                  <div className="flex items-center text-orange border-b-4 border-gray-400 pt-15 first:pt-0 pb-15">
                    {/* {k.day} {k.day !== "vandaag" ? k.index : null} */}
                    <h2 className="mr-5">
                      {k.day === vandaag(0) ? "vandaag" : k.day}
                    </h2>
                    <div className="relative pt-3">
                      <img
                        className="w-30 h-30"
                        src="/img/feather/circle-orange.svg"
                        alt="circle orange"
                      />
                      <div className={`absolute inset-0 text-12`}>
                        <span className="flex justify-center pt-9">
                          {k.index}
                        </span>
                      </div>
                      {/* {k.index} */}
                    </div>
                  </div>
                  <p></p>
                </Fragment>
              ) : null}
              <div className="-ml-10 sm:ml-0 md:-ml-15 mb-10 flex flex-row flex-wrap">
                {cart
                  ? cart.map((c) => (
                      <Fragment key={c._id}>
                        <div className="border border-gray-400 min-h-250 bg-badge w-1/2/10 sm:w-1/2/15 md:w-1/3/15 lg:w-1/4/15 ml-10 mb-10 md:ml-15 md:mb-15 unvisable slide work-grid-item grid-box__gray">
                          <img
                            className="h-auto"
                            src={`img/products/product_${c.tags[0]}.jpg`}
                            alt=""
                          />
                        </div>
                        <div className="border border-gray-400 min-h-250 bg-badge w-1/2/10 sm:w-1/2/15 md:w-1/3/15 lg:w-1/4/15 ml-10 mb-10 md:ml-15 md:mb-15 unvisable slide work-grid-item grid-box__gray">
                          <div className={`min-h-full70 px-15 pt-15`}>
                            <Link to={`/recipe/${slugify(c.title)}`}>
                              <h4 className={`break-words mb-15`}>{c.title}</h4>
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
                            <p
                              className={`uppercase tracking-widest text-14 pt-15 pl-15 mb-0`}
                            >
                              {c.dish}
                            </p>
                            <div
                              className={`recipe-footer__box-delete ${
                                c.isOpen ? "box-delete__open" : null
                              }`}
                            >
                              <div className="recipe-footer__box-buttons">
                                <button
                                  className="btn-delete"
                                  onClick={() =>
                                    handleDelete(me, setMe, c._id, k.year)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100"
                                    height="100"
                                    viewBox="0 0 19 19"
                                  >
                                    <path d="M14.9 17.5l2.6-2.6 -5.4-5.4 5.4-5.4 -2.6-2.6 -5.4 5.4 -5.4-5.4 -2.6 2.6 5.4 5.4 -5.4 5.4 2.6 2.6 5.4-5.4 5.4 5.4Z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() =>
                                    handleDelete(me, setMe, c._id, k.year)
                                  }
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
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Weekmenu;
