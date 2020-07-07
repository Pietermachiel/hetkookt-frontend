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

        {abouts.map((a, xid) => {
          return (
            <Fragment key={xid}>
              <div key={a.index} className="about-box mt-0">
                <div className="text-19 leading-loose">
                  {a.lines.map((line, xid) => (
                    <li key={xid}>{line} </li>
                  ))}
                </div>
              </div>
            </Fragment>
          );
        })}

        {/* <p>Je kunt nu inloggen</p>

        <button className="button-blue mt-18 mb-24">
          <NavLink to="/login">inloggen</NavLink>
        </button> */}
      </div>
    </Fragment>
  );
};
export default Welkom;
