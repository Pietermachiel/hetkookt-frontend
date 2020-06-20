import React from "react";
import { Fragment } from "react";
import { slugify, kalender } from "../common/common";

const RecipeItems = ({
  width,
  height,
  index,
  cart,
  Link,
  recipe,
  thelength,
  red,
  me,
  setMe,
  handleDeleteFavorite,
  ...props
}) => {
  // console.log("recipe");
  // console.log(me.favorites);

  return (
    <Fragment>
      <div
        key={recipe._id}
        className={`recipe-box ${
          recipe.meal === "true" ? "bg-rose" : "bg-badge"
        } grid-box unvisable slide work-grid-item grid-box__black `}
      >
        <div className={`min-h-full70 p-12 md:p-15`}>
          <Link to={`/recipe/${slugify(recipe.title)}`}>
            <h4 className={`text-18 break-words mb-15`}>{recipe.title}</h4>
          </Link>
          <ul className="mb-12">
            {recipe.basics.map((b, id) => (
              <li key={id} className={`mb-0 font-700 text-15 md:text-16 `}>
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
        <div className="h-60 relative">
          <p className={`uppercase tracking-widest text-12 pl-15 `}>
            {recipe.dish}
          </p>
          {kalender.map((w) =>
            w.year.includes(cart.date) ? (
              <p
                key={w.index}
                className={`-mt-21 font-300 text-16 float-right pr-48 pt-11 mb-0 ${
                  red ? "text-red-500" : null
                }`}
              >
                {w.day} {w.index}
              </p>
            ) : null
          )}
          {props.location.pathname.includes("/favorites") && (
            <div className={`recipe-footer__box-delete`}>
              <div className="recipe-footer__box-buttons">
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteFavorite(me, setMe, recipe._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 19 19"
                  >
                    <path d="M14.9 17.5l2.6-2.6 -5.4-5.4 5.4-5.4 -2.6-2.6 -5.4 5.4 -5.4-5.4 -2.6 2.6 5.4 5.4 -5.4 5.4 2.6 2.6 5.4-5.4 5.4 5.4Z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default RecipeItems;
