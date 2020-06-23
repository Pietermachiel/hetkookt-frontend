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
  if (me.recipes === undefined) return [];

  const themenu = me.recipes.filter((r) => {
    const item = kalender.find((k) =>
      r.date ? r.date.includes(k.year) : null
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
        var key = a.item;
        if (!hash[key]) {
          hash[key] = {
            item: a.item,
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
  // console.log(boodschappen);

  return (
    <Fragment>
      <div className="container-x boodschappen">
        {/* <h1 className="mt-0 mt-100 mb-48">Boodschappen</h1> */}
        <h1 className="mb-36 -mt-20">Boodschappen</h1>

        <div className=" mt-36 mb-18 unvisable slide work-grid-item">
          <div className="ingredienten w-full">
            <h2 className="mb-24">Vers</h2>
            <div className="category-box">
              {groceries.map((g, xid) => {
                const deboodschappen = boodschappen.filter((b) =>
                  g.sort.includes(b.item)
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
                          // if (g.sort.includes(b.item))
                          deboodschappen.length !== 0 ? (
                            <li
                              key={xid}
                              className="accordion-title py-9 px-24 bg-green-200"
                            >
                              <div className="items-quantity">
                                {b.quantity} {b.unit}
                              </div>
                              <div className="items-product">
                                {b.item}{" "}
                                <span
                                  onClick={() =>
                                    deleteBoodschappen(me, setMe, b.item)
                                  }
                                  className="text-red-600 mr-10 font-500"
                                >
                                  &nbsp;x
                                </span>
                              </div>
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
            <Link to="/voorraad">
              <div className="filter-box__stock">
                <p>Is alles op voorraad?</p>
              </div>
            </Link>
            <div className="category-box">
              <ul className="mb-18">
                {me.stock.map((v, xid) => (
                  <li
                    key={xid}
                    className="accordion-title py-9 px-24 bg-orange-400"
                  >
                    {v}{" "}
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
              />{" "}
              &nbsp;
              <button
                className="btn btn-small  btn-small__green"
                type="submit"
              />
            </form>
            <div className="category-box">
              <ul className="mb-18">
                {/* {me.extra.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="accordion-title py-9 px-24 bg-orange-400"
                    >
                      {item}&nbsp;
                      <span
                        className="text-red-500 mr-9"
                        onClick={() => removeExtra(me, setMe, item)}
                      >
                        x
                      </span>
                    </li>
                  );
                })} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Boodschappen;
