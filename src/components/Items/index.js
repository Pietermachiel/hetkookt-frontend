import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { uniq } from "../common/common";
import ItemsItem from "./itemsItem";

const Items = ({ me, setMe, recipes, ...props }) => {
  if (me.items === undefined) me.items = [];

  let favoritedish = me.items.map((f) => f.dish.name);
  favoritedish = favoritedish
    .filter((f) => f !== undefined)
    .filter(uniq)
    .sort();

  console.log("me.items");
  console.log(me.items);
  console.log(favoritedish);

  return (
    <Fragment>
      <div className="container-y bg-rose-100">
        {!me.items && (
          <div className="hollow-dots-spinner pt-36 m-auto">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        )}
        <h1 className="favorieten-title">
          Recepten
          <Link to={`/nieuwitem`}>
            <button className="bg-indigo-500 text-16 p-16 px-30 mt-18 md:mt-0 md:ml-18 align-bottom text-white uppercase tracking-widest">
              nieuw recept
            </button>
          </Link>
        </h1>

        <div className="">
          <p className="w-full md:w-75">
            Zoek een recept in het menu (
            <Link
              className="font-700 text-indigo-600 hover:text-red-500"
              to="categories"
            >
              labels
            </Link>{" "}
            of{" "}
            <Link
              className="font-700 text-indigo-600 hover:text-red-500"
              to="/collections"
            >
              collecties
            </Link>
            ) en zet in het kookschrift, of maak zelf een{" "}
            <Link
              className="font-700 text-indigo-600 hover:text-red-500"
              to="/nieuwrecept"
            >
              nieuw kookschriftrecept
            </Link>{" "}
            aan.
          </p>
        </div>
        {me.items.length === 0 && (
          <div className="">
            <p className="font-600">Er staat nog niets in het kookschrift.</p>
          </div>
        )}
        {favoritedish.map((d, xid) => {
          // if (d === undefined) return [];
          // console.log("d");
          // console.log(d);
          return (
            <Fragment key={xid}>
              <div className="border-t pb-18">
                <h2 className="mb-18">{d}</h2>
                <div className="relative -ml-15 mb-10 flex flex-row flex-wrap">
                  {me.items.map((recipe) => {
                    let cart = me.items.find((c) => c._id === recipe._id);
                    if (cart === undefined) cart = [];
                    if (recipe.dish.name === undefined) return [];
                    if (recipe.dish.name === d)
                      return (
                        <Fragment key={recipe._id}>
                          <ItemsItem
                            key={recipe._id}
                            recipe={recipe}
                            cart={cart}
                            Link={Link}
                            me={me}
                            setMe={setMe}
                            {...props}
                          />
                        </Fragment>
                      );
                  })}
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Items;
