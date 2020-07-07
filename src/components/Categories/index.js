import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Categories = ({ me, setMe, thecart, categories, recipes, ...props }) => {
  console.log("categories");
  console.log(categories);
  return (
    <Fragment>
      <div className="container-x">
        {categories.map((c) => (
          <div key={c.id} className="cat-box mb-36">
            <h1 className="-mt-20 mb-36">{c.title}</h1>
            <div className="flexbox flexbox-margin">
              {c.sorts.map((s, xid) => (
                <div class="recipe-box recipe-box_sorts">
                  <Link to={`/sorts/${s.title}`}>
                    <div class="">
                      <img
                        src={`/img/products/product_${s.title}.jpg`}
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
