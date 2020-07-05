import React, { Fragment } from "react";
import auth from "../../services/authService";
import { deleteUser } from "../../services/userService";
import { vandaag, kalender } from "../common/common";

const User = ({ me, therecipes, user, thecart, ...props }) => {
  function handleLogout() {
    auth.logout();
    window.location = "/";
  }

  function handleDelete(userId) {
    deleteUser(userId);
    auth.logout();
    window.location = "/";
  }

  if (therecipes === undefined) return [];

  console.log("therecipes");
  console.log(therecipes);

  const thedates = therecipes.map((dd) => {
    const dedates = dd.date.map((d) => {
      const x = [];
      var totaldates = x.concat(d);
      return totaldates[0];
    });
    return dedates;
  });

  const newdates = thedates.reduce((acc, date) => acc + date, []);

  console.log("props");
  console.log(props);
  console.log("user");
  console.log(user);
  console.log("props");
  console.log(props);
  console.log("thedates");
  console.log(thedates);
  console.log("newdates");
  console.log(newdates);

  return (
    <div className="container-x">
      <h1 className="-mt-20 mb-36">{me.name}</h1>
      <div className=" unvisable slide work-grid-item">
        <p>Name: {me.name}</p>
        <p>Email: {me.email}</p>
        <button
          className="button-blue bg-indigo-500 hover:bg-indigo-700"
          onClick={() => handleLogout()}
        >
          Logout
        </button>

        <button
          className="button-blue bg-red hover:bg-red-700"
          onClick={() => handleDelete(user._id)}
        >
          Delete account
        </button>
      </div>
    </div>
  );
};

export default User;
