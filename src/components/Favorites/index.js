import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { slugify, uniq } from "../common/common";
import { handleDeleteFavorite, handleDelete } from "../../services/userService";
import RecipeItems from "../Categories/RecipeItems";

const Favorites = ({ me, setMe, recipes, thefavorites, ...props }) => {
  if (thefavorites === undefined) thefavorites = [];
  // console.log("thefavorites");
  // console.log(thefavorites);
  // console.log(thefavorites.length);
  // console.log(dishes);
  // console.log(thefavorites);

  let favoritecart = [];
  thefavorites.map((r) => {
    let thefavorite = recipes.find((f) => f._id === r);
    return favoritecart.push(thefavorite);
  });
  // console.log("me.recipes");
  // console.log(me.recipes);
  // console.log("favoritecart");
  // console.log(favoritecart);

  // const favoritecart = thecart.filter((s) => s.favorite === true);
  // console.log("favoritecart");
  // console.log(favoritecart);
  // let favoritedish = [];
  let favoritedish = favoritecart.map((f) => f.dish);
  favoritedish = favoritedish.filter(uniq);
  // console.log("favoritedish");
  // console.log(favoritedish);

  return (
    <Fragment>
      <h1 className="mt-0 -mx-20 text-center bg-red-500 text-red-100 my-10 leading-relaxed ">
        Favorieten
      </h1>
      <div className="container-x">
        {thefavorites.length === 0 ? (
          <div className="">
            <p className="font-600">Er staat nog niets in het kookschrift.</p>
            <p className="w-full md:w-50">
              Zoek je favorite recepten en voeg er persoonlijke notities aan
              toe.
            </p>
          </div>
        ) : null}
        {favoritedish.map((d, xid) => {
          return (
            <Fragment key={xid}>
              <h2 className="mb-18">{d}</h2>
              <div className="-ml-15 mb-10 flex flex-row flex-wrap">
                {favoritecart.map((recipe) => {
                  let cart = me.recipes.find((c) => c._id === recipe._id);
                  if (cart === undefined) cart = [];
                  // console.log("recipe recipeitems");
                  // console.log(recipe._id);
                  if (recipe.dish === undefined) return [];
                  if (recipe.dish === d)
                    return (
                      <RecipeItems
                        key={recipe._id}
                        recipe={recipe}
                        // red={red}
                        cart={cart}
                        // index={index}
                        // thelength={thelength}
                        // width={width}
                        // height={height}
                        Link={Link}
                        handleDeleteFavorite={handleDeleteFavorite}
                        me={me}
                        setMe={setMe}
                        {...props}
                      />
                    );
                })}
              </div>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Favorites;
