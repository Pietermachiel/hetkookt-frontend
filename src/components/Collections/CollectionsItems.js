import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { slugify, uniq } from "../common/common";
import FavoriteItems from "./FavoriteItems";
import SelectedItems from "./SelectedItems";

const CollectionsItems = ({
  me,
  setMe,
  thecart,
  sorts,
  dish,
  recipes,
  ...props
}) => {
  const [thecollection, setTheCollection] = useState(props.match.params.id);
  // console.log("collectionsitems: props.match.params.id");
  // console.log(props.match.params.id);
  // console.log(thecollection);

  const handleTheCollection = (e) => {
    setTheCollection(e);
    // window.location = `/collections/${e}`;
  };

  // select 'recipes' recipes with recipe.dish
  let dishrecipes = recipes.filter(
    (recipe) => recipe.dish.name === thecollection
  );
  // add 'thecart' recipes with recipe.dish
  thecart
    .filter((tc) => tc.dish.name === thecollection)
    .map((tc) => {
      return dishrecipes.push(tc);
    });
  // select the first tag from each dishrecipes
  var selectedtags = dishrecipes.map((s) => s.tags[0]);
  // filter uniq tags
  selectedtags = selectedtags.map((ss) => ss.name).filter(uniq);

  // console.log(selectedtags);

  return (
    <>
      <div className="container-x">
        <div className="cat-box mb-36">
          <ul className="lg:w-550 m-auto text-center mt-90 mb-18">
            {dish.map((c, xid) => (
              <li
                key={xid}
                value={c}
                name={c}
                onClick={() => handleTheCollection(c.name)}
                className={`inline-block mb-0 font-500 hover:text-red-500 ${
                  thecollection === c.name ? "text-red-500" : null
                }`}
              >
                {c.name}&nbsp;&nbsp;
              </li>
            ))}
          </ul>
          <h1 className="favorieten-title text-indigo-600 ">{thecollection}</h1>

          {selectedtags.map((s, xid) => {
            return (
              <Fragment key={xid}>
                <div className="flexbox flexbox-margin unvisable slide work-grid-item">
                  <div
                    key={xid}
                    className="bg-offblack text-white border border-gray-400 min-h-250 w-1/2/10 sm:w-1/2/15 lg:w-1/4/15 xl:w-1/4/15 ml-10 mb-10 md:ml-15 md:mb-15"
                  >
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
                  {thecart.map((recipe, index) => {
                    if (recipe.tags[0].name === s)
                      return (
                        <Fragment key={index}>
                          <FavoriteItems
                            recipe={recipe}
                            Link={Link}
                            me={me}
                            setMe={setMe}
                            {...props}
                          />
                        </Fragment>
                      );
                  })}
                  {dishrecipes.map((recipe, index) => {
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
        </div>
      </div>
    </>
  );
};

export default CollectionsItems;
