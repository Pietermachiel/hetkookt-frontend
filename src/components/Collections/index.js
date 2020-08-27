import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { uniq } from "../common/common";

const Collections = ({ me, setMe, thecart, dish, recipes, ...props }) => {
  console.log("dish");
  console.log(dish);

  return (
    <Fragment>
      <div className="container-x">
        <div className="mt-18">
          {dish.map((d, xid) => {
            return (
              <Link
                className="inline-block text-36 font-500 mr-24"
                to={`/collections/${d.name}`}
              >
                {d.name}
              </Link>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Collections;
