import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { uniq, slugify } from "../common/common";

const Collections = ({ me, setMe, thecart, dish, recipes, ...props }) => {
  const [thedish, setTheDish] = useState("bladgroenten");

  const handleTheDish = (c) => {
    setTheDish(c);
  };

  console.log("dish");
  console.log(dish);

  // {categories.map((c) => {
  //   if (c.name.indexOf(cat) < 0 && cat !== "allCats") return null;
  //   return (
  //     <div key={c._id} className="cat-box mb-36">
  //       <h1 className="favorieten-title">{c.name}</h1>
  //       <div className="flexbox flexbox-margin unvisable slide work-grid-item">
  //         {tags.map((s, xid) => {
  //           if (c._id === s.category)
  //             return (
  //               <div key={s.category} class="recipe-box recipe-box_sorts">
  //                 <Link to={`/sorts/${s.name}`}>

  return (
    <Fragment>
      <div className="container-x">
        <ul className="lg:w-550 m-auto text-center mt-36 mb-18">
          {dish.map((c, xid) => (
            <li
              key={xid}
              value={c}
              name={c}
              onClick={() => handleTheDish(c.name)}
              className={`inline-block mb-0 font-500 hover:text-red-500 ${
                thedish === c.name ? "text-red-500" : null
              }`}
            >
              {c.name}&nbsp;&nbsp;
            </li>
          ))}
        </ul>
        {dish.map((d) => {
          let therecipes = recipes.filter((r) => r.dish._id === d._id);
          let thetags = therecipes.map((t) => t.tags[0]);
          thetags = thetags.map((m) => m.name).filter(uniq);
          return (
            <Fragment>
              <div className="cat-box mb-36">
                <h1 className="mb-18">{d.name}</h1>
                <div className="flexbox flexbox-margin unvisable slide work-grid-item">
                  {thetags.map((s, xid) => {
                    return (
                      <Fragment key={xid}>
                        <div className="recipe-box recipe-box_sorts">
                          <Link to={`/sorts/${slugify(s)}`}>
                            <div>
                              <img
                                src={`/img/products/product_${slugify(s)}.jpg`}
                                alt=""
                              />
                            </div>{" "}
                            <div className="relative h-60">
                              <p
                                className={`mt-10 uppercase absolute tracking-widest top-0 left-0 text-14`}
                              >
                                <span className="pl-15">{s}</span>
                              </p>
                            </div>
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Collections;
