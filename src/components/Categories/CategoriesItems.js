import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../common/common";
import SelectedItems from "../Collections/SelectedItems";
import FavoriteItems from "../Collections/FavoriteItems";
import { apiUrl } from "../../config.json";

const CategoriesItems = ({
  me,
  setMe,
  thecart,
  categories,
  recipes,
  ...props
}) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${apiUrl}/categories/${props.location.state}`);
      res.json().then((res) => setTags(res));
    }
    getData();
  }, [props.location.state]);

  return (
    <>
      <div className="container-x">
        <h1 className="favorieten-title">{props.match.params.id}</h1>
        {tags.map((s, xid) => {
          let recipeItems = recipes.filter(
            (element) => element.tags[0].name === s.name
          );
          console.log("recipeItems");
          console.log(recipeItems);
          if (recipeItems.length !== 0)
            return (
              <div key={xid} className="flexbox flexbox-margin">
                <Link
                  className="recipe-box recipe-box_sorts"
                  to={`/sorts/${slugify(s.name)}`}
                >
                  <div>
                    <img
                      src={`/img/products/product_${slugify(s.name)}.jpg`}
                      alt=""
                    />
                    <div className="recipe-box-footer">
                      <p>
                        <span>{s.name}</span>
                      </p>
                    </div>
                  </div>
                </Link>

                {recipeItems.map((recipe, index) => {
                  return (
                    <Fragment key={recipe._id}>
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
                  let recipeTags = recipe.tags.map((element) => {
                    let name = element.name;
                    return name;
                  });
                  console.log(recipeTags);
                  console.log("s.name");
                  console.log(s.name);
                  if (recipeTags.includes(s.name))
                    return (
                      <FavoriteItems
                        key={recipe._id}
                        recipe={recipe}
                        Link={Link}
                        me={me}
                        setMe={setMe}
                        {...props}
                      />
                    );
                })}
              </div>
            );
        })}

        {/* {categories.map((category, index) => {
          if (category.title === props.match.params.id)
            return (
              <Fragment key={index}>
                {category.sorts.map((s, xid) => {
                  let recipeItems = recipes.filter(
                    (element) => element.tags[0].name === s.title
                  );
                  if (recipeItems.length !== 0)
                    return (
                      <div key={xid} className="flexbox flexbox-margin">
                        <div className="recipe-box recipe-box_sorts">
                          <div className="">
                            <img
                              src={`/img/products/product_${slugify(
                                s.title
                              )}.jpg`}
                              alt=""
                            />
                          </div>
                          <div className="recipe-box-footer">
                            <p>
                              <span>{s.title}</span>
                            </p>
                          </div>
                        </div>
                        {recipeItems.map((recipe, index) => {
                          return (
                            <Fragment key={recipe._id}>
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
                          let recipeTags = recipe.tags.map((element) => {
                            let name = element.name;
                            return name;
                          });
                          console.log(recipeTags);
                          console.log("s.title");
                          console.log(s.title);
                          if (recipeTags.includes(s.title))
                            return (
                              <FavoriteItems
                                key={recipe._id}
                                recipe={recipe}
                                Link={Link}
                                me={me}
                                setMe={setMe}
                                {...props}
                              />
                            );
                        })}
                      </div>
                    );
                })}
              </Fragment>
            );
        })} */}
      </div>
    </>
  );
};

export default CategoriesItems;
