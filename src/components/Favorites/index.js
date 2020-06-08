import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { slugify, uniq } from "../common/common";
import { handleDeleteFavorite } from "../../services/userService";

const Favorites = ({ me, setMe, recipes, thefavorites }) => {
  if (thefavorites === undefined) thefavorites = [];
  console.log("thefavorites");
  console.log(thefavorites);
  console.log(thefavorites.length);
  // console.log(dishes);
  // console.log(thefavorites);

  let favoritecart = [];
  thefavorites.map((r) => {
    let thefavorite = recipes.find((f) => f._id === r);
    return favoritecart.push(thefavorite);
  });
  console.log(favoritecart);
  // const favoritecart = thecart.filter((s) => s.favorite === true);
  // console.log("favoritecart");
  // console.log(favoritecart);
  // let favoritedish = [];
  let favoritedish = favoritecart.map((f) => f.dish);
  favoritedish = favoritedish.filter(uniq);
  // console.log("favoritedish");
  // console.log(favoritedish);

  // var selectedtags = therecipes.map((s) => s.tags[0]);
  // selectedtags = selectedtags.filter(uniq).filter((e) => e != undefined);

  // const collection = selectedtags.map((s) => {
  //   const selection = therecipes.filter((r) => r.tags[0] === s);
  //   return { title: s, selection: selection };
  // });

  return (
    <Fragment>
      <div className="container-x">
        <h1 className="mt-4 mb-18 pt-15">
          favorieten
          {/* <span className="text-16 ml-18 font-300">
            <Link to="/">menu</Link>
          </span>{" "}
          <span className="text-16 ml-18 font-300">
            <Link to="/boodschappen">boodschappen</Link>
          </span>
          <span className="text-16 ml-18 font-300">favorieten</span> */}
        </h1>
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
                {favoritecart.map((m) => {
                  if (m.dish === d)
                    return (
                      <Fragment key={m._id}>
                        <div
                          className={`grid-box unvisable slide work-grid-item grid-box__black`}
                          key={m._id}
                        >
                          <div className={`min-h-full70 p-15`}>
                            <Link to={`/recipe/${slugify(m.title)}`}>
                              <h4 className={`break-words mb-15`}>{m.title}</h4>
                            </Link>
                            <ul className="mb-12">
                              {m.basics.map((b, id) => (
                                <li
                                  key={id}
                                  className={`mb-0 leading-tight font-700 text-18 md:text-19 `}
                                >
                                  {b}
                                </li>
                              ))}
                            </ul>
                            {m.tags.map((t, id) => {
                              const thelength = m.tags.length - 1;
                              return (
                                <Fragment key={id}>
                                  <span className={`text-16`}>{t}</span>
                                  {thelength === id ? "" : ", "}
                                </Fragment>
                              );
                            })}
                          </div>

                          <div className="h-72 relative overflow-hidden">
                            <p
                              className={`uppercase tracking-widest text-14 pl-15 mb-0`}
                            >
                              {m.dish}
                            </p>

                            <div
                              className={`recipe-footer__box-delete ${
                                m.isOpen ? "box-delete__open" : null
                              }`}
                            >
                              <div className="recipe-footer__box-buttons">
                                <button
                                  className="btn-delete"
                                  // onClick={() => handleUpdate(m._id)}
                                  onClick={() =>
                                    handleDeleteFavorite(me, setMe, m._id)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100"
                                    height="100"
                                    viewBox="0 0 19 19"
                                    // stroke-linejoin="round"
                                  >
                                    <path d="M14.9 17.5l2.6-2.6 -5.4-5.4 5.4-5.4 -2.6-2.6 -5.4 5.4 -5.4-5.4 -2.6 2.6 5.4 5.4 -5.4 5.4 2.6 2.6 5.4-5.4 5.4 5.4Z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteFavorite(me, setMe, m._id)
                                  }
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
