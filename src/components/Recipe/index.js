import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  dedag,
  hetjaar,
  slugify,
  kalender,
  theweek,
} from "../common/common.js";

const Recipe = ({ thecart, doFavorite, doSave, categories, ...props }) => {
  var [therecipe, setTheRecipe] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(false);

  const API = props.match.url;

  const handleIsOpen = () => {
    console.log("isopen?");
    setIsOpen(!isOpen);
  };

  const handleIsFavorite = (therecipe) => {
    console.log("isFavorite");
    // setIsFavorite(!isFavorite);
    doFavorite(therecipe);
  };

  useEffect(() => {
    async function getData() {
      const res = await fetch(`https://hetkookt.roozen.nl/api${API}.json`);
      // const res = await fetch(
      //   `https://pietermachiel.github.io/hetkookt-api/api${API}.json`
      // );
      res.json().then((res) => setTheRecipe(res));
    }
    getData();
  }, [API]);

  const handleSave = (therecipe, hetjaar) => {
    doSave(therecipe, hetjaar);
    // props.history.push(props.location.pathname);
    setIsOpen(!isOpen);
  };

  if (therecipe.tags === undefined) return [];
  // const thelength = props.tags.length - 1;

  const newrecipe = thecart.find((c) => c._id === therecipe._id);
  therecipe = newrecipe || therecipe;

  console.log("therecipe");
  console.log(therecipe);

  const menu = kalender.filter((k) => {
    const cart = thecart.find((c) => (c.date ? c.date.includes(k.year) : null));
    return cart;
  });

  console.log("menu");
  console.log(menu);

  return (
    <div className="container-x">
      <div className="recepten">
        <div className="recepten-box">
          <div className="title">
            <h1 className="pt-15">{therecipe.title}</h1>
            <div className="flex mb-36 mt-12">
              <Link to={`/collections/${therecipe.dish}`}>
                <div className="font-700 text-30 leading-4 pr-10">
                  {therecipe.dish}
                </div>
              </Link>
              {/* weekmenu */}
              <button
                className="btn-add mr-10 ml-24 flex item-center"
                onClick={() => handleIsOpen()}
              >
                weekmenu
                {menu.length === 0 || therecipe.date === null ? (
                  <img
                    className="w-25 h-25 ml-5"
                    src="/img/feather/list-orange.svg"
                    alt=""
                  />
                ) : null}
              </button>
              <div className="flex">
                {kalender.map((k) => {
                  var cart = thecart.filter((c) =>
                    c.date ? c.date.includes(k.year) : null
                  );
                  return cart.map((c) =>
                    c._id === therecipe._id ? (
                      <div key={c._id} className={`relative`}>
                        <img
                          className="w-30 h-30"
                          src="/img/feather/circle-orange.svg"
                          alt=""
                        />
                        <div className="absolute inset-0">
                          <span
                            key={k.index}
                            className={`flex justify-center pt-6 text-12`}
                          >
                            {k.index}
                          </span>
                        </div>
                      </div>
                    ) : null
                  );
                })}
              </div>
              {/* kookschrift */}
              <div className="mr-15 ml-24">
                <button
                  className="like flex"
                  onClick={() => handleIsFavorite(therecipe)}
                >
                  <span className="pr-5 text-19">kookschrift</span>
                  {therecipe.favorite === true ? (
                    <img
                      className="w-25"
                      src="/img/feather/bookmark-red.svg"
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-25"
                      src="/img/feather/bookmark.svg"
                      alt=""
                    />
                  )}
                </button>
              </div>
            </div>
            {/* add panel */}
            <div className="add">
              <div
                className={`action-panel ${
                  isOpen ? "action-panel__open" : null
                }`}
              >
                <div className="zetophetweekmenu-box">
                  <h6 className="pt-24 pb-5 mx-auto">week {theweek()}</h6>
                  <button className="btn-menu" onClick={() => handleIsOpen()}>
                    <svg width="100" height="100" viewBox="0 0 50 50">
                      <path d="M14.691,13.382l21.101,21.101" />
                      <path d="M35.792,13.382l-21.102,21.101" />
                    </svg>
                  </button>
                </div>

                <div className="mt-10 grid grid-cols-4 gap-10 p-24">
                  {kalender.map((k, xid) => {
                    var cart = thecart.filter((c) =>
                      c.date ? c.date.includes(k.year) : null
                    );
                    return (
                      <div
                        key={k.index}
                        onClick={() => handleSave(therecipe, hetjaar(xid))}
                        className={`relative ${
                          cart.length !== 0
                            ? "bg-orange-400 hover:bg-orange-300"
                            : "bg-gray-400 hover:bg-gray-300"
                        } text-black rounded-50 h-48 w-48 mb-20`}
                      >
                        <div className="absolute inset-0">
                          <span className="flex justify-center pt-12">
                            {k.index}
                          </span>
                        </div>
                        <div className="absolute inset-0">
                          <span className="flex justify-center kalender-index">
                            {/* {k.day !== "vandaag" ? k.index : null} */}
                            {k.day.slice(0, 2)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="maandjaar">april 2020</p>
              </div>
            </div>
          </div>
          {/* ingredienten */}
          <div className="ingredienten">
            <p>vers</p>
            <div className="ingredienten-box">
              {therecipe.fresh.map((f, xid) => {
                const category = categories.find((s) => s.title === f.item);
                if (category === undefined) return [];
                const catcolor = category.category;
                return (
                  <li key={xid}>
                    <div className="items-quantity">
                      {f.quantity} {f.unit}
                    </div>
                    <div className="items-product">
                      <Link to={"/sorts/" + f.item} className={`${catcolor}`}>
                        &nbsp;{f.item}
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
                    <div className="items-product">{f.item}</div>
                  </li>
                );
              })}
            </div>
            {therecipe.basics.length > 0 ? <p>basisrecepten</p> : null}
            <div className="ingredienten-box">
              {therecipe.basics.map((b, xid) => (
                <Link key={xid} to={`/recipe/${slugify(b)}`}>
                  <span className="font-600">{b}</span>
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
                  <li key={xid}>{d}</li>
                ))}
              </ol>
            </div>
            <div className="text-21">{therecipe.citaat}</div>
            <a
              href={`${therecipe.source_url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex">
                <img className="w-25" src="/img/feather/book.svg" alt="" />
                &nbsp;<span className="pl-5">{therecipe.source}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
