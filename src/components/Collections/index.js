import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { uniq } from "../common/common";

const Collections = ({ me, setMe, thecart, dishes, recipes, ...props }) => {
  console.log("dishes");
  console.log(dishes);

  return (
    <Fragment>
      <div className="container-x">
        <div className="mt-18">
          {dishes.map((d, xid) => {
            return (
              <Link
                className="inline-block text-36 font-500 mr-24"
                to={`/collections/${d}`}
              >
                {d}
              </Link>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Collections;
