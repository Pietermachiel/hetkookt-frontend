import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { uniq, slugify } from "../common/common";
import FavoriteItems from "./FavoriteItems";
import SelectedItems from "./SelectedItems";

const Collections = ({ me, setMe, thecart, dish, recipes, ...props }) => {
  const [thedish, setTheDish] = useState(props.location.state);

  const handleTheDish = (c) => {
    setTheDish(c);
  };

  return (
    <Fragment>
      <div className="container-x">
        <p className="hetkookt-title">
          <Link
            className="text-red-600 font-700"
            to={{ pathname: "/collections", state: "brood" }}
          >
            Gerechten &nbsp;
          </Link>
          / &nbsp;
          <Link
            className="hover:text-red-600"
            to={{ pathname: "/categories", state: "bladgroenten" }}
          >
            Ingrediëten
          </Link>
          {/* <Link className="leading-none" to={`/nieuwitem`}>
            <button className="bg-indigo-600 text-14 p-14 px-30 mt-0 md:mt-0 md:ml-18 align-bottom text-white uppercase tracking-widest">
              nieuw recept
            </button>
          </Link> */}
        </p>
        <ul className="lg:w-550 m-auto text-center mt-18 mb-18">
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
        {dish.map((d, xid) => {
          let therecipes = recipes.filter((r) => r.dish._id === d._id);
          let thetags = therecipes.map((t) => t.tags[0]);
          thetags = thetags.map((m) => m.name).filter(uniq);
          if (d.name !== thedish && thedish) return null;
          return (
            <Fragment key={xid}>
              <div className="cat-box mb-36">
                <h1 className="mb-18">{d.name}</h1>
                {/* <div className="flexbox flexbox-margin unvisable slide work-grid-item"> */}
                {thetags.map((s, xid) => {
                  // if (s.dish._id === d._id)
                  return (
                    <Fragment key={xid}>
                      <div className="flexbox flexbox-margin">
                        <Link
                          className="recipe-box recipe-box_sorts"
                          to={`/sorts/${slugify(s)}`}
                        >
                          <div>
                            <img
                              src={`/img/products/product_${slugify(s)}.jpg`}
                              alt=""
                            />
                          </div>{" "}
                          <div className="relative h-60">
                            <p
                              className={`text-black mt-10 uppercase absolute tracking-widest top-0 left-0 text-14`}
                            >
                              <span className="pl-15">{s}</span>
                            </p>
                          </div>
                        </Link>
                        {therecipes.map((recipe, index) => {
                          if (recipe.tags[0].name === s)
                            return (
                              <Fragment key={index}>
                                {thecart.map((cart, index) => {
                                  const cartundefined = thecart.find(
                                    (t) => t._id === recipe._id
                                  );
                                  // console.log(
                                  //   thecart.find((t) => t._id === recipe._id)
                                  // );
                                  if (
                                    cart.tags[0].name === s &&
                                    cart.dish.name === thedish &&
                                    cartundefined !== undefined
                                    // thecart.find((t) => t._id === recipe._id)
                                  )
                                    return (
                                      <Fragment key={index}>
                                        <FavoriteItems
                                          recipe={recipe}
                                          recipes={recipes}
                                          therecipes={therecipes}
                                          thecart={thecart}
                                          cart={cart}
                                          Link={Link}
                                          me={me}
                                          setMe={setMe}
                                          {...props}
                                        />
                                      </Fragment>
                                    );
                                })}
                              </Fragment>
                            );
                        })}
                        {therecipes.map((recipe, index) => {
                          if (
                            recipe.tags[0].name === s &&
                            !thecart.find((t) => t._id === recipe._id)
                          )
                            return (
                              <Fragment key={index}>
                                <SelectedItems
                                  recipe={recipe}
                                  Link={Link}
                                  me={me}
                                  setMe={setMe}
                                  {...props}
                                />
                              </Fragment>
                            );
                        })}
                      </div>
                    </Fragment>
                  );
                })}
                {/* </div> */}
              </div>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Collections;
