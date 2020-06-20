import React, { Fragment } from "react";

const Test = ({ dishes, recipes, ...props }) => {
  // console.log("recipes");
  // console.log(recipes);
  // console.log(props);
  console.log(props);

  return (
    <Fragment>
      <div className="container-x mt-100">
        <h1>{props.match.params.id}</h1>
      </div>
    </Fragment>
  );
};

export default Test;
