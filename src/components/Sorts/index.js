import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import useCurrentWidth from "../common/use-current-width";
import useCurrentHeight from "../common/use-current-height";
import useCurrentScroll from "../common/use-current-scroll";
import { slugify, kalender } from "../common/common";
import Productenfilter from "../CategoriesFilter/index";

const Sorts = ({ thecart, recipes, sorts, categories, ...props }) => {
  // console.log(props);

  const width = useCurrentWidth();
  const height = useCurrentHeight();
  const scroll = useCurrentScroll();
  const offset = -272;
  const box = 272;
  const boxheight = height + scroll;

  // console.log(categories);
  // console.log(sorts);

  const category = categories.find((s) => s.title === props.match.params.id);
  if (category === undefined) return [];
  const catcolor = category.category;

  const recipeItem = recipes.filter((element) => {
    let fresh = element.fresh.some(
      ({ item }) => item === props.match.params.id
    );
    return fresh;
  });
  // console.log("recipeItem");
  // console.log(recipeItem);

  // console.log("category");
  // console.log(category);

  return (
    <>
      {/* <div className="container-productenfilter">
        <Productenfilter sorts={sorts} />
      </div> */}
      <div className="container-x">
        <h1 className={`pt-15 text-42 pb-18 ${catcolor}`}>
          {props.match.params.id}
          <Link to={`/categories/${category.category}`}>
            <span className="ml-18 text-19 text-black font-300">
              > {category.category}
            </span>
          </Link>
        </h1>
        <div className="-ml-15 mb-10 flex flex-row flex-wrap">
          {recipeItem.map((recipe, index) => {
            let cart = thecart.find((c) => c._id === recipe._id);
            if (cart === undefined) cart = [];
            const thelength = recipe.tags.length - 1;
            if (recipe.basics === undefined) return (recipe.basics = []);
            const red = kalender.find((w) => w.year === cart.date);
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
                  recipe._id === cart._id ? "grid-box__black" : "grid-box__gray"
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
                <div className="h-60">
                  <p className={`uppercase tracking-widest text-14 pl-15 `}>
                    {recipe.dish}
                  </p>
                  {kalender.map((w) =>
                    w.year === cart.date ? (
                      <p
                        key={w.index}
                        className={`-mt-21 font-500 text-18 float-right pr-15 pt-11 mb-0 ${
                          red ? "text-red-500" : null
                        }`}
                      >
                        {w.day} {w.index}
                      </p>
                    ) : null
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sorts;
