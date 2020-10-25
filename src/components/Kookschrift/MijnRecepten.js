import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { uniq } from "../common/common";
import ItemsItem from "./itemsItem";
import KookschriftNav from "../Nav/KookschriftNav";

const MijnRecepten = ({ dish, me, setMe, recipes, ...props }) => {
  const [thedish, setTheDish] = useState(props.location.state);

  const handleTheDish = (c) => {
    setTheDish(c);
  };

  if (me.items === undefined) me.items = [];

  let favoritedish = me.items.map((f) => f.dish.name);
  favoritedish = favoritedish
    .filter((f) => f !== undefined)
    .filter(uniq)
    .sort();

  return (
    <Fragment>
      <div className="container-y ">
        {!me.items && (
          <div className="hollow-dots-spinner pt-36 m-auto">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        )}
        {/* <h1 className="kookschrift-title">
          Mijn recepten
          <Link className="leading-none" to={`/nieuwitem`}>
            <button className="bg-indigo-600 text-16 p-16 px-30 mt-18 md:mt-0 md:ml-18 align-bottom text-white uppercase tracking-widest">
              nieuw recept
            </button>
          </Link>
        </h1> */}
        <h1 className="kookschrift-title justify-center mb-18 flex flex-col lg:flex-row items-center">
          {/* <Link
            className="text-red-600"
            // to={{ pathname: "/collections", state: "brood" }}
          >
            Gerechten &nbsp;
          </Link>
          / &nbsp; */}
          Kookschrift
          {/* <Link
            className="hover:text-red-600"
            to={{ pathname: "/categories", state: "bladgroenten" }}
          >
            Ingrediëten
          </Link> */}
          <Link className="pt-10 lg:pt-5 leading-none" to={`/nieuwitem`}>
            <button className="bg-indigo-600 text-14 p-14 px-30 mt-0 md:mt-0 md:ml-18 align-bottom text-white uppercase tracking-widest">
              nieuw recept
            </button>
          </Link>
        </h1>

        <ul className="lg:w-550 m-auto text-center mt-18 mb-18">
          {dish.map((c, xid) => (
            <li
              key={xid}
              value={c}
              name={c}
              onClick={() => handleTheDish(c.name)}
              className={`inline-block mb-0 font-500 hover:text-red-500 ${
                thedish === c.name ? "text-red-500" : null
              }`}
            >
              {c.name}&nbsp;&nbsp;
            </li>
          ))}
        </ul>

        <div className="">
          {/* <p className="w-full md:w-75">
            Zoek een recept in het menu van hetkookt (
            <Link
              className="font-700 text-red-500 hover:text-red-500"
              to="categories"
            >
              Ingredienten
            </Link>{" "}
            of{" "}
            <Link
              className="font-700 text-red-500 hover:text-red-500"
              to="/collections"
            >
              Gerechten
            </Link>
            ) en zet in mijn recepten. <br /> Of maak zelf een{" "}
            <Link
              className="font-700 text-indigo-600 hover:text-red-500"
              to="/nieuwitem"
            >
              nieuw recept
            </Link>{" "}
            aan voor mijn recepten. <br />
            <br />
            Zet op het weekmenu en organiseer je boodschappen.
          </p> */}
        </div>
        {me.items.length === 0 && (
          <div className="">
            <p className="font-600">
              Er staat nog geen recepten in het kookschrift.
            </p>
          </div>
        )}
        {favoritedish.map((d, xid) => {
          // if (d === undefined) return [];
          // console.log("d");
          // console.log(d);
          return (
            <Fragment key={xid}>
              <div className="border-t pb-18">
                <h2 className="mb-18 font-500">{d}</h2>
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
                            recipes={recipes}
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

export default MijnRecepten;
