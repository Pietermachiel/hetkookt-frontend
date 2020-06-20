import React, { Fragment } from "react";
import About from "./about";

const Home = ({ me, setMe, user, recipes, about, ...props }) => {
  // console.log("me");
  // console.log(me);
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
        <About user={user} about={about} />
      </div>
    </Fragment>
  );
};

export default Home;
