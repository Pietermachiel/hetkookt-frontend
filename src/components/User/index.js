import React from "react";
import auth from "../../services/authService";

const User = ({ me }) => {
  function handleLogout() {
    auth.logout();
    window.location = "/";
  }

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
    </div>
  );
};

export default User;
