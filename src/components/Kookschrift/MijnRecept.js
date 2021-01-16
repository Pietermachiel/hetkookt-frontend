import React, { Fragment, useState } from "react";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import { slugify, slugifyu, kalender } from "../common/common.js";
import AddpanelWeekmenu from "./AddpanelWeekmenu.js";
import {
  doPutGroceries,
  deleteFromGroceries,
  deleteItem,
} from "../../services/userService";

const MijnRecept = ({
  therecipe,
  thegroceries,
  thecart,
  user,
  me,
  setMe,
  doSave,
  tags,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [routeRedirect, setRedirect] = useState("");

  // if (me.items === undefined) return [];
  // const therecipe = me.items.find(
  //   (i) => slugify(i.title) === props.match.params.id
  // );

  const myrecipes = thecart.map((m) => m._id);

  console.log("therecipe");
  console.log(therecipe);
  console.log(therecipe.myrecipe);
  console.log(me);

  const handleCreateGroceries = (me, setMe, therecipe) => {
    doPutGroceries(me, setMe, therecipe);
  };

  const handleDeleteGroceries = (me, setMe, id) => {
    console.log("delete groceries");
    deleteFromGroceries(me, setMe, id);
  };

  const handleDeleteItem = (me, setMe, id) => {
    console.log("id");
    console.log(id);
    try {
      deleteItem(me, setMe, id);
      window.location = `/recipes/${slugify(therecipe.title)}`;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("foutje");
      }
    }
  };

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const redirect = routeRedirect;
  if (redirect) {
    return <Redirect to="/weekmenu" />;
  }

  const theemail = {
    subject: "een recept uit mijn kookschrift",
    body:
      "%0D%0AMaak zelf ook een kookschrift op: https://hetkookt.netlify.app.%0D%0A%0D%0A–––%0D%0A%0D%0A",
    fresh: "%0D%0A%0D%0Avers:%0D%0A",
    stock: "%0D%0A%0D%0Ahoudbaar:%0D%0A",
    directions: "%0D%0A%0D%0Awerkwijze:%0D%0A",
    info: "%0D%0A%0D%0Ainfo:%0D%0A",
    // adres: "%0D%0A%0D%0AMijn adres is: ",
    // afzender: "%0D%0A%0D%0AMijn afzender is: ",
    // email: me.email,
  };

  var myTitle = therecipe.title + "\r\n\r\n---";
  myTitle = encodeURIComponent(myTitle);

  var myRecipe =
    "Recept uit '" +
    therecipe.book.name +
    "' van " +
    therecipe.book.author +
    " bewerkt door " +
    user.name +
    "\r\n";
  myRecipe = encodeURIComponent(myRecipe);

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

  return (
    <Fragment>
      <div className="container-y unvisable slide work-grid-item">
        <h1 className="flex mt-24 pt-24 mb-5 lg:text-42">
          {therecipe.title}
          <Link
            className="leading-none"
            to={`/edititem/${slugify(therecipe.title)}`}
          >
            <button className="mb-5 lg:pr-18 btn-add mr-10 ml-12 text-16 font-100 flex item-center">
              <img
                className="w-25 h-25 mr-10"
                src="/img/feather/edit.svg"
                onMouseOver={(e) =>
                  (e.currentTarget.src = "/img/feather/edit-red.svg")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.src = "/img/feather/edit.svg")
                }
                alt=""
              />
              edit
            </button>
          </Link>
        </h1>
        <div className="mb-36 ">
          {therecipe.myrecipe === true && (
            <p className="font-700 text-16 mt-9">Recept van {me.name}</p>
          )}

          {therecipe.myrecipe === false && (
            <p className="font-700 text-16 mt-9">
              Recept van&nbsp;
              <Link
                to={{
                  pathname: `/books/${slugify(therecipe.book.name)}`,
                  state: therecipe.book._id,
                }}
                className="recept-by"
              >
                {therecipe.book.author}
              </Link>{" "}
              bewerkt door&nbsp;
              {/* <Link
                to={{
                  pathname: `/books/hetkookt`,
                  state: therecipe.book._id,
                }}
                className="recept-by"
              > */}
              {me.name}
              {/* </Link> */}
            </p>
          )}
          <div className="md:flex my-18">
            {user ? (
              <div className="">
                {myrecipes.includes(therecipe._id) && (
                  <Fragment>
                    <button
                      onClick={() => handleDeleteItem(me, setMe, therecipe._id)}
                      className="flex items-center  bg-white text-14 p-14 px-24 mt-0 md:mt-0 text-red-500 uppercase tracking-widest"
                    >
                      <img
                        className="w-25"
                        src="/img/feather/bookmark-red.svg"
                        alt="bookmark red"
                      />
                      <span className="pl-9">staat in kookschrift</span>
                    </button>
                  </Fragment>
                )}
              </div>
            ) : (
              <Fragment>
                <Link
                  to="/login"
                  className="w-265 mb-5 lg:pr-18 btn-add mr-10 text-18 font-600 text-indigo-700 flex item-center hover:text-red-500"
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
            <div className="md:ml-15">
              {user && (
                <button
                  className={`flex items-center w-265 ${
                    therecipe.date < 1 ? "bg-gray-400 bg-orange-400" : null
                  } border-silver text-14 p-12 px-20 mt-0 md:mt-0 align-bottom uppercase tracking-widest`}
                  onClick={handleIsOpen}
                >
                  <img
                    className="w-25 h-25 mr-10"
                    src="/img/feather/list.svg"
                    alt=""
                  />
                  weekmenu
                  <div className="flex">
                    {kalender.map((k) => {
                      var cart = me.items.filter((c) =>
                        // c.date ? c.date.includes(k.dayall) : null
                        c.date.find((d) => d.name === k.dayall)
                      );
                      return cart.map((c) =>
                        c._id === therecipe._id ? (
                          <NavLink
                            className="ml-10"
                            key={c._id}
                            to={`/weekmenu`}
                          >
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
            </div>
          </div>
        </div>
        {/* add panel */}
        <AddpanelWeekmenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleIsOpen={handleIsOpen}
          therecipe={therecipe}
          me={me}
          setMe={setMe}
          routeRedirect={routeRedirect}
          setRedirect={setRedirect}
        />
        <div className="recepten">
          <div className="recepten-box">
            {/* ingredienten */}
            <div className="ingredienten">
              <p>vers</p>
              <div className="ingredienten-box">
                {therecipe.fresh.map((f, xid) => {
                  const thetag = tags.find((s) => s.name === f.ingredient);
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

              <div className="mb-36">
                {thegroceries.find((g) => g._id === therecipe._id) ? (
                  <Fragment>
                    <button
                      onClick={() =>
                        handleDeleteGroceries(me, setMe, therecipe._id)
                      }
                      className="flex items-center w-265 bg-background border-silver text-14 p-12 px-20 mt-0 md:mt-0 align-bottom uppercase tracking-widest"
                    >
                      <img
                        className="w-25"
                        src="/img/feather/shopping-cart_black.svg"
                        alt="list mark"
                      />
                      <span className="pl-9">toegevoegd</span>
                    </button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <button
                      onClick={() =>
                        handleCreateGroceries(me, setMe, therecipe)
                      }
                      className="flex items-center w-265 border-silver text-14 p-12 px-20 mt-0 md:mt-0 align-bottom uppercase tracking-widest"
                    >
                      <img
                        className="w-25"
                        src="/img/feather/shopping-cart.svg"
                        alt="list mark"
                      />
                      <span className="pl-9">boodschappen</span>
                    </button>
                  </Fragment>
                )}
              </div>

              {therecipe.related.length > 0 &&
              therecipe.related[0].title !== "" ? (
                <p>gerelateerd</p>
              ) : null}
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
        <div className="recepten-source mb-36">
          {/* <Link to="/mijnrecepten">
            <div className="flex mt-72 pb-20">
              <img className="w-25" src="/img/feather/book.svg" alt="" />
              &nbsp;<span className="pl-5">Mijn recepten</span>
            </div>
          </Link> */}
          <a
            href={`mailto:?SUBJECT=${theemail.subject}&BODY=${
              myRecipe +
              theemail.body +
              myTitle +
              theemail.fresh +
              myFresh +
              theemail.stock +
              myStock +
              theemail.directions +
              myDirections +
              theemail.info +
              myInfo
              // + theemail.adres
              // + theemail.afzender
              // + theemail.email
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Stuur je recept naar een vriend:
            <span className="table md:inline mt-18 md:mt-0 ml-0 md:ml-18 py-18 px-36 bg-indigo-500 text-white uppercase text-16 tracking-widest">
              Stuur email
            </span>
          </a>
        </div>
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
    </Fragment>
  );
};

export default MijnRecept;
