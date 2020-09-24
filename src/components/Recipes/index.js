import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import RecipeItems from "./RecipeItems";

const Recipes = ({ recipes, books, setRecipes, ...props }) => {
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
        Recipes
        <Link to={`/nieuwrecept`}>
          <button className="bg-indigo-500 text-16 p-16 px-30 mt-18 md:mt-0 md:ml-18 align-bottom text-white uppercase tracking-widest">
            new recipe
          </button>
        </Link>
      </h1>
      <br />
      <div className="">
        {books.map((b) => {
          return (
            <div key={b._id}>
              <h3 key={b._id} className="mb-18">
                {b.name}
              </h3>
              <div className="flexbox flexbox-margin mb-18">
                {recipes.map((r) => {
                  if (r.book._id === b._id)
                    return (
                      <Fragment key={r._id}>
                        <RecipeItems
                          recipe={r}
                          recipes={recipes}
                          setRecipes={setRecipes}
                        />
                      </Fragment>
                    );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <br />
    </div>
  );
};

export default Recipes;
