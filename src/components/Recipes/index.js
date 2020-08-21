import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import RecipeItems from "./RecipeItems";

const Recipes = ({ recipes, setRecipes, ...props }) => {
  // console.log(props);
  // console.log(recipes);
  return (
    <div className="container-x">
      {!recipes && (
        <div className="hollow-dots-spinner pt-36 m-auto">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}
      <h1 className="favorieten-title">
        Favorieten
        <Link to={`/nieuwrecept`}>
          <button className="bg-indigo-500 text-16 p-16 px-30 mt-18 md:mt-0 md:ml-18 align-bottom text-white uppercase tracking-widest">
            nieuw recept
          </button>
        </Link>
      </h1>
      <br />
      <div className="flexbox flexbox-margin">
        {recipes.map((r) => (
          <Fragment key={r._id}>
            <RecipeItems recipe={r} recipes={recipes} setRecipes={setRecipes} />
          </Fragment>
        ))}
      </div>
      <br />
    </div>
  );
};

export default Recipes;
