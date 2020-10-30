import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import useCurrentWitdh from "../common/use-current-width2";

const Home = ({ user, recipes, ...props }) => {
  const width = useCurrentWitdh();

  if (recipes.length === 0)
    return (
      <div className="container-x">
        <div className="mt-72 hollow-dots-spinner m-auto">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>{" "}
        <div className="m-auto">
          <p className="mt-18 text-36 text-center">
            Wacht even op verbinding met de server
          </p>
        </div>
      </div>
    );

  return (
    <Fragment>
      <div className={`container-y `}>
        {/* ${user && "bg-rose-100"} */}
        <Fragment>
          <div className="mb-48">
            <p className="hetkookt-title flex items-center">
              <Link className="text-red-600 font-700 text-18" to="/books">
                HetKookt! &nbsp;
              </Link>
              {!user && (
                <button className="bg-indigo-600 text-14 p-14 px-30 mt-18 md:mt-0 md:ml-18 align-bottom text-white uppercase tracking-widest">
                  <NavLink to="/register">inschrijven</NavLink>
                </button>
              )}{" "}
            </p>

            {!user && (
              <div className=" unvisable slide work-grid-item">
                {/* <p>
                  Een bonte verzameling <strong>basisrecepten</strong> uit alle
                  windstreken.
                </p>
                <br />
                <p className="text-19 font-700 text-indigo-600">
                  Schrijf je in en...
                </p>
                <ul>
                  <li className="list-inside list-disc">
                    Maak een kookschrift met je eigen{" "}
                    <strong>favoriete </strong>
                    recepten.
                  </li>{" "}
                  <li className="list-inside list-disc">
                    Pas alle recepten naar eigen inzicht aan.
                  </li>
                  <li className="list-inside list-disc">
                    Maak een <strong>weekmenu</strong> en{" "}
                    <strong>boodschappenlijst</strong>.
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
                    Stuur jezelf of een leverancier een <strong>email</strong>{" "}
                    met de boodschappenlijst.
                  </li>
                </ul>

                <br />

                <p className="text-19 font-700 text-indigo-600">Voordelen</p> */}
              </div>
            )}
            <div>
              {/* <ul>
                <li className="list-inside list-disc">
                  Basisrecepten met bronvermelding.
                </li>
                <li className="list-inside list-disc">
                  Maak zelf favoriete recepten in een kookschrift of pas de
                  basisrecepten aan naar eigen inzicht en hoeveelheden.
                </li>
                <li className="list-inside list-disc">
                  Maak een weekmenu en doe efficiënt boodschappen.
                </li>
                <li className="list-inside list-disc">
                  Vers en voorraad gescheiden.
                </li>
                <li className="list-inside list-disc">
                  Werk met exacte maten.
                </li>
                <li className="list-inside list-disc">
                  Je boodschappenlijst altijd en overal bij de hand.
                </li>
                <li className="list-inside list-disc">
                  Koop niet meer dan je nodig hebt.
                </li>
              </ul>

              <br />
              <p>
                Inschrijven is <strong>safe</strong> en <strong>secure</strong>{" "}
                met <strong>two factor authorisation </strong>
                (2FA).
              </p>

              <br />
              <p>
                Pieter{" "}
                <span role="img" aria-label="rose">
                  &#127801;
                </span>
              </p> */}

              <div className="clear-both"></div>
            </div>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
};

export default Home;
