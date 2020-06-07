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
      {/* <Hetkookt user={user} /> */}
      <div className="container-x">
        {/* <Search recipes={recipes} /> */}
        {user ? (
          <Fragment>
            {/* <h2 className="pt-15">Weekmenu</h2>
            <p className="font-600 mt-21">Er staat nog niets op het menu.</p>
            <p className="w-full md:w-50">
              Stel je eigen menu samen voor vandaag&nbsp;
              <span className="font-600 text-gray-600">
                {vandaag(0)} {dedatum(0)} april
              </span>
              &nbsp; en de zeven daaropvolgende dagen. <br />
              <br />
              Zoek een recept en zet op het weekmenu.
            </p> */}
            <Menu me={me} setMe={setMe} recipes={recipes} />
            {/* <Boodschappen me={me} setMe={setMe} /> */}
          </Fragment>
        ) : (
          <About about={about} />
        )}
      </div>
    </Fragment>
  );
};

export default Home;
