import React, { Fragment } from "react";

const Test = ({ user, ...props }) => {
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
        <h1>Test</h1>
      </div>
    </Fragment>
  );
};

export default Test;
