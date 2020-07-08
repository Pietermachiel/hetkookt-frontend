import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import abouts from "../../data/abouts";

const Home = ({ me, setMe, user, recipes, about, ...props }) => {
  console.log("me");
  console.log(me);
  // console.log("user");
  // console.log(user);
  // console.log("recipes");
  // console.log(recipes);

  if (recipes.length === 0)
    return (
      <div className="container-x">
        <p>Loading...</p>
      </div>
    );

  return (
    <Fragment>
      <div className="container-x">
        <Fragment>
          <div className="mb-48">
            <h1 className="-mt-20 mb-36">
              hetkookt!{" "}
              <button className="bg-indigo-500 text-16 p-16 px-30 mt-18 md:mt-0 md:ml-18 align-bottom text-white uppercase tracking-widest">
                <NavLink to="/register">inschrijven</NavLink>
              </button>
            </h1>
            <div className=" unvisable slide work-grid-item">
              <p>
                Een verzameling <strong>basisrecepten</strong> uit alle
                windstreken, die je naar eigen inzicht kunt aanpassen.
              </p>
              <p>
                Maak een eigen kookschrift aan met favorieten,{" "}
                <strong>weekplanner</strong> en boodschappenlijst.
              </p>
              <p>
                Kies uit de collectie recepten, wijzig het recept naar eigen
                inzicht, of maak zelf een <strong>nieuw recept</strong> aan.
              </p>
              <p>
                Maak de boodschappenlijst compleet en houd de{" "}
                <strong>voorraadkast</strong> op peil.
              </p>
              <p>
                <strong>Bestel de boodschappen met één druk op de knop.</strong>
              </p>
              <p>
                Inschrijven is <strong>safe</strong> en <strong>secure</strong>{" "}
                met <strong>two factor authorisation </strong>
                (2FA).
              </p>

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
          </div>
        </Fragment>{" "}
      </div>
    </Fragment>
  );
};

export default Home;
