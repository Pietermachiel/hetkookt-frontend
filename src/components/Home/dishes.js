import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { slugify, kalender } from "../common/common";

const Dishes = ({
  dishes,
  recipes,
  thecart,
  width,
  boxheight,
  offset,
  box,
}) => {
  const [isOn, setIsOn] = useState(false);

  if (recipes.length === 0)
    return (
      <div className="container-x">
        <p>Loading...</p>
      </div>
    );

  return (
    <Fragment>
      {dishes.map((d, xid) => {
        const therecipes = recipes.filter((recipe) => recipe.dish === d);
        if (therecipes === undefined) return [];
        return (
          <Fragment key={xid}>
            <h1 className="mb-10 sm:ml-10 md:ml-0">
              {d}
              <Link aria-label={`collections/${d}`} to={`/collections/${d}`}>
                {therecipes.length > 4 ? (
                  <span className="text-19 font-300">&nbsp; > meer {d}</span>
                ) : null}
              </Link>
            </h1>
            <div className="-ml-10 sm:ml-0 md:-ml-15 mb-10 flex flex-row flex-wrap">
              {therecipes.slice(0, 4).map((recipe, index) => {
                let cart = thecart.find((c) => c._id === recipe._id);
                if (cart === undefined) cart = [];
                const thelength = recipe.tags.length - 1;
                if (recipe.basics === undefined) return (recipe.basics = []);
                return (
                  <div
                    key={recipe._id}
                    className={`border border-gray-400 min-h-250 ${
                      recipe.meal === "true" ? "bg-rose" : "bg-badge"
                    } w-1/2/10 sm:w-1/2/15 md:w-1/3/15 lg:w-1/4/15 ml-10 mb-10 md:ml-15 md:mb-15 unvisable ${
                      width > 992
                        ? boxheight > offset + box * Math.round((index - 3) / 4)
                          ? "slide"
                          : ""
                        : width > 768
                        ? boxheight > offset + box * Math.round((index - 3) / 4)
                          ? "slide"
                          : ""
                        : boxheight > offset + box * Math.round((index - 2) / 2)
                        ? "slide"
                        : ""
                    } work-grid-item ${
                      recipe._id === cart._id
                        ? "grid-box__black"
                        : "grid-box__gray"
                    }`}
                  >
                    <div className={`min-h-full70 p-15`}>
                      <Link to={`/recipe/${slugify(recipe.title)}`}>
                        <h4 className={`break-words mb-15`}>{recipe.title}</h4>
                      </Link>
                      <ul className="mb-12">
                        {recipe.basics.map((b, id) => (
                          <li
                            key={id}
                            className={`mb-0 leading-tight font-700 text-18 md:text-19 `}
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                      {recipe.tags.map((t, id) => (
                        <Fragment key={id}>
                          <span className={`text-16`}>{t}</span>
                          {thelength === id ? "" : ", "}
                        </Fragment>
                      ))}
                    </div>
                    <div className="h-60 relative">
                      <p
                        className={`uppercase tracking-widest text-14 pl-15 mb-0`}
                      >
                        {recipe.dish}
                      </p>
                      <div className="pt-5 mr-10 flex items-center justify-end">
                        {kalender.map((w, xid) =>
                          cart.date && cart.date.includes(w.year) ? (
                            <NavLink key={w.index} to="/weekmenu">
                              <div
                                className={`relative mr-6 p-10 w-24 h-24 text-center ${
                                  cart.length !== 0
                                    ? "bg-orange-400"
                                    : "bg-gray-500"
                                } text-black rounded-50`}
                              >
                                <span className={`absolute text-12 inset-0`}>
                                  <span className="flex justify-center pt-3">
                                    {w.index}
                                  </span>
                                </span>
                              </div>
                            </NavLink>
                          ) : null
                        )}
                        {cart.favorite === true ? (
                          <NavLink to="/favorites">
                            <img
                              className="w-25"
                              src="/img/feather/bookmark-red.svg"
                              alt=""
                            />
                          </NavLink>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Dishes;