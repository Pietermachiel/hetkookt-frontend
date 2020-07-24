import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  removeStock,
  toggleExtra,
  removeExtra,
  deleteBoodschappen,
} from "../../services/userService";
import { recipeUrl } from "../../config.json";
import { kalender } from "../common/common";

const Boodschappen = ({ me, setMe }) => {
  const [value, setValue] = useState("");
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${recipeUrl}/groceries.json`);
      res.json().then((res) => setGroceries(res));
    }
    getData();
  }, []);

  // console.log(groceries);
  // console.log(me);
  if (me.items === undefined) return [];

  const themenu = me.items.filter((r) => {
    const item = kalender.find((k) =>
      // r.date ? r.date.includes(k.dayall) : null
      r.date.find((d) => d.name === k.dayall)
    );
    return item;
  });

  // console.log("themenu");
  // console.log(themenu);

  const handleExtra = (value) => {
    const trimmedText = value.trim();
    if (trimmedText.length > 0) {
      toggleExtra(me, setMe, value);
    }
    setValue("");
  };

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  let allfresh = themenu.reduce(function (accumulator, currentValue) {
    return [...accumulator, ...currentValue.fresh];
  }, []);
  // console.log("allfresh");
  // console.log(allfresh);

  allfresh = allfresh.filter((f) => f.to_buy === true);
  // console.log(allfresh);

  // https://stackoverflow.com/questions/44332180/merge-objects-with-the-same-id-but-sum-values-of-the-objects
  // For a version with Array#reduce, you could use a hash table as reference to the same company with a closure over the hash table.
  let boodschappen = allfresh.reduce(
    (function (hash) {
      return function (r, a) {
        var key = a.ingredient;
        if (!hash[key]) {
          hash[key] = {
            ingredient: a.ingredient,
            quantity: 0,
            unit: a.unit,
            to_buy: a.to_buy,
          };
          r.push(hash[key]);
        }
        hash[key].quantity += a.quantity;
        return r;
      };
    })(Object.create(null)),
    []
  );
  console.log(boodschappen);

  const theemail = {
    subject: "bestelling",
    body:
      "Hallo Studio Roozen, %0D%0A%0D%0AIk wil graag de volgende bestelling doen:%0D%0A  ",
    adres: "%0D%0A%0D%0AMijn adres is: ",
    afzender: "%0D%0A%0D%0AMijn afzender is: ",
    email: me.email,
  };

  const myBoodschappen = boodschappen.map(
    (b) => "%0D%0A" + " " + b.quantity + " " + b.unit + " " + b.ingredient
  );

  console.log("myBoodschappen");
  console.log(myBoodschappen.length);

  return (
    <Fragment>
      <div className="container-y bg-rose-100 boodschappen">
        <h1 className="favorieten-title">
          Boodschappen{" "}
          {myBoodschappen.length !== 0 && (
            <span>
              <Link
                className="block lg:inline mt-10 lg:mt-0 lg:ml-10 text-18 text-indigo-600 hover:text-red-500"
                to="/voorraad"
              >
                Is alles op voorraad? >
              </Link>
            </span>
          )}
        </h1>
        {myBoodschappen.length === 0 ? (
          <Fragment>
            <p className="font-600 mt-21">
              Er zijn geen boodschappen want er staat nog niets op het menu.
            </p>
            <p>
              Selecteer een recept in{" "}
              <Link
                className="font-700 text-indigo-600 hover:text-red-500"
                to="/kookschrift"
              >
                favorieten
              </Link>{" "}
              en zet op het weekmenu.
            </p>
            <h2 className="mb-24 mt-48">Extra</h2>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleExtra(value);
              }}
            >
              <input
                className="py-5 px-10 text-16"
                value={value}
                type="text"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Zet dit extra op de lijst..."
              />
              &nbsp;
              <button
                className="btn btn-small  btn-small__green"
                type="submit"
              />
            </form>
            <div className="category-box">
              <ul className="mb-18">
                {me.extra.map((ex, index) => {
                  return (
                    <li
                      key={index}
                      className="accordion-title py-9 lg:px-24 bg-orange-400"
                    >
                      {ex}&nbsp;
                      <span
                        className="text-red-500 mr-9"
                        onClick={() => removeExtra(me, setMe, ex)}
                      >
                        x
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <a
              href={`mailto:studio@roozen.nl?SUBJECT=${theemail.subject}&BODY=${
                theemail.body +
                myBoodschappen +
                theemail.adres +
                theemail.afzender +
                theemail.email
              }`}
            >
              bestel boodschappen per email bij Studio Roozen
              <span className="table md:inline mt-18 md:mt-0 ml-0 md:ml-18 py-18 px-36 bg-indigo-500 text-white uppercase text-16 tracking-widest">
                bestel
              </span>
            </a>

            <div className=" mt-36 mb-18 unvisable slide work-grid-item">
              <div className="ingredienten w-full">
                <h2 className="mb-24">Vers</h2>
                {!groceries && (
                  <div className="hollow-dots-spinner">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                  </div>
                )}
                <div className="category-box">
                  {groceries.map((g, xid) => {
                    const deboodschappen = boodschappen.filter((b) =>
                      g.sort.includes(b.ingredient)
                    );
                    // console.log("deboodschappen");
                    // console.log(deboodschappen);
                    if (deboodschappen.length !== 0)
                      return (
                        <Fragment key={xid}>
                          <h2 className="">
                            {deboodschappen.length !== 0 ? g.title : null}
                          </h2>
                          <ul className="mb-18">
                            {deboodschappen.map((b, xid) =>
                              // console.log(g.sort);
                              // if (g.sort.includes(b.ingredient))
                              deboodschappen.length !== 0 ? (
                                <li
                                  key={xid}
                                  className={`accordion-title py-9 lg:px-24 bg-${g.title}`}
                                >
                                  <div className="flex">
                                    <div className="items-quantity">
                                      {b.quantity} {b.unit}
                                    </div>
                                    <div className="items-product font-700">
                                      {b.ingredient}
                                    </div>
                                  </div>

                                  <span
                                    onClick={() =>
                                      deleteBoodschappen(
                                        me,
                                        setMe,
                                        b.ingredient
                                      )
                                    }
                                    className="text-red-600 mr-10 font-500"
                                  >
                                    {" "}
                                    <span className="font-300 text-14 lg:text-16">
                                      verwijder ingredient
                                    </span>
                                    &nbsp;
                                    <img
                                      className="w-20 h-20 inline"
                                      src="/img/feather/x-red.svg"
                                      alt=""
                                    />
                                  </span>
                                </li>
                              ) : null
                            )}
                          </ul>
                        </Fragment>
                      );
                  })}
                </div>
              </div>
              <div className="">
                <h2 className="mb-24">Voorraad</h2>
                <Link
                  className="text-18 font-500 text-indigo-600 hover:text-red-500"
                  to="/voorraad"
                >
                  Is alles op voorraad? >
                </Link>
                <div className="category-box">
                  <ul className="my-18">
                    {me.stock.map((v, xid) => (
                      <li
                        key={xid}
                        className="accordion-title text-16 py-9 lg:px-24 bg-orange-400"
                      >
                        {v}
                        <span
                          onClick={() => removeStock(me, setMe, v)}
                          className="text-red-500 mr-9"
                        >
                          x
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <h2 className="mb-24">Extra</h2>
                <form
                  className="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleExtra(value);
                  }}
                >
                  <input
                    className="py-5 px-10 text-16 mb-18"
                    value={value}
                    type="text"
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Zet dit extra op de lijst..."
                  />
                  &nbsp;
                  <button
                    // className="mb-36 uppercase text-16 bg-indigo-500 mt-36 px-36 py-10 text-white tracking-widest"
                    // className="btn btn-small  btn-small__green"
                    type="submit"
                  >
                    <img src="/img/feather/plus.svg" alt="" />
                  </button>
                </form>
                <div className="category-box">
                  <ul className="mb-18">
                    {me.extra.map((ex, index) => {
                      return (
                        <li
                          key={index}
                          className="accordion-title py-9 lg:px-24 bg-orange-400"
                        >
                          {ex}&nbsp;
                          <span
                            className="text-red-500 mr-9"
                            onClick={() => removeExtra(me, setMe, ex)}
                          >
                            x
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Boodschappen;
