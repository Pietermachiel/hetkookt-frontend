import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import abouts from "../data/abouts";

const Welkom = ({ user, ...props }) => {
  if (user === null)
    return (
      <div className="container-x">
        <p>Loading...</p>
      </div>
    );

  return (
    <Fragment>
      <div className="container-y bg-rose-100">
        <h1 className="favorieten-title">Kookschrift van {user.name}</h1>

        <div className=" unvisable slide work-grid-item">
          {/* <p>
            Een verzameling <strong>basisrecepten</strong> uit alle windstreken.
          </p> */}
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
              to="/collections"
            >
              collecties
            </Link>{" "}
            of maak zelf een{" "}
            <Link
              className="font-700 text-indigo-600 hover:text-red-500"
              to="/nieuwrecept"
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

          <p>Pieter 🌹</p>

          <div className="clear-both"></div>
        </div>
      </div>
    </Fragment>
  );
};
export default Welkom;
