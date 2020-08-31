import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { slugify, slugifyu } from "../common/common";

const Categories = ({ categories, tags, ...props }) => {
  const [cat, setCat] = useState("bladgroenten");

  const handleCat = (c) => {
    setCat(c);
  };

  console.log("categories");
  console.log(categories);
  console.log(tags);
  console.log(cat);

  return (
    <Fragment>
      <div className="container-x">
        <ul className="lg:w-550 m-auto text-center mt-36 mb-18">
          {categories.map((c, xid) => (
            <li
              key={xid}
              value={c}
              name={c}
              onClick={() => handleCat(c.name)}
              className={`inline-block mb-0 font-500 hover:text-red-500 ${
                cat === c.name ? "text-red-500" : null
              }`}
            >
              {c.name}&nbsp;&nbsp;
            </li>
          ))}
        </ul>

        {categories.map((c) => {
          if (c.name.indexOf(cat) < 0 && cat !== "allCats") return null;
          return (
            <div key={c._id} className="cat-box mb-36">
              <h1 className="favorieten-title">{c.name}</h1>
              <div className="flexbox flexbox-margin unvisable slide work-grid-item">
                {tags.map((s, xid) => {
                  if (c._id === s.category._id)
                    return (
                      <div key={xid} className="recipe-box recipe-box_sorts">
                        <Link to={`/sorts/${slugifyu(s.name)}`}>
                          <div className="">
                            <img
                              src={`/img/products/product_${slugify(
                                s.name
                              )}.jpg`}
                              alt=""
                            />
                          </div>
                          <div className="recipe-box-footer">
                            <p>
                              <span>{s.name}</span>
                            </p>
                          </div>
                        </Link>
                      </div>
                    );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Categories;
