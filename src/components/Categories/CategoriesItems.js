import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../common/common";
import RecipeItems from "../Recipes/RecipeItems";
import FavoriteItems from "../Recipes/FavoriteItems";
import { includes } from "lodash";
// import { handleDeleteFavorite } from "../../services/userService";

const CategoriesItems = ({
  me,
  setMe,
  thecart,
  categories,
  recipes,
  ...props
}) => {
  // console.log(sorts);
  console.log("thecart");
  console.log(thecart);

  return (
    <>
      <div className="container-x">
        <h1 className="favorieten-title">{props.match.params.id}</h1>

        {categories.map((category, index) => {
          // console.log(props.match.params.id);
          // console.log(category.title);
          if (category.title === props.match.params.id)
            return (
              <Fragment key={index}>
                {category.sorts.map((s, xid) => {
                  let recipeItem = recipes.filter((element) => {
                    let fresh = element.fresh.some(
                      ({ ingredient }) =>
                        ingredient.replace(" ", "-") === s.title
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
                          console.log("thecart");
                          console.log(thecart);
                          let cart = thecart
                            .filter((e) => e !== undefined)
                            .find((c) => c._id === recipe._id);
                          if (cart === undefined) cart = [];
                          // cart = cart.filter((f) => f !== undefined);
                          console.log("cart");
                          console.log(cart);
                          if (recipe.basics === undefined)
                            return (recipe.basics = []);
                          return (
                            <Fragment key={recipe._id}>
                              {cart._id === recipe._id ? (
                                <FavoriteItems
                                  recipe={recipe}
                                  cart={cart}
                                  Link={Link}
                                  // handleDeleteFavorite={handleDeleteFavorite}
                                  me={me}
                                  setMe={setMe}
                                  {...props}
                                />
                              ) : (
                                <RecipeItems
                                  recipe={recipe}
                                  cart={cart}
                                  Link={Link}
                                  // handleDeleteFavorite={handleDeleteFavorite}
                                  me={me}
                                  setMe={setMe}
                                  {...props}
                                />
                              )}
                            </Fragment>
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

export default CategoriesItems;
