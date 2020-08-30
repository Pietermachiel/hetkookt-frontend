import React, { Fragment } from "react";
import { uniq } from "../common/common";

const Test = ({ user, recipes, ...props }) => {
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
