import React, { Fragment } from "react";
// import dishes from "../../data/dishes.json";

const Test = ({ dishes, recipes, ...props }) => {
  // console.log("recipes");
  // console.log(recipes);
  // console.log(props);
  console.log(dishes);

  return (
    <Fragment>
      <div className="container">
        <h1>Test</h1>
      </div>
    </Fragment>
  );
};

export default Test;
