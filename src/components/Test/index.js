import React, { Fragment } from "react";
import { uniq } from "../common/common";

const Test = ({ user, recipes, tags, ...props }) => {
  const thefresh = recipes.map((c) => c.fresh.map((d) => d.ingredient));
  console.log("thefresh");
  console.log(thefresh);

  var uniqFresh = [].concat
    .apply([], thefresh)
    .filter(uniq)
    .filter((x) => x !== undefined)
    .sort();

  console.log("uniqFresh");
  console.log(uniqFresh);

  // NIEUW met alle tags
  var selectedtags2 = recipes.map((s) => s.tags).filter((e) => e !== undefined);

  var totaltags = [];
  selectedtags2.map((s) => {
    const x = s.map((m) => {
      totaltags.push(m.name);
    });
  });
  totaltags = totaltags.filter(uniq);

  const collection = totaltags.map((s) => {
    const selection = recipes.filter((r) => r.tags.find((t) => t.name === s));
    return { title: s, selection: selection };
  });

  if (user === null)
    return (
      <div className="container-x">
        <p>Loading...</p>
      </div>
    );

  return (
    <Fragment>
      <div className="container-x mt-18">
        <h1>Test</h1>
        <div className="">
          {/* {uniqFresh.map((u, xid) => (
            <Fragment key={xid}>
              <div className="">{u}</div>
            </Fragment>
          ))} */}
          {tags.map((t, xid) => (
            <Fragment key={xid}>
              <div className="">{t.name}</div>
            </Fragment>
          ))}
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
