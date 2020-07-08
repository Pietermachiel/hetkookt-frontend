import React, { Fragment, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { slugify, kalender } from "../common/common.js";
import AddpanelWeekmenu from "./AddpanelWeekmenu.js";

const Item = ({ user, me, setMe, doSave, sorts, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState([]);

  // console.log(props);
  // console.log(user);
  // console.log(props.match.params.id);
  // console.log(me.items);

  if (me.items === undefined) return [];
  const therecipe = me.items.find(
    (i) => slugify(i.title) === props.match.params.id
  );
  //   const therecipe = me.items.map((i) => i.title);

  // console.log("therecipe");
  // console.log(therecipe);

  const API = props.match.url;

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <div className="container-x unvisable slide work-grid-item">
        <h1 className="-mt-20 text-28 lg:text-36 text-green-600 mb-18 lg:mb-8">
          {therecipe.title}
          {/* <span className="text-21 lg:pl-10">bladgroenten</span> */}
          <Link to={`/collections/${therecipe.dish}`}>
            <span className="text-21 pl-10">{therecipe.dish}</span>
          </Link>
        </h1>
        <div className="lg:flex align-baseline mb-36 ">
          {user && (
            <button
              className="mb-5 lg:pr-18 btn-add mr-10 text-19 font-600 text-indigo-700 flex item-center hover:text-red-500"
              onClick={handleIsOpen}
            >
              <img
                className="w-25 h-25 mr-10"
                src="/img/feather/list.svg"
                alt=""
              />
              weekmenu >
              <div className="flex">
                {kalender.map((k) => {
                  var cart = me.items.filter((c) =>
                    c.date ? c.date.includes(k.year) : null
                  );
                  return cart.map((c) =>
                    c._id === therecipe._id ? (
                      <NavLink className="ml-10" key={c._id} to={`/weekmenu`}>
                        <div className={`relative`}>
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
                      </NavLink>
                    ) : null
                  );
                })}
              </div>
            </button>
          )}
          <Link to={`/edit/${slugify(therecipe.title)}`}>
            <button className="mb-5 lg:pr-18 btn-add mr-10 text-19 font-600 text-indigo-700 flex item-center hover:text-red-500">
              <img
                className="w-25 h-25 mr-10"
                src="/img/feather/edit.svg"
                alt=""
              />
              edit
            </button>
          </Link>

          {/* <button className="mb-5 lg:pr-18 btn-add mr-10 text-19 font-600 text-red-700 flex item-center hover:text-red-500">
            <img
              className="w-25 h-25 mr-10"
              src="/img/feather/x-square.svg"
              alt=""
            />
            delete
          </button> */}
        </div>
        {/* add panel */}
        <AddpanelWeekmenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleIsOpen={handleIsOpen}
          therecipe={therecipe}
          // thecart={me.items}
          // doSave={doSave}
          me={me}
          setMe={setMe}
        />
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
                          to={"/sorts/" + f.ingredient}
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
                  <Link key={xid} to={`/recipe/${slugify(b)}`}>
                    <span className="font-600">{b}</span>
                  </Link>
                ))}
              </div>
              {therecipe.related.length > 0 ? <p>gerelateerd</p> : null}
              <div className="ingredienten-box">
                {therecipe.related.map((b, xid) => (
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
          <a
            href={`${therecipe.source_url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex mt-72">
              <img className="w-25" src="/img/feather/book.svg" alt="" />
              &nbsp;<span className="pl-5">Bron: {therecipe.source}</span>
            </div>
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default Item;
