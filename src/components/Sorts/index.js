import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import useCurrentWidth from "../common/use-current-width";
import useCurrentHeight from "../common/use-current-height";
import useCurrentScroll from "../common/use-current-scroll";
import { slugify, kalender } from "../common/common";
import CategoriesFilter from "../CategoriesFilter";
import RecipeItems from "../RecipeItems";

const Sorts = ({ me, thecart, recipes, sorts, categories, ...props }) => {
  // console.log(props);

  const width = useCurrentWidth();
  const height = useCurrentHeight();

  const sort = sorts.find(
    (s) => s.title.replace(" ", "-") === props.match.params.id
  );
  if (sort === undefined) return [];
  const catcolor = sort.category;

  const recipeItem = recipes.filter((element) => {
    let fresh = element.fresh.some(
      ({ item }) => item.replace(" ", "-") === props.match.params.id
    );
    return fresh;
  });
  // console.log("recipeItem");
  // console.log(recipeItem);

  // console.log("sort");
  // console.log(sort);

  return (
    <>
      <div className="container-x">
        <h1 className={`-mt-20 mb-36 ${sort.sorts}`}>
          {sort.title} <span className="text-21 ml-10">{sort.sorts}</span>
        </h1>

        <div className="flexbox flexbox-margin">
          <div className="recipe-box recipe-box_sorts">
            <Link to={`/sorts/${slugify(sort.title)}`}>
              <div className="">
                <img
                  src={`/img/products/product_${slugify(sort.title)}.jpg`}
                  alt=""
                />
              </div>
            </Link>
            <div className="recipe-box-footer">
              <p className={``}>
                <span className="">{sort.title}</span>
              </p>
            </div>
          </div>

          {recipeItem.map((recipe, index) => {
            let cart = thecart.find((c) => c._id === recipe._id);
            if (cart === undefined) cart = [];
            const thelength = recipe.tags.length - 1;
            if (recipe.basics === undefined) return (recipe.basics = []);
            const red = kalender.find((w) => w.year === cart.date);
            return (
              <RecipeItems
                key={index}
                me={me}
                recipe={recipe}
                thelength={thelength}
                red={red}
                cart={cart}
                width={width}
                height={height}
                index={index}
                Link={Link}
                {...props}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sorts;
