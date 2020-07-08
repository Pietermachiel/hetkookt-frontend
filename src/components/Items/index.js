import React, { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import { uniq } from "../common/common";
// import { handleDeleteFavorite } from "../../services/userService";
import ItemsItem from "./itemsItem";
import { slugify, kalender } from "../common/common";

const Items = ({ me, setMe, recipes, ...props }) => {
  if (me.items === undefined) me.items = [];

  console.log("me.items");
  console.log(me.items);

  //   let favoritecart = [];
  //   me.items.map((r) => {
  //     let thefavorite = recipes.find((f) => f._id === r);
  //     return favoritecart.push(thefavorite);
  //   });

  let favoritedish = me.items.map((f) => f.dish);
  favoritedish = favoritedish.filter(uniq);

  return (
    <Fragment>
      <div className="container-x">
        <h1 className="mb-36 -mt-20">
          Favorieten
          <Link to={`/nieuwrecept`}>
            <button className="bg-indigo-500 text-16 p-16 px-30 ml-18 align-bottom text-white uppercase tracking-widest">
              nieuw recept
            </button>
          </Link>
        </h1>

        {me.items.length === 0 ? (
          <div className="">
            <p className="font-600">Er staat nog niets in het kookschrift.</p>
            <p className="w-full md:w-50">
              Zoek een recept in{" "}
              <Link
                className="font-700 text-indigo-600 hover:text-red-500"
                to="categories"
              >
                recepten
              </Link>{" "}
              of{" "}
              <Link
                className="font-700 text-indigo-600 hover:text-red-500"
                to="/collections"
              >
                collecties
              </Link>{" "}
              of maak zelf een{" "}
              <Link
                className="font-700 text-indigo-600 hover:text-red-500"
                to="/nieuwrecept"
              >
                nieuw recept
              </Link>{" "}
              aan.
            </p>
          </div>
        ) : (
          <p className="w-full">
            Zoek een recept in{" "}
            <Link
              className="font-700 text-indigo-600 hover:text-red-500"
              to="categories"
            >
              recepten
            </Link>{" "}
            of{" "}
            <Link
              className="font-700 text-indigo-600 hover:text-red-500"
              to="/collections"
            >
              collecties
            </Link>{" "}
            of maak zelf een{" "}
            <Link
              className="font-700 text-indigo-600 hover:text-red-500"
              to="/nieuwrecept"
            >
              nieuw recept
            </Link>{" "}
            aan.
          </p>
        )}
        {favoritedish.map((d, xid) => {
          return (
            <Fragment key={xid}>
              <h2 className="mb-18">{d}</h2>
              <div className="relative -ml-15 mb-10 flex flex-row flex-wrap">
                {me.items.map((recipe) => {
                  let cart = me.items.find((c) => c._id === recipe._id);
                  if (cart === undefined) cart = [];
                  // console.log("recipe recipeitems");
                  // console.log(recipe._id);
                  const red = kalender.find((w) => w.year === cart.date);
                  if (recipe.dish === undefined) return [];
                  if (recipe.dish === d)
                    return (
                      <Fragment key={recipe._id}>
                        <ItemsItem
                          recipe={recipe}
                          red={red}
                          cart={cart}
                          Link={Link}
                          // handleDeleteFavorite={handleDeleteFavorite}
                          me={me}
                          setMe={setMe}
                          {...props}
                        />
                      </Fragment>
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

export default Items;
