import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  removeStock,
  toggleExtra,
  removeExtra,
  deleteBoodschappen,
} from "../../services/userService";

const Boodschappen = ({ me, setMe }) => {
  const [value, setValue] = useState("");

  const handleExtra = (value) => {
    const trimmedText = value.trim();
    if (trimmedText.length > 0) {
      toggleExtra(me, setMe, value);
    }
    setValue("");
  };

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  let allfresh = me.recipes.reduce(function (accumulator, currentValue) {
    return [...accumulator, ...currentValue.fresh];
  }, []);
  //   console.log("allfresh");
  //   console.log(allfresh);

  allfresh = allfresh.filter((f) => f.to_buy === true);

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
  console.log(boodschappen);

  return (
    <Fragment>
      <div className="boodschappen">
        <h2 className="mt-18">Boodschappen</h2>
        <div className="sm:grid sm:grid-cols-2 mt-36 mb-18">
          <div className="">
            <p className="font-300 uppercase text-14 tracking-wider mb-24">
              Vers
            </p>
            {boodschappen.map((b, xid) => (
              <li key={xid} className="mb-9">
                {b.quantity} {b.unit} <strong>{b.item}</strong>{" "}
                <span
                  onClick={() => deleteBoodschappen(me, setMe, b.item)}
                  className="text-red-600 mr-10"
                >
                  x
                </span>
              </li>
            ))}
          </div>
          <div className="">
            <p className="font-300 uppercase text-14 tracking-wider mb-24">
              Voorraad
            </p>
            <Link to="/voorraad">
              <div className="filter-box__stock">
                <p>Is alles op voorraad?</p>
              </div>
            </Link>
            {me.stock.map((v, xid) => (
              <li key={xid} className="mb-9">
                {v}{" "}
                <span
                  onClick={() => removeStock(me, setMe, v)}
                  className="text-red-500 mr-9"
                >
                  x
                </span>
              </li>
            ))}
            <p className="font-300 uppercase text-14 tracking-wider mb-24 mt-48">
              Extra
            </p>
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
            {me.extra.map((item, index) => {
              return (
                <div key={index} className="">
                  {item}&nbsp;
                  <span
                    className="text-red-500 mr-9"
                    onClick={() => removeExtra(me, setMe, item)}
                  >
                    x
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Boodschappen;
