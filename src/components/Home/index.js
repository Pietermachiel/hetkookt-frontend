import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useCurrentWidth from "../common/use-current-width";
import useCurrentHeight from "../common/use-current-height";
import useCurrentScroll from "../common/use-current-scroll";
import { slugify, kalender } from "../common/common";
import CategoriesFilter from "../CategoriesFilter";
import CollectionsFilter from "../CollectionsFilter";
import Search from "../Search";

const Home = ({
  user,
  dishes,
  recipes,
  categories,
  sorts,
  handleSave,
  handleDelete,
  thecart,
  ...props
}) => {
  const [isOn, setIsOn] = useState(false);

  const width = useCurrentWidth();
  const height = useCurrentHeight();
  const scroll = useCurrentScroll();
  const offset = 0;
  const box = 265;
  const boxheight = height + scroll;

  if (recipes.length === 0)
    return (
      <div className="container-x">
        <p>Loading...</p>
      </div>
    );

  // console.log(today);
  // console.log(recipes);
  // console.log(dishes);
  // console.log(kalender);
  // console.log("sorts1");
  // console.log(sorts);
  return (
    <div className="container-x">
      <Search recipes={recipes} />
      {isOn ? (
        <CollectionsFilter dishes={dishes} />
      ) : (
        <CategoriesFilter categories={categories} />
      )}
      {/* <h1 className="text-center text-4xl font-bold">
        <span
          onClick={() => setIsOn(false)}
          className={` ${isOn ? "text-gray-400 hover:text-red-500" : null}`}
        >
          wathetkookt
        </span>
        <span className="text-36 pl-10">/</span>
        <span
          onClick={() => setIsOn(true)}
          className={`${isOn ? null : "text-gray-400 hover:text-red-500"}`}
        >
          &nbsp;hoehetkookt
        </span>
      </h1> */}
      {
        !user ? (
          <div className="">
            <h1 className="text-center text-4xl font-500">
              <span className="font-300">dat</span>hetkookt!
            </h1>
            <p className="text-center mb-0">
              Schrijf je in bij <span className="font-700">hetkookt</span> en
              maak een eigen kookschrift.
            </p>
            <NavLink aria-label="register" to="/register">
              <p className="text-center text-indigo-700 font-500 mb-18">
                inschrijven >
              </p>
            </NavLink>
          </div>
        ) : null
        // <p className="text-center">
        //   <NavLink aria-label="user" to="/user">
        //     <span className="text-indigo-700 font-600">{user.name}</span>
        //   </NavLink>
        // </p>
      }
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
                console.log("cart");
                console.log(cart);
                console.log("thecart");
                console.log(thecart);
                console.log("therecipes");
                console.log(therecipes);
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
    </div>
  );
};

export default Home;
