import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { slugify, slugifyu } from "../common/common";
import SelectedItems from "../Collections/SelectedItems";
import FavoriteItems from "../Collections/FavoriteItems";

const Categories = ({
  me,
  setMe,
  thecart,
  recipes,
  categories,
  tags,
  ...props
}) => {
  const [cat, setCat] = useState("bladgroenten");

  const handleCat = (c) => {
    setCat(c);
  };

  let thetags = recipes.map((r) => r.tags[0]);

  // var unique = thetags.filter(function (x, i) {
  //   return thetags[i]._id.indexOf(x._id) === i;
  // });

  // // thetags = thetags.map((m) => m.name).filter(uniq);

  var uniqTags = [];
  thetags.forEach(function (item) {
    var i = uniqTags.findIndex((x) => x.name === item.name);
    if (i <= -1) {
      uniqTags.push({
        _id: item._id,
        name: item.name,
        category: item.category,
      });
    }
  });
  // console.log(uniqTags);

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
            <Fragment key={c._id}>
              <h1 className="favorieten-title">{c.name}</h1>
              {uniqTags.map((s, xid) => {
                let recipeItems = recipes.filter(
                  (element) => element.tags[0].name === s.name
                );
                // console.log("recipeItems");
                // console.log(s.name);
                // console.log(recipeItems);
                if (c._id === s.category)
                  return (
                    // <div key={xid} className="recipe-box recipe-box_sorts">
                    <div key={xid} className="flexbox flexbox-margin">
                      <Link
                        className="recipe-box recipe-box_sorts"
                        to={`/sorts/${slugifyu(s.name)}`}
                      >
                        <div className="">
                          <img
                            src={`/img/products/product_${slugify(s.name)}.jpg`}
                            alt=""
                          />
                        </div>
                        <div className="recipe-box-footer">
                          <p>
                            <span>{s.name}</span>
                          </p>
                        </div>
                      </Link>

                      {recipeItems.map((recipe, index) => {
                        // if (recipe.tags[0].name === s)
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
                        if (recipe.tags[0].name === s.name)
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
                  );
              })}
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Categories;
