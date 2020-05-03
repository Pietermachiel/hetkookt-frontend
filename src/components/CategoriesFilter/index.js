import React from "react";
import { Link } from "react-router-dom";
import categories from "../../data/categories.json";

const CategoriesFilter = () => {
  return (
    <div className="categories-filter">
      {categories.map((p, xid) => {
        // console.log(p);
        return (
          <div key={xid}>
            <Link aria-label={`categories/${p}`} to={`/categories/${p}`}>
              <p className={p}>{p}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesFilter;
