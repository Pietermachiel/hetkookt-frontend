import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import AccordionWeekMenu from "./AccordionWeekMenu";
import { vandaag, kalender, theweek } from "../common/common";
import { toggleFresh } from "../../services/userService";
import KalenderWeekmenu from "./KalenderWeekmenu";

const Menu = ({ me, setMe, user, thecart, recipes, about, ...props }) => {
  // console.log("me");
  // console.log(me.items);
  // console.log("user");
  // console.log(user);
  // console.log("recipes");
  // console.log(recipes);

  if (me.stock === undefined) return [];
  if (me.extra === undefined) return [];

  const thedates = kalender.filter((k) => {
    const item = me.items.find((c) =>
      c.date ? c.date.includes(k.year) : null
    );
    return item;
  });

  // console.log(thedates);

  return (
    <Fragment>
      <div className="container-y bg-rose-100">
        <h1 className="favorieten-title">
          Weekmenu <span className="text-24 ml-10">week {theweek()}</span>
          {thedates.length !== 0 && (
            <span>
              <Link
                className="block lg:inline mt-10 lg:mt-0 lg:ml-18 text-18 text-indigo-600 hover:text-red-500"
                to="/boodschappen"
              >
                Boodschappen >
              </Link>
            </span>
          )}
        </h1>
        <KalenderWeekmenu props={props} thecart={thecart} user={user} />
        {thedates.length === 0 ? (
          <div className="">
            <p className="font-600 mt-21">Er staat nog niets op het menu.</p>
            <div>
              <br /> Kies een recept in{" "}
              <Link
                className="font-700 text-indigo-600 hover:text-red-500"
                to="/kookschrift"
              >
                favorieten
              </Link>{" "}
              en zet op het weekmenu.{" "}
            </div>
          </div>
        ) : null}

        <div className="mt-18 mb-36 unvisable slide work-grid-item ">
          <div className="category-box mb-10 mt-18">
            {thedates.map((k) => {
              var cart = me.items.filter((c) =>
                c.date ? c.date.includes(k.year) : null
              );
              return (
                <Fragment key={k.index}>
                  {cart.length !== 0 ? (
                    <Fragment>
                      <h2 className="">
                        {k.day === vandaag(0) ? "vandaag" : k.day}
                        <span className="pl-10 text-gray-600 text-22">
                          {k.dedag}
                        </span>
                      </h2>
                    </Fragment>
                  ) : null}
                  <ul className="mb-18">
                    {cart
                      ? cart.map((c) => (
                          <Fragment key={c._id}>
                            <AccordionWeekMenu
                              title={c.title}
                              id={c._id}
                              year={k.year}
                              me={me}
                              setMe={setMe}
                            >
                              <div
                                className={`specs-box sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-4 pb-15`}
                              >
                                {c.fresh.map((f, xid) => {
                                  return (
                                    <Fragment key={xid}>
                                      {f.to_buy === true ? (
                                        <div className="ml-18">
                                          {f.quantity} {f.unit}
                                          <strong> {f.ingredient}</strong>{" "}
                                          <span
                                            onClick={() =>
                                              toggleFresh(
                                                me,
                                                setMe,
                                                c._id,
                                                f.ingredient,
                                                f.do_buy
                                              )
                                            }
                                            className="text-red-600 mr-10"
                                          >
                                            x
                                          </span>
                                        </div>
                                      ) : (
                                        <div className="ml-18 text-gray-500">
                                          {f.quantity} {f.unit}
                                          <strong> {f.ingredient}</strong>{" "}
                                          <span
                                            onClick={() =>
                                              toggleFresh(
                                                me,
                                                setMe,
                                                c._id,
                                                f.ingredient,
                                                f.do_buy
                                              )
                                            }
                                            className="mr-10"
                                          >
                                            +
                                          </span>
                                        </div>
                                      )}
                                    </Fragment>
                                  );
                                })}
                              </div>
                            </AccordionWeekMenu>
                          </Fragment>
                        ))
                      : null}
                  </ul>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Menu;
