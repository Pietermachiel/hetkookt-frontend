import React, { Fragment } from "react";
import { uniq } from "../common/common";
import RecipeItems from "../RecipeItems";

const Test = ({ user, recipes, ...props }) => {
  // console.log("recipes");
  // console.log(recipes);
  // console.log(props);
  // console.log(props);

  // OUD zonder tag = { name: }
  // var selectedtags = recipes
  //   .map((s) => s.tags)
  //   .filter(uniq)
  //   .filter((e) => e !== undefined);

  // const collection = selectedtags.map((s) => {
  //   const selection = recipes.filter((r) => r.tags[0] === s);
  //   return { title: s, selection: selection };
  // });

  // NIEUW met tag = { name: }
  var selectedtags = recipes
    .map((s) => s.tags[0])
    .filter((e) => e !== undefined);
  var thetags = selectedtags.map((t) => t.name).filter(uniq);

  // const collection = thetags.map((s) => {
  //   const selection = recipes.filter((r) => r.tags.find((t) => t.name === s));
  //   return { title: s, selection: selection };
  // });

  console.log("selectedtags");
  console.log(selectedtags);
  console.log("thetags");
  console.log(thetags);

  // NIEUW met alle tags
  var selectedtags2 = recipes.map((s) => s.tags).filter((e) => e !== undefined);

  var totaltags = [];
  selectedtags2.map((s) => {
    const x = s.map((m) => {
      totaltags.push(m.name);
    });
  });
  totaltags = totaltags.filter(uniq);
  console.log("totaltags");
  console.log(totaltags);

  console.log("selectedtags2");
  console.log(selectedtags2);

  const collection = totaltags.map((s) => {
    const selection = recipes.filter((r) => r.tags.find((t) => t.name === s));
    return { title: s, selection: selection };
  });

  console.log("collection");
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
        <div className="">
          {collection.map((c, xid) => (
            <Fragment key={xid}>
              <h2>{c.title}</h2>
              <ul>
                {c.selection.map((s, xid) => (
                  <li key={xid}>{s.title}</li>
                ))}
              </ul>
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Test;
