import React, { Fragment } from "react";
import auth from "../../services/authService";
import { deleteUser } from "../../services/userService";
import useCurrentWitdh from "../common/use-current-width";
import { uniq } from "../common/common";

const User = ({ me, user, thecart, ...props }) => {
  console.log("thecart");
  console.log(thecart);

  const thedates = thecart.map((c) => c.date.map((d) => d.name));
  console.log("thedates");
  console.log(thedates);

  var uniqDates = [].concat
    .apply([], thedates)
    .filter(uniq)
    .filter((x) => x !== undefined)
    .reverse();

  console.log("uniqDates");
  console.log(uniqDates);

  function handleLogout() {
    auth.logout();
    window.location = "/";
  }

  async function handleDelete(userId) {
    // console.log("handledelete");
    if (window.confirm("Weet je het zeker?")) await deleteUser(userId);
    // console.log("window confirm");
    await auth.logout();
    // console.log("auth logout");
    window.location = "/";
    // console.log("window location");
  }

  // const thedates = thecart.map((dd) => {
  //   const dedates = dd.date.map((d) => {
  //     const x = [];
  //     var totaldates = x.concat(d);
  //     return totaldates[0];
  //   });
  //   return dedates;
  // });

  // const newdates = thedates.reduce((acc, date) => acc + date, []);

  // console.log("props");
  // console.log(props);
  // console.log("user");
  // console.log(user);
  // console.log("props");
  // console.log(props);
  // console.log("thedates");
  // console.log(thedates);
  // console.log("newdates");
  // console.log(newdates);

  return (
    <div className="container-x">
      <div className="flex justify-center ">
        <h1 className="kookschrift-title mb-18 ">{me.name}</h1>
      </div>

      <div className="unvisable slide work-grid-item -mt-18">
        {/* <p>Name: {me.name}</p> */}
        <p className="pt-18">Username: {me.email}</p>

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

      <h3 className="mt-36 mb-18">Menu geschiedenis</h3>
      <p className="mb-18">Wat stond er eerder op het menu?</p>
      <div className="mb-36">
        {uniqDates.map((u, xid) => (
          <Fragment key={xid}>
            <div className="">{u}</div>
            {thecart.map((t, xid) => (
              <Fragment key={xid}>
                {t.date.map(
                  (d, xid) =>
                    d.name === u && (
                      <div key={xid} className="font-700">
                        {t.title}{" "}
                        <span className="font-300"> – {t.dish.name}</span>
                      </div>
                    )
                )}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default User;
