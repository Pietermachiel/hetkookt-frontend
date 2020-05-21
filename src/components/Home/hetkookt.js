import React from "react";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";

const Hetkookt = ({ user }) => {
  return (
    <Fragment>
      {!user ? (
        <div className="py-24 bg-papier">
          <h1 className="text-center text-4xl font-500">
            {/* <span className="font-300">dat</span> */}
            hetkookt!
          </h1>
          <p className="text-center mb-0">
            Schrijf je in bij <span className="font-700">hetkookt</span> <br />
            en maak een kookschrift, weekplanner en notities.
          </p>
          <NavLink aria-label="register" to="/register">
            <p className="text-center text-indigo-700 font-500 mb-18">
              inschrijven >
            </p>
          </NavLink>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Hetkookt;
