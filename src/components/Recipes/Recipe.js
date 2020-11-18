import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { slugify, slugifyu } from "../common/common.js";
import { apiUrl } from "../../config.json";
import { createRecipe } from "../../services/userService";

const Recipe = ({ user, me, setMe, therecipe, thecart, tags, ...props }) => {
  // var [therecipe, setTheRecipe] = useState([]);
  const API = props.location.state;

  // console.log(therecipe.tags[0].category.name);

  const theemail = {
    subject: "een recept van mijn hetkooktschrift",
    body:
      "%0D%0ADit recept komt uit mijn kookschrift op https://hetkookt.netlify.app.%0D%0A%0D%0A–––%0D%0A%0D%0A",
    fresh: "%0D%0A%0D%0Avers:%0D%0A",
    stock: "%0D%0A%0D%0Ahoudbaar:%0D%0A",
    directions: "%0D%0A%0D%0Awerkwijze:%0D%0A",
    info: "%0D%0A%0D%0Ainfo:%0D%0A",
    source: "%0D%0A%0D%0Abron: ",
    // adres: "%0D%0A%0D%0AMijn adres is: ",
    // afzender: "%0D%0A%0D%0AMijn afzender is: ",
    // email: me.email,
  };

  console.log("therecipe");
  console.log(therecipe);

  var myTitle = therecipe.title + "\r\n\r\n---";
  myTitle = encodeURIComponent(myTitle);

  var myFresh = therecipe.fresh.map(
    (f) => "\r\n" + f.quantity + " " + f.unit + " " + f.ingredient
  );
  myFresh = encodeURIComponent(myFresh);

  var myStock = therecipe.stock.map(
    (f) => "\r\n" + f.quantity + " " + f.unit + " " + f.ingredient
  );
  myStock = encodeURIComponent(myStock);

  var myDirections = therecipe.directions.map((f) => "\r\n" + "– " + f.name);
  myDirections = encodeURIComponent(myDirections);

  var myInfo = therecipe.info + "\r\n\r\n---";
  myInfo = encodeURIComponent(myInfo);

  var mySource =
    therecipe.book.name + "\r\n\r\n" + therecipe.book.source + "\r\n\r\n";
  mySource = encodeURIComponent(mySource);

  const handleCreateRecipe = async (me, setMe, therecipe) => {
    console.log("create therecipe");
    console.log(therecipe);
    const newrecipe = {
      _id: therecipe._id,
      title: therecipe.title,
      dish: therecipe.dish,
      tags: therecipe.tags,
      related: therecipe.related,
      fresh: therecipe.fresh,
      stock: therecipe.stock,
      directions: therecipe.directions,
      info: therecipe.info,
      date: therecipe.date,
    };

    try {
      await createRecipe(me, setMe, newrecipe);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("foutje");
        // const theerr = ex.response.data;
        // setError(theerr);
      }
    }
  };

  // useEffect(() => {
  //   async function getData() {
  //     const res = await fetch(`${apiUrl}/recipes/${API}`);
  //     res.json().then((res) => setTheRecipe(res));
  //   }
  //   getData();
  // }, [API]);

  if (therecipe.tags === undefined) return [];
  // const thelength = props.tags.length - 1;

  // const newrecipe = thefavorites.find((c) => c._id === therecipe._id);
  // therecipe = newrecipe || therecipe;

  const myrecipes = thecart.map((m) => m._id);

  return (
    <Fragment>
      <div className="container-x mt-48">
        {!therecipe && (
          <div className="hollow-dots-spinner mt-36 m-auto">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        )}
        <h1 className="recepten-title mb-18 lg:mb-0 ">
          {therecipe.title}
          {/* <span className="text-21 lg:pl-10">bladgroenten</span> */}
          <Link
            className="leading-none"
            to={{ pathname: `/collections`, state: therecipe.dish.name }}
          >
            <span className="text-21 pl-10">{therecipe.dish.name}</span>
          </Link>
        </h1>
        <div className="lg:flex align-baseline mb-36 unvisable slide work-grid-item">
          {user ? (
            <div className="mr-15">
              {myrecipes.includes(therecipe._id) ? (
                <Fragment>
                  <Link to="/mijnrecepten">
                    <div className="mt-5 mb-5 lg:pr-18 btn-add mr-10 text-18 font-600 text-red-200 hover:text-red-500 flex item-center">
                      <img
                        className="w-25"
                        src="/img/feather/bookmark-red-stroke.svg"
                        alt="bookmark red"
                      />
                      <span className="ml-10">staat in kookschrift ></span>
                    </div>
                  </Link>
                </Fragment>
              ) : (
                <Fragment>
                  <div
                    className="mt-5 mb-5 lg:pr-18 btn-add mr-10 text-18 font-600 text-indigo-700 flex item-center hover:text-red-500"
                    onClick={() => handleCreateRecipe(me, setMe, therecipe)}
                  >
                    <img
                      className="w-25"
                      src="/img/feather/bookmark.svg"
                      alt="bookmark"
                    />
                    <span className="ml-10">zet in kookschrift ></span>
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
                <span className="ml-10">zet in kookschrift ></span>
              </Link>
            </Fragment>
          )}
          {user && user.isAdmin && (
            <Link
              // to={`/editrecipe/${slugify(therecipe.title)}`}
              to={{
                pathname: `/editrecipe/${slugify(therecipe.title)}`,
                state: therecipe._id,
              }}
              className="pt-3"
            >
              <button className="mb-5 lg:pr-18 btn-add mr-10 text-19 font-600 text-indigo-700 flex item-center hover:text-red-500">
                <img
                  className="w-25 h-25 mr-10"
                  src="/img/feather/edit.svg"
                  alt=""
                />
                edit
              </button>
            </Link>
          )}
        </div>
        <div className="recepten">
          <div className="recepten-box">
            {/* ingredienten */}
            <div className="ingredienten">
              <p>vers</p>
              <div className="ingredienten-box">
                {therecipe.fresh.map((f, xid) => {
                  const thetag = tags.find((s) => s.name === f.ingredient);
                  // console.log("thetag");
                  // console.log(thetag);
                  if (thetag === undefined) return [];
                  const catcolor = thetag.category.name;
                  return (
                    <li key={xid}>
                      <div className="items-quantity">
                        {f.quantity} {f.unit}
                      </div>
                      <div className="items-product">
                        <Link
                          to={"/sorts/" + slugifyu(f.ingredient)}
                          className={`${catcolor}`}
                        >
                          &nbsp;{f.ingredient}
                        </Link>
                      </div>
                    </li>
                  );
                })}
                {therecipe.fresh.map((f, xid) => {
                  const thetag = tags.find((s) => s.name === f.ingredient);
                  // console.log("thetag");
                  // console.log(thetag);
                  if (thetag === undefined)
                    return (
                      <li key={xid}>
                        <div className="items-quantity">
                          {f.quantity} {f.unit}
                        </div>
                        <div className="items-product">
                          &nbsp;{f.ingredient}
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
                      <div className="items-product text-voorraad">
                        {f.ingredient}
                      </div>
                    </li>
                  );
                })}
              </div>
              {/* {therecipe.basics.length > 0 ? <p>basisrecepten</p> : null}
              <div className="ingredienten-box">
                {therecipe.basics.map((b, xid) => (
                  <Link key={xid} to={`/recipe/${slugify(b.name)}`}>
                    <span className="font-600">{b.name}</span>
                  </Link>
                ))}
              </div> */}
              {therecipe.related.length > 0 ? <p>gerelateerd</p> : null}
              <div className="ingredienten-box">
                {therecipe.related.map((b, xid) => (
                  <Link
                    key={xid}
                    to={{
                      pathname: `/recipes/${slugify(b.title)}`,
                      state: b._id,
                    }}
                  >
                    <span className="font-600">{b.title}</span>
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
          <a
            href={`mailto:?SUBJECT=${theemail.subject}&BODY=${
              theemail.body +
              myTitle +
              theemail.fresh +
              myFresh +
              theemail.stock +
              myStock +
              theemail.directions +
              myDirections +
              theemail.info +
              myInfo +
              theemail.source +
              mySource
              // + theemail.adres
              // + theemail.afzender
              // + theemail.email
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Stuur het recept naar een vriend:
            <span className="table md:inline mt-18 md:mt-0 ml-0 md:ml-18 py-18 px-36 bg-indigo-500 text-white uppercase text-16 tracking-widest">
              Stuur email
            </span>
          </a>
        </div>

        <div className="recepten-source">
          <Link
            to={{
              pathname: `/books/${slugify(therecipe.book.name)}`,
              state: therecipe.book._id,
            }}
          >
            <div className="flex mt-72 pb-20">
              <img className="w-25" src="/img/feather/book.svg" alt="" />
              &nbsp;<span className="pl-5">Bron: {therecipe.book.name} </span>
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Recipe;
