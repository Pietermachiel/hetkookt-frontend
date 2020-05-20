import React from "react";
import { Link } from "react-router-dom";

const CollectionsFilter = ({ dishes, isWat }) => {
  return (
    <div className="collections-filter">
      {dishes.map((d, xid) => {
        // console.log("p");
        // console.log(p);
        return (
          <div
            className={`first-letter ${
              isWat === true ? "text-indigo-600" : null
            }`}
            key={xid}
          >
            <Link aria-label={`collections/${d}`} to={`/collections/${d}`}>
              <p>{d}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CollectionsFilter;
