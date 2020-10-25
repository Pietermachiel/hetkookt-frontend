import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { slugify } from "../common/common";

const FavoriteItems = ({ recipes, setRecipes, cart, thelength, ...props }) => {
  const recipeundefined = recipes.find((r) => r._id === cart._id);

  return (
    <Fragment>
      <div
        key={cart._id}
        className={`recipe-box text-white ${
          recipeundefined === undefined ? "bg-indigo-600" : "bg-black"
        }`}
      >
        <div className={`min-h-full70 p-12 md:p-15`}>
          <Link
            to={{
              pathname: `/mijnrecepten/${slugify(cart.title)}`,
              state: cart._id,
            }}
          >
            <h4 className={`text-18 break-words mb-15`}>{cart.title}</h4>
          </Link>

          <ul className={`leading-tight`}>
            {cart.tags.map((t, id) => (
              <Fragment key={id}>
                <li className={`inline text-15`}>
                  {t.name}
                  {thelength === id ? "" : ", "}
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
        <div className="h-72 relative overflow-hidden mt-18">
          <p
            className={`uppercase tracking-widest text-14 pl-15 mb-0;
`}
          >
            {cart.dish.name}
          </p>
          <div className="absolute top-0 right-0 mr-21">
            <img src="/img/feather/bookmark-red.svg" alt="" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FavoriteItems;
