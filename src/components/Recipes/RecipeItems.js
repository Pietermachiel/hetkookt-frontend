import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { slugify, kalender } from "../common/common";

const RecipeItems = ({ recipe, ...props }) => {
  // console.log("me");
  // console.log(cart);

  return (
    <Fragment>
      <div
        key={recipe._id}
        className={`recipe-box ${
          recipe.item === "true" ? "bg-rose-200" : "bg-badge"
        } grid-box unvisable slide work-grid-item grid-box__black `}
      >
        <div className={`min-h-full70 p-12 md:p-15`}>
          <Link to={`/recipe/${slugify(recipe.title)}`}>
            <h4 className={`text-18 break-words mb-15`}>{recipe.title}</h4>
          </Link>
          <ul className="mb-12">
            {recipe.basics.map((b, id) => (
              <li key={id} className={`mb-0 font-700 text-15 md:text-16 `}>
                {b.name}
              </li>
            ))}
          </ul>
          <ul className={`leading-tight`}>
            {recipe.tags.map((t, id) => (
              <Fragment key={id}>
                <li className={`inline text-15`}>
                  {t.name}
                  {/* {thelength === id ? "" : ", "} */}
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
        <div className="h-60 relative">
          <p className={`uppercase tracking-widest text-12 pl-15 `}>
            {recipe.dish}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default RecipeItems;
