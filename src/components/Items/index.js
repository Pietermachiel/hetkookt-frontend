import React, { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import { uniq } from "../common/common";
// import { handleDeleteFavorite } from "../../services/userService";
import ItemsItem from "./itemsItem";
import { slugify, kalender } from "../common/common";

const Items = ({ me, setMe, recipes, ...props }) => {
  if (me.items === undefined) me.items = [];

  // console.log("me.items");
  // console.log(me.items);

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
          Kookschrift
          <Link to={`/nieuwrecept`}>
            <button className="bg-indigo-500 text-18 p-12 ml-18 align-bottom text-white">
              nieuw recept
            </button>
          </Link>
        </h1>

        {me.items.length === 0 ? (
          <div className="">
            <p className="font-600">Er staat nog niets in het kookschrift.</p>
            <p className="w-full md:w-50">
              Zoek een recept of maak zelf een nieuw recept aan.
            </p>
          </div>
        ) : null}
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
