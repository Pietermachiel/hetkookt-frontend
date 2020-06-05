import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Hetkookt from "./hetkookt";
import Search from "../Search";
import About from "./about";
import { vandaag, dedatum, kalender, slugify, hetjaar } from "../common/common";
import { deleteFresh } from "../../services/userService";
import Boodschappen from "./Boodschappen";
import Accordion from "./Accordion";

const Home = ({ me, setMe, user, recipes, about }) => {
  // console.log("me");
  // console.log(me);

  if (me.stock === undefined) return [];
  if (me.extra === undefined) return [];

  if (recipes.length === 0)
    return (
      <div className="container-x">
        <p>Loading...</p>
      </div>
    );

  const thedates = kalender.filter((k) => {
    const item = me.recipes.find((c) =>
      c.date ? c.date.includes(k.year) : null
    );
    return item;
  });

  // console.log("thedates");
  // console.log(thedates);
  // console.log("hetjaar");
  // console.log(hetjaar(0));

  return (
    <Fragment>
      <Hetkookt user={user} />
      <div className="container-x">
        <Search recipes={recipes} />
        {user ? (
          <Fragment>
            {/* {thedates.length === 0 ? (
              <>
                <h2 className="pt-15">Weekmenu</h2>
                <p className="font-600 mt-21">
                  Er staat nog niets op het menu.
                </p>
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
            ) : null} */}

            {thedates.map((k) => {
              var cart = me.recipes.filter((c) =>
                c.date ? c.date.includes(k.year) : null
              );
              return (
                <Fragment key={k.index}>
                  {cart.length === 0 ? (
                    <div className="">
                      {" "}
                      <h2 className="pt-15">Weekmenu</h2>
                      <p className="font-600 mt-21">
                        Er staat nog niets op het menu.
                      </p>
                    </div>
                  ) : null}
                </Fragment>
              );
            })}

            <div className="mt-18">
              <div className="category-box mb-10 mt-18">
                {thedates.map((k) => {
                  var cart = me.recipes.filter((c) =>
                    c.date ? c.date.includes(k.year) : null
                  );
                  return (
                    <Fragment key={k.index}>
                      {cart.length !== 0 ? (
                        <Fragment>
                          <h2 className="">
                            {k.day === vandaag(0) ? "vandaag" : k.day}
                          </h2>
                        </Fragment>
                      ) : null}
                      <ul className="">
                        {cart
                          ? cart.map((c) => (
                              <Fragment key={c._id}>
                                <Accordion
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
                                              <strong> {f.item}</strong>{" "}
                                              <span
                                                onClick={() =>
                                                  deleteFresh(
                                                    me,
                                                    setMe,
                                                    c._id,
                                                    f.item,
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
                                              <strong> {f.item}</strong>{" "}
                                              <span
                                                onClick={() =>
                                                  deleteFresh(
                                                    me,
                                                    setMe,
                                                    c._id,
                                                    f.item,
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
                                </Accordion>
                              </Fragment>
                            ))
                          : null}
                      </ul>
                    </Fragment>
                  );
                })}
              </div>
            </div>

            <Boodschappen me={me} setMe={setMe} />
          </Fragment>
        ) : (
          <About about={about} />
        )}
      </div>
    </Fragment>
  );
};

export default Home;
