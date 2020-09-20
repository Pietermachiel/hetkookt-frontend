import React, { Fragment } from "react";
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
  // select 'recipes' recipes with recipe.dish
  let dishrecipes = recipes.filter(
    (recipe) => recipe.dish.name === props.match.params.id
  );
  // add 'thecart' recipes with recipe.dish
  thecart.map((tc) => {
    if (tc.dish.name === props.match.params.id) return dishrecipes.push(tc);
  });
  // select the first tag from each dishrecipes
  var selectedtags = dishrecipes.map((s) => s.tags[0]);
  // filter uniq tags
  selectedtags = selectedtags.map((ss) => ss.name).filter(uniq);

  console.log(selectedtags);

  return (
    <>
      <div className="container-x">
        <div className="cat-box mb-36">
          <h1 className="favorieten-title text-indigo-600 ">
            {props.match.params.id}
          </h1>

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
                  {dishrecipes.map((recipe, index) => {
                    if (recipe.tags[0].name === s)
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
