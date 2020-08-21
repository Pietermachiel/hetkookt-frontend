import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../common/common";

const Categories = ({ me, setMe, thecart, categories, recipes, ...props }) => {
  // console.log("categories");
  // console.log(categories);
  return (
    <Fragment>
      <div className="container-x">
        {categories.map((c) => (
          <div key={c.id} className="cat-box mb-36">
            <h1 className="favorieten-title">{c.title}</h1>
            <div className="flexbox flexbox-margin unvisable slide work-grid-item">
              {c.sorts.map((s, xid) => (
                <div class="recipe-box recipe-box_sorts">
                  <Link to={`/sorts/${s.title}`}>
                    <div class="">
                      <img
                        src={`/img/products/product_${slugify(s.title)}.jpg`}
                        alt=""
                      />
                    </div>
                    <div class="recipe-box-footer">
                      <p>
                        <span>{s.title}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Categories;
