import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const CategoriesFilter = ({ categories }) => {
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
          ingrediënten
        </div>
        <div
          className={`hide accordion-item  absolute z-20 ${show ? "show" : ""}`}
        >
          <div className="cols-5">
            {categories.map((p, xid) => {
              return (
                <div
                  className={`first-letter `}
                  key={xid}
                  onClick={() => setShow(!show)}
                >
                  <Link
                    aria-label={`categories/${p.title}`}
                    to={`/categories/${p.title}`}
                  >
                    <p className={p.title}>{p.title}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>{" "}
      </div>
    </Fragment>
  );
};

export default CategoriesFilter;
