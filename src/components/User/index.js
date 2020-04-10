import React from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";

const User = ({ me, user, thecart, ...props }) => {
  function handleLogout() {
    auth.logout();
    window.location = "/";
  }

  const favorites = thecart.filter((c) => c.favorite === true);

  console.log(props);

  return (
    <div className="container-x">
      <h1 className="py-15">{me.name}</h1>
      <p>Name: {me.name}</p>
      <p>Email: {me.email}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-15 rounded"
        onClick={() => handleLogout()}
        // style={{ fontFamily: "Fira Mono" }}
      >
        Logout
      </button>

      <div className="font-light flex lg:ml-18 md:border-solid lg:border-none md:border-4">
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
              <span className="pr-5">kookschrift</span>
            </Link>
            <span className="text-red-500">{favorites.length}</span>

            <Link
              className={`nav-link
            ${props.location.pathname === "favorites" ? `active` : ``}
            `}
              to={"/weekmenu"}
            >
              <div className="items-center">weekmenu</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
