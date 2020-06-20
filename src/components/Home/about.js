import React, { Fragment } from "react";
import abouts from "../../data/abouts";

const about = ({ user }) => {
  // console.log(abouts);
  return (
    <Fragment>
      <div className="mb-48">
        <h1 className="-mt-20 mb-24">hetkookt!</h1>
        <div className=" unvisable slide work-grid-item">
          {abouts.map((a) => {
            return (
              <div key={a.index} className="about-box mt-0">
                {!user && (
                  <Fragment>
                    <h2 className="text-24 font-500">{a.title}</h2>
                    <button className="button-blue mt-18 mb-24">
                      inschrijven
                    </button>
                  </Fragment>
                )}
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
      </div>
    </Fragment>
  );
};

export default about;
