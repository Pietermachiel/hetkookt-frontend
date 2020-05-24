import React, { Fragment } from "react";
import abouts from "../../data/abouts";

const about = () => {
  console.log(abouts);
  return (
    <Fragment>
      <div className="mb-48">
        {abouts.map((a) => {
          return (
            <div key={a.index} className="about-box mt-48">
              <h2 className="text-36 mb-24 font-500">{a.title}</h2>
              <div className="text-19 leading-loose">
                {a.lines.map((line, xid) => (
                  <li key={xid}>{line} </li>
                ))}
              </div>
            </div>
          );
        })}
        <div className="clear-both"></div>
      </div>
    </Fragment>
  );
};

export default about;
