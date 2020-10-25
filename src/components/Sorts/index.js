import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { slugify, slugifyu } from "../common/common";
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
  console.log("sorts index");
  console.log(tags);
  console.log("props.match.params.id");
  console.log(props.match.params.id);

  const sort = tags.find(
    (s) => s.name.replace(" ", "-") === props.match.params.id
  );
  if (sort === undefined) return [];

  const recipeItems = recipes.filter((element) => {
    let tags = element.tags.some(
      ({ name }) => name.replace(" ", "-") === props.match.params.id
    );
    return tags;
  });

  const cartItems = thecart.filter((element) => {
    let tags = element.tags.some(
      ({ name }) => name.replace(" ", "-") === props.match.params.id
    );
    return tags;
  });

  console.log("recipeItems");
  console.log(recipeItems);

  console.log("sort");
  console.log(sort);

  return (
    <>
      <div className="container-x">
        <h1 className={`mt-24 py-18 ${sort.sorts}`}>
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
            <Link to={`/sorts/${slugifyu(sort.name)}`}>
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
          {cartItems.map((cart, index) => {
            return (
              <Fragment>
                <FavoriteItems cart={cart} recipes={recipes} {...props} />
              </Fragment>
            );
          })}{" "}
          {recipeItems.map((recipe, index) => {
            return (
              <Fragment key={index}>
                <SelectedItems recipe={recipe} {...props} />
              </Fragment>
            );
          })}
          {recipeItems.length === 0 && cartItems.length === 0 ? (
            <p className="ml-18 p-18">
              geen recepten met <strong>{props.match.params.id}</strong>
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Sorts;
