import React, { Fragment } from "react";
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
import { handleDelete, deleteFresh } from "../../services/userService";

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
  // const width = useCurrentWidth();
  // const height = useCurrentHeight();
  // const scroll = useCurrentScroll();
  // const offset = 0;
  // const box = 265;
  // const boxheight = height + scroll;

  // console.log("thecart");
  // console.log(thecart);
  // const list = thecart.filter((c) => {
  //   let freshitem = c.fresh.reduce(function (accumulator, currentValue) {
  //     return accumulator.concat(currentValue);
  //   }, []);
  //   return freshitem;
  // });
  // console.log("list");
  // console.log(list);

  let allfresh = thecart.reduce(function (accumulator, currentValue) {
    return [...accumulator, ...currentValue.fresh];
  }, []);
  console.log("allfresh");
  console.log(allfresh);
  console.log(parseInt("400"));

  var data = [
    { item: "spinazie", quantity: 200, unit: "g" },
    { item: "spinazie", quantity: 400, unit: "g" },
    { item: "eieren", quantity: 2, unit: "" },
    { item: "eieren", quantity: 1, unit: "" },
    { item: "room", quantity: 100, unit: "ml" },
    { item: "room", quantity: 60, unit: "ml" },
  ];

  let result = data.reduce(
    (function (hash) {
      return function (r, a) {
        var key = a.item;
        if (!hash[key]) {
          hash[key] = { item: a.item, quantity: 0, unit: a.unit };
          r.push(hash[key]);
        }
        hash[key].quantity += a.quantity;
        return r;
      };
    })(Object.create(null)),
    []
  );

  console.log(result);

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
                                  </div>{" "}
                                  <div className="grid grid-cols-4 mb-15">
                                    {c.fresh.map((f, xid) => (
                                      <div key={xid} className="ml-18">
                                        <span
                                          onClick={() =>
                                            deleteFresh(
                                              me,
                                              setMe,
                                              c._id,
                                              f.item
                                            )
                                          }
                                          className="text-red-600 mr-10"
                                        >
                                          x
                                        </span>
                                        {f.quantity} {f.unit} {f.item}
                                      </div>
                                    ))}
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
          </Fragment>
        ) : (
          <About about={about} />
        )}
      </div>
    </Fragment>
  );
};

export default Home;
