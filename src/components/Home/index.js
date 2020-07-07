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
              <button className="bg-indigo-500 text-16 p-16 px-30 ml-18 align-bottom text-white uppercase tracking-widest">
                <NavLink to="/register">inschrijven</NavLink>
              </button>
            </h1>
            <div className=" unvisable slide work-grid-item">
              {abouts.map((a, xid) => {
                return (
                  <Fragment key={xid}>
                    {!user && (
                      <Fragment>
                        {/* <h2 className="text-24 font-500">
                          Schrijf je nu in!

                        </h2> */}
                        {/* <button className="bg-indigo-500 text-16 p-16 px-30 mb-36 align-bottom text-white uppercase tracking-widest">
                          <NavLink to="/register">inschrijven</NavLink>
                        </button>{" "} */}
                        {/* <button className="mt-18 mb-24">
                          <NavLink to="/register">inschrijven</NavLink>
                        </button> */}
                      </Fragment>
                    )}
                    <div key={a.index} className="about-box mt-0">
                      <div className="text-19 leading-loose">
                        {a.lines.map((line, xid) => (
                          <li key={xid}>{line} </li>
                        ))}
                      </div>
                    </div>{" "}
                  </Fragment>
                );
              })}
              <div className="clear-both"></div>
            </div>
          </div>
        </Fragment>{" "}
      </div>
    </Fragment>
  );
};

export default Home;
