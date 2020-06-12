import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import useCurrentWidth from "../common/use-current-width";
import useCurrentHeight from "../common/use-current-height";
import useCurrentScroll from "../common/use-current-scroll";
import { slugify, kalender } from "../common/common";
import CategoriesFilter from "../CategoriesFilter";

const Categories = ({ thecart, categories, recipes, ...props }) => {
  // console.log(sorts);

  const width = useCurrentWidth();
  const height = useCurrentHeight();
  const scroll = useCurrentScroll();
  const offset = -272;
  const box = 272;
  const boxheight = height + scroll;

  // console.log("thecart");
  // console.log(thecart);

  return (
    <>
      {/* <CategoriesFilter categories={categories} /> */}

      <div className="container-x">
        <h1
          className={`mt-0 -mx-20 text-center bg-red-100 text-black my-10 leading-relaxed ${props.match.params.id}`}
        >
          {props.match.params.id}
          {/* <Link to="/">
            <span className="ml-18 text-19 text-black font-300">> home</span>
          </Link> */}
        </h1>
        {categories.map((category, index) => {
          // console.log(props.match.params.id);
          // console.log(category.title);
          if (category.title === props.match.params.id)
            return (
              <Fragment key={index}>
                {category.sorts.map((s, xid) => {
                  const recipeItem = recipes.filter((element) => {
                    let fresh = element.fresh.some(
                      ({ item }) => item.replace(" ", "-") === s.title
                    );
                    return fresh;
                  });
                  // console.log("recipeItem");
                  // console.log(recipeItem);
                  if (recipeItem.length !== 0)
                    return (
                      <div key={xid} className="-ml-15 flex flex-row flex-wrap">
                        <div
                          // className="grid-box unvisable slide work-grid-item"
                          //
                          className="bg-offblack min-h-220 lg:min-h-250 text-white border border-gray-400 w-1/2/10 sm:w-1/2/15 lg:w-1/4/15 xl:w-1/4/15 ml-10 mb-10 md:ml-15 md:mb-15"
                        >
                          {/* <Link to={`/sorts/${slugify(s.title)}`}> */}
                          <div className="">
                            <img
                              src={`/img/products/product_${slugify(
                                s.title
                              )}.jpg`}
                              alt=""
                            />
                          </div>
                          {/* </Link> */}
                          <div className="relative h-60">
                            <p
                              className={`mt-10 uppercase absolute tracking-widest top-0 left-0 text-12`}
                            >
                              <span className="pl-15">{s.title}</span>
                            </p>
                          </div>
                        </div>
                        {recipeItem.map((recipe, index) => {
                          let cart = thecart.find((c) => c._id === recipe._id);
                          if (cart === undefined) cart = [];
                          const thelength = recipe.tags.length - 1;
                          if (recipe.basics === undefined)
                            return (recipe.basics = []);
                          const red = kalender.find(
                            (w) => w.year === cart.date
                          );
                          return (
                            <div
                              key={recipe._id}
                              className={`border border-gray-400 min-h-220 lg:min-h-250 ${
                                recipe.meal === "true" ? "bg-rose" : "bg-badge"
                              } w-1/2/10 sm:w-1/2/15 md:w-1/3/15 lg:w-1/4/15 ml-10 mb-10 md:ml-15 md:mb-15 unvisable ${
                                width > 992
                                  ? boxheight >
                                    offset + box * Math.round((index - 3) / 4)
                                    ? "slide"
                                    : ""
                                  : width > 768
                                  ? boxheight >
                                    offset + box * Math.round((index - 3) / 4)
                                    ? "slide"
                                    : ""
                                  : boxheight >
                                    offset + box * Math.round((index - 2) / 2)
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
                                  <h4 className={`text-18 break-words mb-15`}>
                                    {recipe.title}
                                  </h4>
                                </Link>
                                <ul className="mb-12">
                                  {recipe.basics.map((b, id) => (
                                    <li
                                      key={id}
                                      className={`mb-0 font-700 text-15 md:text-16 `}
                                    >
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                                <ul className={`leading-tight`}>
                                  {recipe.tags.map((t, id) => (
                                    <Fragment key={id}>
                                      <li className={`inline text-15`}>
                                        {t}
                                        {thelength === id ? "" : ", "}
                                      </li>
                                    </Fragment>
                                  ))}
                                </ul>
                              </div>
                              <div className="h-60">
                                <p
                                  className={`uppercase tracking-widest text-12 pl-15 `}
                                >
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
                    );
                })}
              </Fragment>
            );
        })}
      </div>
    </>
  );
};

export default Categories;
