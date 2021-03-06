import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Kookschrift = ({ user, ...props }) => {
  if (user === null)
    return (
      <div className="container-x">
        <p>Loading...</p>
      </div>
    );

  return (
    <Fragment>
      <div className="container-y bg-rose-100">
        <h1 className="kookschrift-title">Kookschrift van {user.name}</h1>

        <div className=" unvisable slide work-grid-item">
          <p className="w-full">
            Zoek een recept in{" "}
            <Link
              className="font-700 text-indigo-600 hover:text-red-500"
              to="categories"
            >
              recepten
            </Link>{" "}
            of{" "}
            <Link
              className="font-700 text-indigo-600 hover:text-red-500"
              to={{ pathname: "/collections", state: "brood" }}
            >
              collecties
            </Link>{" "}
            of maak zelf een{" "}
            <Link
              className="font-700 text-indigo-600 hover:text-red-500"
              to="/nieuwitem"
            >
              nieuw recept
            </Link>{" "}
            aan.
          </p>

          <ul>
            <li className="list-inside list-disc">
              Pas de recepten naar eigen inzicht aan.
            </li>
            <li className="list-inside list-disc">
              Maak een eigen kookschrift met <strong>favorieten</strong>,{" "}
              <strong>weekplanner</strong> en <strong>boodschappenlijst</strong>
              .
            </li>
            <li className="list-inside list-disc">
              Kies uit de collectie recepten of maak zelf een{" "}
              <strong>nieuw recept</strong> aan.
            </li>
            <li className="list-inside list-disc">
              Maak de boodschappenlijst compleet en houd de{" "}
              <strong>voorraadkast</strong> op peil.
            </li>
            <li className="list-inside list-disc">
              <strong>Bestel de boodschappen met één druk op de knop.</strong>
            </li>
          </ul>

          <br />

          <p>
            Pieter{" "}
            <span role="img" aria-label="roos">
              🌹
            </span>
          </p>

          <div className="clear-both"></div>
        </div>
      </div>
    </Fragment>
  );
};
export default Kookschrift;
