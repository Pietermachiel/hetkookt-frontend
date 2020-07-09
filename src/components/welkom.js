import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import abouts from "../data/abouts";

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
        <h1 className="mb-24">Welkom bij hetkookt!</h1>

        <div className=" unvisable slide work-grid-item">
          <p>
            Een verzameling <strong>basisrecepten</strong> uit alle windstreken.
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

          {/* {abouts.map((a, xid) => {
                return (
                  <Fragment key={xid}>
                    {!user && <Fragment></Fragment>}
                    <div key={a.index} className="about-box mt-0">
                      <div className="text-19 leading-loose">
                        {a.lines.map((line, xid) => (
                          <li key={xid}>{line} </li>
                        ))}
                      </div>
                    </div>{" "}
                  </Fragment>
                );
              })} */}
          <div className="clear-both"></div>
        </div>

        {/* <p>Je kunt nu inloggen</p>

        <button className="button-blue mt-18 mb-24">
          <NavLink to="/login">inloggen</NavLink>
        </button> */}
      </div>
    </Fragment>
  );
};
export default Welkom;
