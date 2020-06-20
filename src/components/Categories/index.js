import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import useCurrentWidth from "../common/use-current-width";
import useCurrentHeight from "../common/use-current-height";
import useCurrentScroll from "../common/use-current-scroll";
import { slugify, kalender } from "../common/common";
import CategoriesFilter from "../CategoriesFilter";
import RecipeItems from "./RecipeItems";

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
      <h1
        className={`mt-0 m-full text-center bg-red-100 text-black my-10 lg:mb-15 leading-relaxed ${props.match.params.id}`}
      >
        {props.match.params.id}
        {/* <Link to="/">
            <span className="ml-18 text-19 text-black font-300">> home</span>
          </Link> */}
      </h1>
      <div className="container-x">
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
                      <div key={xid} className="flexbox flexbox-margin">
                        <div className="recipe-box recipe-box_sorts">
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
                          <div className="recipe-box-footer">
                            <p>
                              <span>{s.title}</span>
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
                            <RecipeItems
                              recipe={recipe}
                              thelength={thelength}
                              red={red}
                              cart={cart}
                              width={width}
                              height={height}
                              index={index}
                              Link={Link}
                            />
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
