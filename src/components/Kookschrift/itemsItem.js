import React, { Fragment, useState } from "react";
import { slugify } from "../common/common";
import { deleteItem } from "../../services/userService";

const ItemsItem = ({
  cart,
  Link,
  thecart,
  recipe,
  recipes,
  thelength,
  me,
  setMe,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteRecipe = (id) => {
    deleteItem(me, setMe, id);
  };

  return (
    <Fragment>
      <div
        key={recipe._id}
        // className={`recipe-box bg-black text-white grid-box unvisable slide work-grid-item grid-box__black `}
        className={`recipe-box text-white grid-box unvisable slide work-grid-item grid-box__black ${
          !recipes.find((t) => t._id === recipe._id)
            ? "bg-indigo-600"
            : "bg-black"
        }`}
      >
        <div className={`min-h-full70 p-12 md:p-15`}>
          <Link to={`/mijnrecepten/${slugify(recipe.title)}`}>
            <h4 className={`text-18 break-words mb-15`}>{recipe.title}</h4>
          </Link>
          <ul className="mb-12">
            {/* {recipe.basics.map((b, id) => (
              <li key={id} className={`mb-0 font-700 text-15 md:text-16 `}>
                {b.name}
              </li>
            ))} */}
          </ul>
          <ul className={`leading-tight`}>
            {recipe.tags.map((t, id) => (
              <Fragment key={id}>
                <li className={`inline text-15`}>
                  {t.name}
                  {thelength === id ? "" : ", "}
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
        <div className="h-72 relative overflow-hidden pt-18">
          <p className={`uppercase tracking-widest text-14 pl-15 mb-0`}>
            {recipe.dish.name}
          </p>
          <div
            className={`recipe-footer__box-delete ${
              isOpen ? "box-delete__open" : null
            }`}
          >
            <div className="flex items-center">
              <button
                className="btn-delete"
                // onClick={() => handleUpdate(recipe._id)}
                onClick={() => setIsOpen(!isOpen)}
              >
                <img
                  className="w-32 h32 -mt-3"
                  src="/img/icons/btn-remove-red.svg"
                  alt=""
                />
              </button>
              <button
                onClick={() => handleDeleteRecipe(recipe._id)}
                className="btn-weg"
              >
                Wegdoen
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ItemsItem;
