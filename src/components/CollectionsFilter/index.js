import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const CollectionsFilter = ({ dishes }) => {
  return (
    <Fragment>
      <div className="collections-filter">
        {dishes.map((d, xid) => {
          // console.log("p");
          // console.log(p);
          return (
            <div className={`first-letter text-indigo-600 `} key={xid}>
              <Link aria-label={`collections/${d}`} to={`/collections/${d}`}>
                <p>{d}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default CollectionsFilter;
