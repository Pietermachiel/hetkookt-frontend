import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { uniq, slugify } from "../common/common";
import ItemsItem from "./itemsItem";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const markdown = `

**Er staan nog geen recepten in het kookschrift.**

Ga naar [Recepten](/collections) of maak [een eigen recept](/nieuwitem).

`;
const MijnRecepten = ({ dish, me, setMe, recipes, ...props }) => {
  const [thedish, setTheDish] = useState("all");

  const handleTheDish = (c) => {
    setTheDish(c);
  };

  // console.log("me");
  // console.log(me);

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

        <h1 className="kookschrift-title justify-center mb-18 flex flex-col lg:flex-row items-center">
          <Link
            className="leading-none"
            to={{ pathname: "/mijnrecepten", state: "brood" }}
          >
            Kookschrift &nbsp;
          </Link>
          <Link className="pt-10 lg:pt-5 leading-none" to={`/nieuwitem`}>
            <button className="bg-indigo-600 text-14 p-14 px-30 mt-0 md:mt-0 md:ml-18 align-bottom text-white uppercase tracking-widest">
              nieuw eigen recept
            </button>
          </Link>
        </h1>

        <ul className="lg:w-550 m-auto text-center mt-18 mb-18">
          {dish.map((c, xid) => {
            if (favoritedish.includes(c.name))
              return (
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
              );
          })}
        </ul>

        <div className=""></div>
        {me.items.length === 0 && (
          <ReactMarkdown
            plugins={[gfm]}
            className="kramdown m-auto mb-36 mt-36"
            children={markdown}
          />
        )}
        {favoritedish.map((d, xid) => {
          let thetags = me.items
            .map((t) => {
              if (t.dish.name === d) return t.tags[0];
            })
            .filter((f) => f !== undefined);
          thetags = thetags.map((m) => m.name).filter(uniq);
          if (d !== thedish && thedish !== "all") return null;
          return (
            <Fragment key={xid}>
              <div className="border-t pb-18">
                <h2 className="mb-18 font-500">{d}</h2>
                {thetags.map((s, xid) => {
                  return (
                    <Fragment key={xid}>
                      <div className="relative -ml-15 mb-10 flex flex-row flex-wrap">
                        <Link
                          className="recipe-box recipe-box_sorts"
                          to={`/sorts/${slugify(s)}`}
                        >
                          <div>
                            <img
                              src={`/img/products/product_${slugify(s)}.jpg`}
                              alt=""
                            />
                          </div>{" "}
                          <div className="relative h-60">
                            <p
                              className={`text-black mt-10 uppercase absolute tracking-widest top-0 left-0 text-14`}
                            >
                              <span className="pl-15">{s}</span>
                            </p>
                          </div>
                        </Link>
                        {me.items.map((recipe) => {
                          // console.log(recipe);
                          let cart = me.items.find((c) => c._id === recipe._id);
                          if (cart === undefined) cart = [];
                          if (recipe.dish.name === undefined) return [];
                          if (
                            recipe.dish.name === d &&
                            recipe.tags[0].name === s
                          )
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

export default MijnRecepten;
