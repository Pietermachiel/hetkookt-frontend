import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../common/common";
import SelectedItems from "../Recipes/SelectedItems";
import FavoriteItems from "../Recipes/FavoriteItems";

const Sorts = ({
  me,
  setMe,
  user,
  thecart,
  recipes,
  tags,
  categories,
  ...props
}) => {
  console.log("sorts: thecart");
  console.log(tags);

  const sort = tags.find(
    (s) => s.name.replace(" ", "-") === props.match.params.id
  );
  if (sort === undefined) return [];

  const recipeItems = recipes.filter((element) => {
    let fresh = element.fresh.some(
      ({ ingredient }) => ingredient.replace(" ", "-") === props.match.params.id
    );
    return fresh;
  });

  const cartItems = thecart.filter((element) => {
    let fresh = element.fresh.some(
      ({ ingredient }) => ingredient.replace(" ", "-") === props.match.params.id
    );
    return fresh;
  });

  console.log("recipeItems");
  console.log(recipeItems);

  console.log("sort");
  console.log(sort);

  return (
    <>
      <div className="container-x">
        <h1 className={`favorieten-title ${sort.sorts}`}>
          {sort.name}{" "}
          <Link
            to={{
              pathname: `/categories/${sort.sorts}`,
              state: sort._id,
            }}
          >
            <span className="text-21 ml-10">{sort.sorts}</span>
          </Link>
        </h1>

        <div className="flexbox flexbox-margin">
          <div className="recipe-box recipe-box_sorts">
            <Link to={`/sorts/${slugify(sort.name)}`}>
              <div className="">
                <img
                  src={`/img/products/product_${slugify(sort.name)}.jpg`}
                  alt=""
                />
              </div>
            </Link>
            <div className="recipe-box-footer">
              <p className={``}>
                <span className="">{sort.name}</span>
              </p>
            </div>
          </div>
          {recipeItems.map((recipe, index) => {
            return (
              <Fragment key={index}>
                <SelectedItems recipe={recipe} {...props} />
              </Fragment>
            );
          })}
          {cartItems.map((recipe, index) => {
            return (
              <Fragment>
                <FavoriteItems recipe={recipe} {...props} />
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sorts;
