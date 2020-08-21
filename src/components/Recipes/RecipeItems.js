import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { slugify, kalender } from "../common/common";
import { deleteRecipe } from "../../services/recipeService";

const RecipeItems = ({ recipes, setRecipes, recipe, thelength, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log("cart");
  // console.log(cart);
  // console.log("kalender");
  // console.log(kalender);

  const handleDeleteRecipe = (id) => {
    deleteRecipe(recipes, setRecipes, id);
  };

  return (
    <Fragment>
      <div
        key={recipe._id}
        className={`recipe-box ${
          recipe.item === "true" ? "bg-rose-200" : "bg-badge"
        } grid-box unvisable slide work-grid-item grid-box__black `}
      >
        <div className={`min-h-full70 p-12 md:p-15`}>
          <Link
            to={{
              pathname: `/recipes/${slugify(recipe.title)}`,
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
          <div
            className={`recipe-footer__box-delete ${
              isOpen ? "box-delete__open" : null
            }`}
          >
            <div className="flex items-center">
              <button
                className="btn-delete"
                // onClick={() => handleUpdate(recipe._id)}
                onClick={() => setIsOpen(!isOpen)}
              >
                <img
                  className="w-32 h32 -mt-3"
                  src="/img/icons/btn-remove.svg"
                  alt=""
                />
              </button>
              <button
                onClick={() => handleDeleteRecipe(recipe._id)}
                className="btn-weg"
              >
                Wegdoen
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RecipeItems;
