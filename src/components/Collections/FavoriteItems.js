import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { slugify } from "../common/common";

const FavoriteItems = ({
  recipes,
  setRecipes,
  recipe,
  thelength,
  ...props
}) => {
  return (
    <Fragment>
      <div key={recipe._id} className="recipe-box bg-rose-200">
        <div className={`min-h-full70 p-12 md:p-15`}>
          <Link
            to={{
              pathname: `/kookschrift/${slugify(recipe.title)}`,
              state: recipe._id,
            }}
          >
            <h4 className={`text-18 break-words mb-15`}>{recipe.title}</h4>
          </Link>

          <ul className={`leading-tight`}>
            {recipe.tags.map((t, id) => (
              <Fragment key={id}>
                <li className={`inline text-15`}>
                  {t.name}
                  {thelength === id ? "" : ", "}
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
        <div className="h-72 relative overflow-hidden">
          <p className={`uppercase tracking-widest text-14 pl-15 mb-0`}>
            {recipe.dish.name}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default FavoriteItems;
