import React, { Fragment, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useCurrentWidth from "../common/use-current-width";
import useCurrentHeight from "../common/use-current-height";
import useCurrentScroll from "../common/use-current-scroll";
import { slugify, kalender, uniq } from "../common/common";
import FavoriteItems from "./FavoriteItems";
import SelectedItems from "./SelectedItems";

const CollectionsItems = ({
  me,
  setMe,
  thecart,
  sorts,
  dish,
  // recipes,
  ...props
}) => {
  const [recipes, setRecipes] = useState([]);

  const API = props.location.state;

  console.log(`http://localhost:3900/api/dishes/${API}`);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`http://localhost:3900/api/dishes/${API}`);
      res.json().then((res) => setRecipes(res));
    }
    getData();
  }, [API]);

  let therecipes = recipes.filter(
    (recipe) => recipe.dish.name === props.match.params.id
  );

  // select 'recipes' recipes with recipe.dish
  let dishrecipes = recipes.filter(
    (recipe) => recipe.dish.name === props.match.params.id
  );
  // add 'thecart' recipes with recipe.dish
  thecart.map((tc) => {
    if (tc.dish.name === props.match.params.id) dishrecipes.push(tc);
  });
  // select the first tag from each dishrecipes
  var selectedtags = dishrecipes.map((s) => s.tags[0]);
  // filter uniq tags
  selectedtags = selectedtags.map((ss) => ss.name).filter(uniq);

  console.log("selectedtags");
  console.log(selectedtags);
  console.log("props.match.params.id");
  console.log(props.match.params.id);
  console.log("therecipes");
  console.log(therecipes);
  console.log("dishrecipes");
  console.log(dishrecipes);
  console.log("dish");
  console.log(dish);

  return (
    <>
      <div className="container-x">
        <h1 className="favorieten-title text-indigo-600 ">
          {props.match.params.id}
        </h1>

        {selectedtags.map((s, xid) => {
          return (
            <Fragment key={xid}>
              <div className="-ml-15 flex flex-row flex-wrap">
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
                    </div>
                  </Link>
                  <div className="relative h-60">
                    <p
                      className={`mt-10 uppercase absolute tracking-widest top-0 left-0 text-14`}
                    >
                      <span className="pl-15">{s}</span>
                    </p>
                  </div>
                </div>
                {therecipes.map((recipe, index) => {
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
                  if (
                    recipe.dish.name === props.match.params.id &&
                    recipe.tags[0].name === s
                  )
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
    </>
  );
};

export default CollectionsItems;
