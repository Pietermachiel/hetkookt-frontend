import React from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";
import { deleteUser } from "../../services/userService";
import { kalender } from "../common/common.js";

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

  const favorites = thecart.filter((c) => c.favorite === true);
  const thedates = kalender.filter((k) => {
    const item = thecart.find((c) => (c.date ? c.date.includes(k.year) : null));
    return item;
  });
  console.log("props");
  console.log(props);
  console.log("user");
  console.log(user);

  return (
    <div className="container-x">
      <h1 className="py-15">{me.name}</h1>
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

      {/* <div className="mt-18">
        {user && (
          <>
            <Link
              className={
                "favorites" === props.location.pathname
                  ? `nav-link flex active`
                  : `nav-link flex`
              }
              to={"/favorites"}
            >
              <p className="pr-5">
                kookschrift{" "}
                <span className="text-red-500">{favorites.length}</span>
              </p>
            </Link>

            <div className="">
              {thecart.map((m) => {
                if (m.favorite === true)
                  return (
                    <div className="" key={m._id}>
                      <h3 className={`break-words mb-15`}>{m.title}</h3>
                    </div>
                  );
              })}
            </div>

            <Link
              className={`nav-link
            ${props.location.pathname === "favorites" ? `active` : ``}
            `}
              to={"/weekmenu"}
            >
              <div className="items-center">
                weekmenu <span className="text-red-500">{thedates.length}</span>
              </div>
            </Link>
          </>
        )}
      </div> */}
    </div>
  );
};

export default User;
