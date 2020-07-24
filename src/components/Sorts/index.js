import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import useCurrentWidth from "../common/use-current-width";
import useCurrentHeight from "../common/use-current-height";
import { slugify, kalender } from "../common/common";
import RecipeItems from "../Recipes/RecipeItems";
import FavoriteItems from "../Recipes/FavoriteItems";

const Sorts = ({
  me,
  setMe,
  user,
  thecart,
  recipes,
  sorts,
  categories,
  ...props
}) => {
  // console.log(props);

  const width = useCurrentWidth();
  const height = useCurrentHeight();

  const sort = sorts.find(
    (s) => s.title.replace(" ", "-") === props.match.params.id
  );
  if (sort === undefined) return [];

  const recipeItem = recipes.filter((element) => {
    let fresh = element.fresh.some(
      ({ ingredient }) => ingredient.replace(" ", "-") === props.match.params.id
    );
    return fresh;
  });
  console.log("recipeItem");
  console.log(recipeItem);

  console.log("sort");
  console.log(sort);

  return (
    <>
      <div className="container-x">
        <h1 className={`favorieten-title ${sort.sorts}`}>
          {sort.title}{" "}
          <Link to={`/categories/${sort.sorts}`}>
            <span className="text-21 ml-10">{sort.sorts}</span>
          </Link>
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
            // const thelength = recipe.tags.length - 1;
            if (recipe.basics === undefined) return (recipe.basics = []);
            return (
              <Fragment key={index}>
                {user && recipe._id === cart._id ? (
                  <Fragment>
                    <FavoriteItems
                      recipe={recipe}
                      cart={cart}
                      Link={Link}
                      me={me}
                      setMe={setMe}
                      {...props}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <RecipeItems recipe={recipe} {...props} />
                  </Fragment>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sorts;
