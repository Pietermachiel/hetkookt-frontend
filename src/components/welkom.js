import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Welkom = ({ user, ...props }) => {
  // console.log("recipes");
  // console.log(recipes);
  // console.log(props);
  console.log(props);

  if (user === null)
    return (
      <div className="container-x">
        <p>Loading...</p>
      </div>
    );

  return (
    <Fragment>
      <div className="container-x -mt-20">
        <h1>Welkom bij hetkookt!</h1>

        <p>Je kunt nu inloggen</p>

        <button className="button-blue mt-18 mb-24">
          <NavLink to="/login">inloggen</NavLink>
        </button>
      </div>
    </Fragment>
  );
};
export default Welkom;
