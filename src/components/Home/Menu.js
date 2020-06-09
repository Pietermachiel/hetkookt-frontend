import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Accordion from "./Accordion";
import { vandaag, dedatum, kalender, slugify, hetjaar } from "../common/common";
import { deleteFresh } from "../../services/userService";

const Menu = ({ me, setMe, user, recipes, about, ...props }) => {
  console.log("me");
  console.log(me);
  console.log("user");
  console.log(user);
  console.log("recipes");
  console.log(recipes);

  if (me.stock === undefined) return [];
  if (me.extra === undefined) return [];

  const thedates = kalender.filter((k) => {
    const item = me.recipes.find((c) =>
      c.date ? c.date.includes(k.year) : null
    );
    return item;
  });

  return (
    <Fragment>
      <h1 className="-mb-18 mt-18">
        Week 24
        {/* <span className="text-16 ml-18 font-300">menu</span>
        <span className="text-16 ml-18 font-300">
          <Link to="/boodschappen">boodschappen</Link>
        </span>
        <span className="text-16 ml-18 font-300">
          <Link to="/favorites">favorieten</Link>
        </span> */}
      </h1>
      {thedates.map((k) => {
        var cart = me.recipes.filter((c) =>
          c.date ? c.date.includes(k.year) : null
        );
        return (
          <Fragment key={k.index}>
            {cart.length === 0 ? (
              <div className="">
                <h2 className="pt-15">Menu</h2>
                <p className="font-600 mt-21">
                  Er staat nog niets op het menu.
                </p>
              </div>
            ) : null}
          </Fragment>
        );
      })}

      <div className="mt-18 mb-36">
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
                      {k.day === vandaag(0) ? "vandaag" : k.day}{" "}
                      <span className="text-gray-600 text-22">{k.dedag}</span>
                    </h2>
                  </Fragment>
                ) : null}
                <ul className="mb-18">
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
    </Fragment>
  );
};

export default Menu;
