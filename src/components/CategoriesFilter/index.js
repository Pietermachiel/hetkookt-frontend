import React from "react";
import { Link } from "react-router-dom";
import categories from "../../data/categories.json";

const CategoriesFilter = ({ categories }) => {
  // console.log("sortsX");
  // console.log(sorts);
  return (
    <div className="categories-filter">
      {categories.map((p, xid) => {
        // console.log("p");
        // console.log(p);
        return (
          <div className={``} key={xid}>
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
  );
};

export default CategoriesFilter;
