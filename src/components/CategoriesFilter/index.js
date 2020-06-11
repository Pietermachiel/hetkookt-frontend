import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const CategoriesFilter = ({ categories, show, setShow }) => {
  // const [show, setShow] = useState(false);
  console.log(categories);

  return (
    <Fragment>
      <div
        className="accordion-wrapper relative w-50 "
        // onKeyPress={() => setShow(!show)}
        // onClick={() => setShow(!show)}
      >
        {/* <div
          className={`text-center text-indigo-600 font-300 mb-0 hover:text-indigo-600 py-9`}
        >
          ingrediënten
        </div> */}
        <div className={`accordion-item z-30 ${show ? "show" : ""}`}>
          <p className="px-20 pt-72 text-24 font-500">Ingrediënten</p>
          <div className="categories-filter bg-red-100">
            {categories.map((p, xid) => {
              return (
                <div
                  // className={`first-letter `}
                  key={xid}
                  onClick={() => setShow(!show)}
                >
                  <Link
                    aria-label={`categories/${p.title}`}
                    to={`/categories/${p.title}`}
                  >
                    <p className={`text-18 mb-18 ${p.title}`}>{p.title}</p>
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
