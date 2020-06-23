import React, { Fragment } from "react";
import { toggleStock, removeStock } from "../../services/userService";
import AccordionVoorraad from "./AccordionVoorraad";
import { kalender } from "../common/common";

const Voorraad = ({ me, setMe, recipes, stock, ...props }) => {
  if (me.stock === undefined) return (me.stock = []);
  console.log("me.stock");
  console.log(me.stock);

  // console.log(me);
  if (me.recipes === undefined) return [];

  const themenu = me.recipes.filter((r) => {
    const item = kalender.find((k) =>
      r.date ? r.date.includes(k.year) : null
    );
    return item;
  });

  console.log("themenu");
  console.log(themenu);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  let allstock = themenu.reduce(function (accumulator, currentValue) {
    return [...accumulator, ...currentValue.stock];
  }, []);
  console.log("allstock1");
  console.log(allstock);

  allstock = allstock.filter((f) => f.to_buy === true);
  // console.log(allstock2);
  console.log(allstock);

  // https://stackoverflow.com/questions/44332180/merge-objects-with-the-same-id-but-sum-values-of-the-objects
  // For a version with Array#reduce, you could use a hash table as reference to the same company with a closure over the hash table.
  let voorraad = allstock.reduce(
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
  console.log("voorraad1");
  console.log(voorraad);

  const removeItem = (value) => {
    removeStock(me, setMe, value);
  };

  return (
    <Fragment>
      <div className="container-x">
        <h1 className="mb-36 -mt-20">Voorraad</h1>
        <div className=" grid-box unvisable slide work-grid-item ">
          <Fragment>
            {voorraad.map((v) => (
              <Fragment>
                {stock.map((s, xid) => {
                  console.log("stock");
                  console.log(s);
                  if (s.item.includes(v.item))
                    return (
                      <Fragment key={xid}>
                        <AccordionVoorraad s={s} title={s.title} me={me}>
                          <ul className="mb-18 ">
                            {s.item.map((i, xid) => {
                              if (i === v.item)
                                return (
                                  <Fragment key={xid}>
                                    {me.stock.includes(i) ? (
                                      <li className="mb-0 py-9 px-24 font-500 bg-orange-400">
                                        {i}{" "}
                                        <span
                                          className="text-red-600 font-500"
                                          onClick={() => removeItem(i)}
                                        >
                                          x
                                        </span>
                                      </li>
                                    ) : (
                                      <li
                                        onClick={() =>
                                          toggleStock(me, setMe, i)
                                        }
                                        className="mb-0 py-9 px-24 bg-green-200"
                                      >
                                        {i} <span className="">+</span>
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
            ))}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
  //   }
};

export default Voorraad;
