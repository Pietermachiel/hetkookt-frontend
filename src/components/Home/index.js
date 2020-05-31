import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
// import { Link, NavLink } from "react-router-dom";
// import useCurrentWidth from "../common/use-current-width";
// import useCurrentHeight from "../common/use-current-height";
// import useCurrentScroll from "../common/use-current-scroll";
// import { slugify, kalender } from "../common/common";
import Hetkookt from "./hetkookt";
// import CategoriesFilter from "../CategoriesFilter";
// import CollectionsFilter from "../CollectionsFilter";
import Search from "../Search";
// import Dishes from "./dishes";
import About from "./about";
// import Weekmenu from "../Weekmenu";
import { vandaag, dedatum, kalender, slugify } from "../common/common";
import {
  handleDelete,
  deleteFresh,
  toggleStock,
  removeStock,
  deleteBoodschappen,
} from "../../services/userService";

const Home = ({
  me,
  setMe,
  user,
  dishes,
  recipes,
  categories,
  sorts,
  // handleSave,
  // handleDelete,
  thecart,
  about,
  ...props
}) => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("alles is op voorraad");

  // const width = useCurrentWidth();
  // const height = useCurrentHeight();
  // const scroll = useCurrentScroll();
  // const offset = 0;
  // const box = 265;
  // const boxheight = height + scroll;

  console.log("me");
  console.log(me);

  if (me.stock === undefined) return [];

  const handleExtra = (value) => {
    const trimmedText = value.trim();
    if (trimmedText.length > 0) {
      toggleStock(me, setMe, value);
    }
    setValue("");
  };

  const removeItem = (value) => {
    // console.log(title);
    // const newitems = items.filter((item, index) => {
    //   return item !== title;
    // });
    // console.log(newitems);

    removeStock(me, setMe, value);
  };

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  let allfresh = thecart.reduce(function (accumulator, currentValue) {
    return [...accumulator, ...currentValue.fresh];
  }, []);
  console.log("allfresh");
  console.log(allfresh);

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
  // if (boodschappen.quantity === 0) return "";
  // boodschappen = boodschappen.map((b) =>
  //   b.quantity === "0" ? b.quantity === "" : null
  // );

  if (recipes.length === 0)
    return (
      <div className="container-x">
        <p>Loading...</p>
      </div>
    );

  const thedates = kalender.filter((k) => {
    const item = thecart.find((c) => (c.date ? c.date.includes(k.year) : null));
    return item;
  });

  return (
    <Fragment>
      <Hetkookt user={user} />
      <div className="container-x">
        <Search recipes={recipes} />
        {user ? (
          <Fragment>
            {thedates.length === 0 ? (
              <>
                <h2 className="pt-15">Weekmenu</h2>
                <p className="font-600 mt-21">
                  Er staat nog niets op het menu.
                </p>
                <p className="w-full md:w-50">
                  Stel je eigen menu samen voor vandaag&nbsp;
                  <span className="font-600 text-gray-600">
                    {vandaag(0)} {dedatum(0)} april
                  </span>
                  &nbsp; en de zeven daaropvolgende dagen. <br />
                  <br />
                  Zoek een recept en zet op het weekmenu.
                </p>
              </>
            ) : null}
            <div className="mb-10 mt-18">
              {kalender.map((k) => {
                var cart = thecart.filter((c) =>
                  c.date ? c.date.includes(k.year) : null
                );
                // console.log("cart");
                // console.log(cart);
                return (
                  <Fragment key={k.index}>
                    {cart.length !== 0 ? (
                      <Fragment>
                        <div className="flex items-center text-orange border-b-4 border-gray-400 pt-15 first:pt-0 pb-15">
                          {/* {k.day} {k.day !== "vandaag" ? k.index : null} */}
                          <h2 className="mr-5">
                            {k.day === vandaag(0) ? "vandaag" : k.day}
                          </h2>
                          <div className="relative pt-3">
                            <img
                              className="w-30 h-30"
                              src="/img/feather/circle-orange.svg"
                              alt="circle orange"
                            />
                            <div className={`absolute inset-0 text-12`}>
                              <span className="flex justify-center pt-9">
                                {k.index}
                              </span>
                            </div>
                            {/* {k.index} */}
                          </div>
                        </div>
                        <p></p>
                      </Fragment>
                    ) : null}
                    <div className="-ml-10 sm:ml-0 md:-ml-15 mb-10 flex flex-row flex-wrap">
                      {cart
                        ? cart.map((c) => (
                            <Fragment key={c._id}>
                              <div className="unvisable slide work-grid-item w-full">
                                <div className={`px-15 pt-15`}>
                                  <div className="flex item-center">
                                    <button
                                      className="btn-delete"
                                      onClick={() =>
                                        handleDelete(me, setMe, c._id, k.year)
                                      }
                                    >
                                      <img
                                        className="w-25 h-25"
                                        src="/img/icons/btn-remove-red.svg"
                                        alt=""
                                      />
                                    </button>
                                    <Link to={`/recipe/${slugify(c.title)}`}>
                                      <h4 className={`break-words mb-15`}>
                                        {c.title}
                                      </h4>
                                    </Link>
                                  </div>
                                  <div className="grid grid-cols-4 mb-15">
                                    {c.fresh.map((f, xid) => {
                                      return (
                                        <Fragment key={xid}>
                                          {f.to_buy === true ? (
                                            <div className="ml-18">
                                              <span
                                                onClick={() =>
                                                  deleteFresh(
                                                    me,
                                                    setMe,
                                                    c._id,
                                                    f.item,
                                                    f.do_buy
                                                  )
                                                }
                                                className="text-red-600 mr-10"
                                              >
                                                x
                                              </span>
                                              {f.quantity} {f.unit}
                                              <strong> {f.item}</strong>
                                            </div>
                                          ) : (
                                            <div className="ml-18 text-gray-500">
                                              <span
                                                onClick={() =>
                                                  deleteFresh(
                                                    me,
                                                    setMe,
                                                    c._id,
                                                    f.item,
                                                    f.do_buy
                                                  )
                                                }
                                                className="mr-10"
                                              >
                                                x
                                              </span>
                                              {f.quantity} {f.unit}
                                              <strong> {f.item}</strong>
                                            </div>
                                          )}
                                        </Fragment>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          ))
                        : null}
                    </div>{" "}
                  </Fragment>
                );
              })}
            </div>
            <div className="boodschappen">
              <h2 className="mt-18">Boodschappen</h2>
              <div className="grid grid-cols-2 mt-36 mb-18">
                <div className="">
                  <p className="font-300 uppercase text-14 tracking-wider mb-24">
                    Vers
                  </p>
                  {boodschappen.map((b, xid) => (
                    <li key={xid} className="mb-9">
                      <span
                        onClick={() => deleteBoodschappen(me, setMe, b.item)}
                        className="text-red-600 mr-10"
                      >
                        x
                      </span>
                      {b.quantity} {b.unit} <strong>{b.item}</strong>
                    </li>
                  ))}
                </div>
                <div className="">
                  <p className="font-300 uppercase text-14 tracking-wider mb-24">
                    Voorraad
                  </p>
                  <Link to="/voorraad">
                    <div className="filter-box__stock">
                      {me.stock.length === 0 && <p>Is alles op voorraad?</p>}
                    </div>{" "}
                  </Link>

                  {me.stock.map((v, xid) => (
                    <li key={xid} className="mb-9">
                      <span
                        onClick={() => removeStock(me, setMe, v)}
                        className="text-red-500 mr-9"
                      >
                        x
                      </span>
                      {v}
                    </li>
                  ))}
                  <p className="font-300 uppercase text-14 tracking-wider mb-24 mt-24">
                    Extra
                  </p>
                  <form
                    // ref={(input) => (addForm = input)}
                    className="form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleExtra(value);
                    }}
                  >
                    <button
                      className="btn btn-small  btn-small__green"
                      type="submit"
                    />
                    &nbsp;
                    <input
                      value={value}
                      type="text"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Zet dit ook nog op de lijst..."
                    />
                  </form>
                  {items.map((item, index) => {
                    return (
                      <div key={index} className="">
                        {item}&nbsp;&nbsp;
                        <span
                          className="rood"
                          onClick={() => removeItem(index)}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}
                  {/* <div className="filter-box__stock">
                    {items.length === 0 && <p>alles is op voorraad</p>}
                  </div> */}
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <About about={about} />
        )}
      </div>
    </Fragment>
  );
};

export default Home;
