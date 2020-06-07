import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const CollectionsFilter = ({ dishes }) => {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <div
        className="accordion-wrapper relative w-50 "
        // onKeyPress={() => setShow(!show)}
        onClick={() => setShow(!show)}
      >
        <div
          className={`text-center text-indigo-600 font-300 mb-0 hover:text-indigo-600 py-9`}
        >
          collecties
        </div>
        <div
          className={`hide accordion-item accordion-item-collecties absolute z-10 ${
            show ? "show" : ""
          }`}
        >
          <div className="cols-5">
            {dishes.map((d, xid) => {
              return (
                <div
                  className={`first-letter text-indigo-600 `}
                  key={xid}
                  onClick={() => setShow(!show)}
                >
                  <Link
                    aria-label={`collections/${d}`}
                    to={`/collections/${d}`}
                  >
                    <p>{d}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CollectionsFilter;
