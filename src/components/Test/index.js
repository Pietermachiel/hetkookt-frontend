import React, { Fragment } from "react";
import { uniq } from "../common/common";

const Test = ({ user, recipes, ...props }) => {
  // console.log("recipes");
  // console.log(recipes);
  // console.log(props);
  // console.log(props);

  var selectedtags = recipes
    .map((s) => s.tags)
    .filter(uniq)
    .filter((e) => e !== undefined);

  const collection = selectedtags.map((s) => {
    const selection = recipes.filter((r) => r.tags[0] === s);
    return { title: s, selection: selection };
  });

  console.log(selectedtags);
  console.log(collection);

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
