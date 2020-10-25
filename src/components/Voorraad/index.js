import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { toggleStock, removeStock } from "../../services/userService";
import AccordionVoorraad from "./AccordionVoorraad";
import { kalender } from "../common/common";
import stock from "../../data/stock.json";

const Voorraad = ({ me, setMe, recipes, ...props }) => {
  if (me.stock === undefined) return (me.stock = []);

  if (me.items === undefined) return [];

  const themenu = me.items.filter((r) => {
    const item = kalender.find((k) => r.date.find((d) => d.name === k.dayall));
    return item;
  });

  // console.log("themenu");
  // console.log(stock);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  let allstock = themenu.reduce(function (accumulator, currentValue) {
    return [...accumulator, ...currentValue.stock];
  }, []);
  // console.log("allstock1");
  // console.log(allstock);

  allstock = allstock.filter((f) => f.to_buy === true);
  // console.log("allstock2");
  // console.log(allstock);

  // https://stackoverflow.com/questions/44332180/merge-objects-with-the-same-id-but-sum-values-of-the-objects
  // For a version with Array#reduce, you could use a hash table as reference to the same company with a closure over the hash table.
  let voorraad = allstock.reduce(
    (function (hash) {
      return function (r, a) {
        var key = a.ingredient;
        if (!hash[key]) {
          hash[key] = {
            _id: a._id,
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

  const removeItem = (value) => {
    removeStock(me, setMe, value);
  };

  const devoorraad = stock.filter((r) => {
    const item = voorraad.find((k) =>
      r.stockitems ? r.stockitems.includes(k.ingredient) : null
    );
    return item;
  });

  return (
    <Fragment>
      <div className="container-y">
        <h1 className="mt-70 lg:mt-48">
          Voorraad{" "}
          <span>
            <Link
              className="block lg:inline mt-10 lg:mt-0 lg:ml-10 text-18 text-indigo-600 hover:text-red-500"
              to="/boodschappen"
            >
              Boodschappen >
            </Link>
          </span>
        </h1>
        <div className="mb-18">
          Dit zijn de ingrediënten die op voorraad moeten zijn voor het
          weekmenu:
        </div>
        <div className=" grid-box unvisable slide work-grid-item pb-10">
          <Fragment>
            {devoorraad.map((dv, xid) => {
              // console.log("dv");
              // console.log(dv.title);
              if (dv === undefined) return [];
              return (
                <Fragment key={xid}>
                  {/* <h2>{dv.title}</h2> */}

                  <AccordionVoorraad title={dv.title}>
                    <ul className="mb-18 " key={xid}>
                      {voorraad.map((v, xid) => {
                        if (dv.stockitems.includes(v.ingredient))
                          return (
                            <Fragment key={xid}>
                              {me.stock.includes(v.ingredient) ? (
                                <li className="mb-0 py-9 px-24 font-500 bg-orange-400 flex justify-between">
                                  {v.ingredient}{" "}
                                  <span
                                    className="text-red-600 font-500"
                                    onClick={() => removeItem(v.ingredient)}
                                  >
                                    verwijder x
                                  </span>
                                </li>
                              ) : (
                                <li
                                  onClick={() =>
                                    toggleStock(me, setMe, v.ingredient)
                                  }
                                  className="mb-0 py-9 px-24 bg-orange-200 flex justify-between"
                                >
                                  {v.ingredient}{" "}
                                  <span className="text-green-500">
                                    voeg toe +
                                  </span>
                                </li>
                              )}
                            </Fragment>
                          );
                      })}
                    </ul>
                  </AccordionVoorraad>
                </Fragment>
              );
            })}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default Voorraad;
