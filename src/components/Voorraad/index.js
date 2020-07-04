import React, { Fragment } from "react";
import { toggleStock, removeStock } from "../../services/userService";
import AccordionVoorraad from "./AccordionVoorraad";
import { kalender } from "../common/common";

const Voorraad = ({ me, setMe, recipes, stock, ...props }) => {
  if (me.stock === undefined) return (me.stock = []);
  // console.log("me.stock");
  // console.log(me.stock);

  // console.log(me);
  if (me.items === undefined) return [];

  const themenu = me.items.filter((r) => {
    const item = kalender.find((k) =>
      r.date ? r.date.includes(k.year) : null
    );
    return item;
  });

  console.log("themenu");
  console.log(stock);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  let allstock = themenu.reduce(function (accumulator, currentValue) {
    return [...accumulator, ...currentValue.stock];
  }, []);
  console.log("allstock1");
  console.log(allstock);

  allstock = allstock.filter((f) => f.to_buy === true);
  console.log("allstock2");
  console.log(allstock);

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

  console.log("voorraad");
  console.log(voorraad);

  const removeItem = (value) => {
    removeStock(me, setMe, value);
  };

  const devoorraad = stock.filter((r) => {
    const item = voorraad.find((k) =>
      r.stockitems ? r.stockitems.includes(k.ingredient) : null
    );
    return item;
  });

  console.log("devoorraad");
  console.log(devoorraad);

  return (
    <Fragment>
      <div className="container-x">
        <h1 className="mb-36 -mt-20">Voorraad</h1>
        <div className=" grid-box unvisable slide work-grid-item ">
          <Fragment>
            {devoorraad.map((dv, xid) => {
              //   console.log("dv");
              //   console.log(dv.title);
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
                                <li className="mb-0 py-9 px-24 font-500 bg-orange-400">
                                  {v.ingredient}
                                  <span
                                    className="text-red-600 font-500"
                                    onClick={() => removeItem(v.ingredient)}
                                  >
                                    x
                                  </span>
                                </li>
                              ) : (
                                <li
                                  onClick={() =>
                                    toggleStock(me, setMe, v.ingredient)
                                  }
                                  className="mb-0 py-9 px-24 bg-orange-200"
                                >
                                  {v.ingredient} <span className="">+</span>
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
  //   }
};

export default Voorraad;

// {voorraad.map((v, xid) => {
//   if (dv.stockitems.includes(v.item))
//     return (
//       <Fragment key={xid}>
//         <div className="mb-10">{v.item}</div>
//       </Fragment>
//     );
// })}
