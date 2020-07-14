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
    // alert("Weet je het zeker?");
    if (window.confirm("Weet je het zeker?")) deleteUser(userId);
    auth.logout();
    window.location = "/";
  }

  const thedates = thecart.map((dd) => {
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
      <h1 className="favorieten-title">{me.name}</h1>
      <div className="unvisable slide work-grid-item -mt-18">
        {/* <p>Name: {me.name}</p> */}
        <p>Username: {me.email}</p>
        <button
          className="w-150 uppercase text-16 bg-indigo-500 mt-36 px-36 py-10 text-white tracking-widest"
          onClick={() => handleLogout()}
        >
          Logout
        </button>

        <button
          className="w-150 ml-18 uppercase text-16 mt-36 px-36 py-10 text-white tracking-widest bg-red hover:bg-red-700"
          onClick={() => handleDelete(user._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default User;
