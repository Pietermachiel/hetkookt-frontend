import React, { Fragment } from "react";
import auth from "../../services/authService";
import { deleteUser } from "../../services/userService";
import { vandaag, kalender } from "../common/common";

const User = ({ me, user, thecart, ...props }) => {
  function handleLogout() {
    auth.logout();
    window.location = "/";
  }

  function handleDelete(userId) {
    deleteUser(userId);
    auth.logout();
    window.location = "/";
  }

  const thedates = me.recipes.map((dd) => {
    const total = [];
    total.push(dd.title);
    return total;
  });

  // const devoorraad = stock.filter((r) => {
  //   const item = voorraad.find((k) =>
  //     r.stockitems ? r.stockitems.includes(k.item) : null
  //   );
  //   return item;
  // });

  // console.log("props");
  // console.log(props);
  // console.log("user");
  // console.log(user);
  console.log("me.recipes");
  console.log(me.recipes);
  console.log("thedates");
  console.log(thedates);

  return (
    <div className="container-x">
      <h1 className="-mt-20 mb-36">{me.name}</h1>
      <div className=" unvisable slide work-grid-item">
        <p>Name: {me.name}</p>
        <p>Email: {me.email}</p>
        <button
          className="button-blue bg-indigo-500 hover:bg-indigo-700"
          onClick={() => handleLogout()}
          // style={{ fontFamily: "Fira Mono" }}
        >
          Logout
        </button>

        <button
          className="button-blue bg-red hover:bg-red-700"
          onClick={() => handleDelete(user._id)}
          // style={{ fontFamily: "Fira Mono" }}
        >
          Delete account
        </button>

        <Fragment>
          <div className="container-x">
            <h1 className="-mt-20">Week 25</h1>
            {/* 
            {thedates.map((k) => {
              var cart = me.recipes.filter((c) =>
                c.date ? c.date.includes(k.year) : null
              );
              return (
                <Fragment key={k.index}>
                  {cart.length === 0 ? (
                    <div className="">
                      <h2 className="pt-15">Menu</h2>
                      <p className="font-600 mt-21">
                        Er staat nog niets op het menu.
                      </p>
                    </div>
                  ) : null}
                </Fragment>
              );
            })} */}

            <div className="mt-18 mb-36 unvisable slide work-grid-item ">
              <div className="category-box mb-10 mt-18">
                {/* {thedates.map((k) => {
                  var cart = me.recipes.filter((c) =>
                    c.date ? c.date.includes(k.year) : null
                  );
                  return (
                    <Fragment key={k.index}>
                      {cart.length !== 0 ? (
                        <Fragment>
                          <h2 className="">
                            {k.day === vandaag(0) ? "vandaag" : k.day}
                            <span className="pl-10 text-gray-600 text-22">
                              {k.dedag}
                            </span>
                          </h2>
                        </Fragment>
                      ) : null}
                      <ul className="mb-18">
                        {cart
                          ? cart.map((c) => (
                              <Fragment key={c._id}>
                               
                              </Fragment>
                            ))
                          : null}
                      </ul>
                    </Fragment>
                  );
                })} */}
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default User;
