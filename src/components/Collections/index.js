import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { uniq } from "../common/common";

const Collections = ({ me, setMe, thecart, dishes, recipes, ...props }) => {
  console.log("dishes");
  console.log(dishes);

  return (
    <Fragment>
      <div className="container-x">
        {dishes.map((d, xid) => {
          const therecipes = recipes.filter((recipe) => recipe.dish === d);

          var selectedtags = therecipes.map((s) => s.tags[0]);
          selectedtags = selectedtags
            .filter(uniq)
            .filter((e) => e !== undefined);

          const collection = selectedtags.map((s) => {
            const selection = therecipes.filter((r) => r.tags[0] === s);
            return { title: s, selection: selection };
          });
          return (
            <div key={xid} className="cat-box inline-block">
              <h1 className="-mt-20 mb-18 inline text-36">
                <Link to={`/collections/${d}`}>{d} &nbsp;&nbsp;</Link>
              </h1>
              {/* <div className="flexbox flexbox-margin">
                {collection.map((s) => (
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
              </div> */}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Collections;
