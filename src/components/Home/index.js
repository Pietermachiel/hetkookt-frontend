import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
// import useCurrentWitdh from "../common/use-current-width2";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const markdown = `

**hetkookt** is een digitaal kookboek met favoriete recepten, bewerkt en geredigeerd onder redactie van hetkookt, met links naar kookboeken van bekende en minder bekende koks.

Het is tevens een kookschrift om die recepten naar eigen inzicht aan te passen en om eigen of zelf gevonden recepten op te slaan.

Met handige functies, zoals relaties tussen recepten, een weekmenu en boodschappenlijst, voorraadbeheer en vele zoekmogelijkheden.

Kook met verse, lokale ingrediënten. Koop geen gemaksproducten maar maak alle sauzen en smaakmakers zelf. Bak je eigen brood.

Maak je eigen [Kookschrift](/mijnrecepten)!



`;
const Home = ({ user, recipes, ...props }) => {
  // const width = useCurrentWitdh();

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
              <Link className="text-red-600 font-700 text-18" to="/about">
                hetkookt! &nbsp;
              </Link>
              {!user && (
                <button className="bg-indigo-600 text-14 p-14 px-30 mt-18 md:mt-0 md:ml-18 align-bottom text-white uppercase tracking-widest">
                  <NavLink to="/register">inschrijven</NavLink>
                </button>
              )}{" "}
            </p>
            <div>
              <ReactMarkdown
                plugins={[gfm]}
                className="kramdown m-auto mb-36"
                children={markdown}
              />
            </div>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
};

export default Home;
