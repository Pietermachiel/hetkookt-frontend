import React, { Fragment, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { slugify, kalender } from "../common/common.js";
import AddpanelWeekmenu from "./AddpanelWeekmenu.js";
import { recipeUrl } from "../../config.json";
import { createRecipe } from "../../services/userService";

const Recipe = ({
  user,
  me,
  setMe,
  thecart,
  // thefavorites,
  // doSave,
  sorts,
  ...props
}) => {
  var [therecipe, setTheRecipe] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  // const [notitie, setNotitie] = useState(false);

  const API = props.match.url;

  // const handleIsOpen = () => {
  //   setIsOpen(!isOpen);
  // };

  // const handleNotitie = () => {
  //   setNotitie(!notitie);
  // };

  // const handleIsFavorite = (me, setMe, therecipe) => {
  //   doFavorite(me, setMe, therecipe);
  // };

  const handleCreateRecipe = (me, setMe, therecipe) => {
    // console.log("therecipe index");
    // console.log(therecipe);
    createRecipe(me, setMe, therecipe);
  };

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${recipeUrl}${API}.json`);
      res.json().then((res) => setTheRecipe(res));
    }
    getData();
  }, [API]);

  console.log("therecipe");
  console.log(therecipe);
  console.log("API");
  console.log(API);

  if (therecipe.tags === undefined) return [];
  // const thelength = props.tags.length - 1;

  // const newrecipe = thefavorites.find((c) => c._id === therecipe._id);
  // therecipe = newrecipe || therecipe;

  const myrecipes = thecart.map((m) => m._id);
  // console.log("myrecipes");
  // console.log(myrecipes);

  return (
    <Fragment>
      <div className="container-x">
        <h1 className="recepten-title text-green-600">
          {therecipe.title}
          {/* <span className="text-21 lg:pl-10">bladgroenten</span> */}
          <Link to={`/collections/${therecipe.dish}`}>
            <span className="text-21 pl-10">{therecipe.dish}</span>
          </Link>
        </h1>
        <div className="lg:flex align-baseline mb-36 unvisable slide work-grid-item">
          {user ? (
            <div className="mr-15">
              {myrecipes.includes(therecipe._id) ? (
                <Fragment>
                  <Link to="/kookschrift">
                    <div className="mb-5 lg:pr-18 btn-add mr-10 text-18 font-600 text-red-200 hover:text-red-500 flex item-center">
                      <img
                        className="w-25"
                        src="/img/feather/bookmark-red-stroke.svg"
                        alt="bookmark red"
                      />
                      <span className="ml-10">zet in favorieten ></span>
                    </div>
                  </Link>
                </Fragment>
              ) : (
                <Fragment>
                  <div
                    className="mb-5 lg:pr-18 btn-add mr-10 text-18 font-600 text-indigo-700 flex item-center hover:text-red-500"
                    onClick={() => handleCreateRecipe(me, setMe, therecipe)}
                  >
                    <img
                      className="w-25"
                      src="/img/feather/bookmark.svg"
                      alt="bookmark"
                    />
                    <span className="ml-10">zet in favorieten ></span>
                  </div>
                </Fragment>
              )}
            </div>
          ) : (
            <Fragment>
              <Link
                to="/login"
                className="mb-5 lg:pr-18 btn-add mr-10 text-18 font-600 text-indigo-700 flex item-center hover:text-red-500"
              >
                <img
                  className="w-25"
                  src="/img/feather/bookmark.svg"
                  alt="bookmark"
                />
                <span className="ml-10">zet in favorieten ></span>
              </Link>
            </Fragment>
          )}
        </div>
        <div className="recepten">
          <div className="recepten-box">
            {/* ingredienten */}
            <div className="ingredienten">
              <p>vers</p>
              <div className="ingredienten-box">
                {therecipe.fresh.map((f, xid) => {
                  const category = sorts.find((s) => s.title === f.ingredient);
                  // console.log("category");
                  // console.log(category);
                  if (category === undefined) return [];
                  const catcolor = category.sorts;
                  return (
                    <li key={xid}>
                      <div className="items-quantity">
                        {f.quantity} {f.unit}
                      </div>
                      <div className="items-product">
                        <Link
                          to={"/sorts/" + slugify(f.ingredient)}
                          className={`${catcolor}`}
                        >
                          &nbsp;{f.ingredient}
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </div>
              <p>voorraad</p>
              <div className="ingredienten-box">
                {therecipe.stock.map((f, xid) => {
                  return (
                    <li key={xid}>
                      <div className="items-quantity">
                        {f.quantity} {f.unit}
                      </div>
                      <div className="items-product text-gray-600">
                        {f.ingredient}
                      </div>
                    </li>
                  );
                })}
              </div>
              {therecipe.basics.length > 0 ? <p>basisrecepten</p> : null}
              <div className="ingredienten-box">
                {therecipe.basics.map((b, xid) => (
                  <Link key={xid} to={`/recipe/${slugify(b.name)}`}>
                    <span className="font-600">{b.name}</span>
                  </Link>
                ))}
              </div>
              {therecipe.related.length > 0 ? <p>gerelateerd</p> : null}
              <div className="ingredienten-box">
                {therecipe.related.map((b, xid) => (
                  <Link key={xid} to={`/recipe/${slugify(b.name)}`}>
                    <span className="font-600">{b.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-werkwijze">
              {/* tracking-015 > type.scss */}
              <p className="uppercase tracking-015 text-14 mb-24">werkwijze</p>
              {/* directions > recepten.scss */}
              <div className="directions">
                <ol>
                  {therecipe.directions.map((d, xid) => (
                    <li key={xid}>{d.name}</li>
                  ))}
                </ol>
              </div>
              <div className="text-18 mt-24">
                <p className="uppercase tracking-015 text-14 mb-24">
                  Nota bene
                </p>

                <p className="font-700">{therecipe.info}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="recepten-source">
          <Link to={`/book/${slugify(therecipe.source)}`}>
            <div className="flex mt-72 pb-20">
              <img className="w-25" src="/img/feather/book.svg" alt="" />
              &nbsp;<span className="pl-5">Bron: {therecipe.source}</span>
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Recipe;
