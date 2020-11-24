import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import AccordionWeekMenu from "./AccordionWeekMenu";
import { vandaag, kalender, theweek } from "../common/common";
import { toggleFresh } from "../../services/userService";
import KalenderWeekmenu from "./KalenderWeekmenu";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const markdown = `

**Er staat nog niets op het weekmenu.**

Selecteer een recept in [Kookschrift](/mijnrecepten) en zet op het [Weekmenu](/weekmenu).

`;
const Menu = ({ me, setMe, user, thecart, recipes, about, ...props }) => {
  if (me.stock === undefined) return [];
  if (me.extra === undefined) return [];

  // const thedates = kalender.filter((k) => {
  //   const item = me.items.find((c) =>
  //     c.date ? c.date.includes(k.dayall) : null
  //   );
  //   return item;
  // });

  let thedates = kalender.filter((k) => {
    const item = me.items.find((c) => c.date.find((d) => d.name === k.dayall));
    return item;
  });
  // thedates = thedates.map((t) => t.dayall);

  return (
    <Fragment>
      <div className="container-y">
        <div className="flex justify-center">
          <h1 className="kookschrift-title">
            Weekmenu <span className="text-24 ml-10">week {theweek()}</span>
            {thedates.length !== 0 && (
              <span>
                <Link
                  className="block lg:inline mt-10 mb-18 lg:mb-0 lg:mt-0 lg:ml-18 text-18 text-indigo-600 hover:text-red-500"
                  to="/boodschappen"
                >
                  Boodschappen >
                </Link>
              </span>
            )}
          </h1>
        </div>
        <KalenderWeekmenu props={props} thecart={thecart} user={user} />
        {thedates.length === 0 ? (
          <ReactMarkdown
            plugins={[gfm]}
            className="kramdown m-auto mb-36 mt-36"
            children={markdown}
          />
        ) : null}

        <div className="mt-18 mb-36 unvisable slide work-grid-item ">
          <div className="category-box mb-10 mt-18">
            {thedates.map((k, xid) => {
              var cart = me.items.filter((c) =>
                // c.date ? c.date.includes(k.dayall) : null
                c.date.find((d) => d.name === k.dayall)
              );
              console.log("cart");
              console.log(cart);
              return (
                <Fragment key={xid}>
                  {cart.length !== 0 ? (
                    <Fragment>
                      <h2 className="bg-gray-400 ">
                        {k.day === vandaag(0) ? "vandaag" : k.day}
                        <span className="pl-10 text-gray-500 text-22">
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
                              dayall={k.dayall}
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
                                        <div className="my-18 flex lg:block justify-between pr-9">
                                          <div className="flex">
                                            <div className="w-70 text-right">
                                              {f.quantity} {f.unit}
                                            </div>

                                            <div className="items-product">
                                              <strong>
                                                &nbsp;{f.ingredient}
                                              </strong>
                                            </div>
                                          </div>

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
                                            className="text-verwijder"
                                          >
                                            {" "}
                                            <span className="font-300 text-14 lg:text-16">
                                              verwijder ingredient
                                            </span>
                                            &nbsp;
                                            <img
                                              className="w-20 h-20 inline"
                                              src="/img/feather/x-verwijder.svg"
                                              alt=""
                                            />
                                          </span>
                                        </div>
                                      ) : (
                                        <div className="my-18 flex lg:block text-gray-500 justify-between">
                                          <div className="flex">
                                            <div className="w-70 text-right">
                                              {f.quantity} {f.unit}
                                            </div>

                                            <div className="items-product">
                                              <strong>
                                                &nbsp;{f.ingredient}
                                              </strong>
                                            </div>
                                          </div>
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
                                            <span className="font-300 text-14 lg:text-16 text-green-600">
                                              voeg weer toe
                                            </span>
                                            &nbsp;
                                            <img
                                              className="w-20 h-20 inline"
                                              src="/img/feather/plus-green.svg"
                                              alt=""
                                            />
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
