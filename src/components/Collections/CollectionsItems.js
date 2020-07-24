import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import useCurrentWidth from "../common/use-current-width";
import useCurrentHeight from "../common/use-current-height";
import useCurrentScroll from "../common/use-current-scroll";
import { slugify, kalender, uniq } from "../common/common";
import FavoriteItems from "../Recipes/FavoriteItems";
import RecipeItems from "../Recipes/RecipeItems";

const CollectionsItems = ({
  me,
  setMe,
  thecart,
  sorts,
  dishes,
  recipes,
  ...props
}) => {
  const therecipes = recipes.filter(
    (recipe) => recipe.dish === props.match.params.id
  );
  var selectedtags = therecipes
    .map((s) => s.tags[0])
    .filter((e) => e !== undefined);
  selectedtags = selectedtags.map((ss) => ss.name).filter(uniq);
  // selectedtags = selectedtags.filter((e) => e !== undefined);

  const collection = selectedtags.map((s) => {
    const selection = therecipes.filter((r) =>
      r.tags.find((t) => t.name === s)
    );
    return { title: s, selection: selection };
  });

  console.log("selectedtags");
  console.log(selectedtags);
  console.log("collection");
  console.log(collection);

  const width = useCurrentWidth();
  const height = useCurrentHeight();
  const scroll = useCurrentScroll();
  const offset = -272;
  const box = 272;
  const boxheight = height + scroll;

  return (
    <>
      {/* <CollectionsFilter dishes={dishes} /> */}
      <div className="container-x">
        <h1 className="favorieten-title text-indigo-600 ">
          {props.match.params.id}
        </h1>

        {collection.map((col, xid) => {
          return (
            <Fragment key={xid}>
              <div className="-ml-15 flex flex-row flex-wrap">
                <div
                  key={xid}
                  className="bg-offblack text-white border border-gray-400 min-h-250 w-1/2/10 sm:w-1/2/15 lg:w-1/4/15 xl:w-1/4/15 ml-10 mb-10 md:ml-15 md:mb-15"
                >
                  <Link to={`/sorts/${slugify(col.title)}`}>
                    <div>
                      <img
                        src={`/img/products/product_${slugify(col.title)}.jpg`}
                        alt=""
                      />
                    </div>
                  </Link>
                  <div className="relative h-60">
                    <p
                      className={`mt-10 uppercase absolute tracking-widest top-0 left-0 text-14`}
                    >
                      <span className="pl-15">{col.title}</span>
                    </p>
                  </div>
                </div>
                {col.selection.map((recipe, index) => {
                  let cart = thecart.find((c) => c._id === recipe._id);
                  // console.log(cart);
                  // console.log(thecart);
                  // console.log(therecipes);
                  if (cart === undefined) cart = [];
                  const thelength = recipe.tags.length - 1;
                  if (recipe.basics === undefined) return (recipe.basics = []);
                  return (
                    <Fragment>
                      {cart._id === recipe._id ? (
                        <FavoriteItems
                          recipe={recipe}
                          cart={cart}
                          Link={Link}
                          me={me}
                          setMe={setMe}
                          {...props}
                        />
                      ) : (
                        <RecipeItems
                          recipe={recipe}
                          cart={cart}
                          Link={Link}
                          // handleDeleteFavorite={handleDeleteFavorite}
                          me={me}
                          setMe={setMe}
                          {...props}
                        />
                      )}
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
