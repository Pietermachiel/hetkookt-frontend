import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Hetkookt from "./hetkookt";
// import Search from "../Search";
import About from "./about";
import Menu from "./Menu";
import Boodschappen from "./Boodschappen";

const Home = ({ me, setMe, user, recipes, about, ...props }) => {
  console.log("me");
  console.log(me);
  console.log("user");
  console.log(user);
  console.log("recipes");
  console.log(recipes);

  if (recipes.length === 0)
    return (
      <div className="container-x">
        <p>Loading...</p>
      </div>
    );

  return (
    <Fragment>
      <div className="container-x">
        <About about={about} />
      </div>
    </Fragment>
  );
};

export default Home;
