import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { slugify, kalender, uniq } from "../common/common";

const Dishes = ({
  dishes,
  recipes,
  thecart,
  width,
  boxheight,
  offset,
  box,
}) => {
  // const [isOn, setIsOn] = useState(false);

  if (recipes.length === 0)
    return (
      <div className="container-x">
        <p>Loading...</p>
      </div>
    );

  return (
    <Fragment>
      {dishes.map((d, xid) => {
        const therecipes = recipes.filter((recipe) => recipe.dish === d);
        if (therecipes === undefined) return [];
        let thetags = therecipes.map((t) => t.tags[0]);
        thetags = thetags.filter((tt) => tt !== undefined);
        const unique = thetags.filter(uniq);
        console.log(unique);
        return (
          <Fragment key={xid}>
            <h1 className="text-indigo-600 mb-10 sm:ml-10 md:ml-0">{d}</h1>
            <div className="-ml-15 flex flex-row flex-wrap">
              {unique.map((s, xid) => {
                return (
                  <div
                    // className="grid-box unvisable slide work-grid-item"
                    key={xid}
                    className="grid-box unvisable slide work-grid-item bg-offblack text-white border border-gray-400 min-h-250 w-1/2/10 sm:w-1/2/15 lg:w-1/4/15 xl:w-1/4/15 ml-10 mb-10 md:ml-15 md:mb-15"
                  >
                    <Link to={`/collections/${slugify(d)}`}>
                      <div className="">
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
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Dishes;
