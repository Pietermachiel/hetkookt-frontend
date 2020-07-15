import React, { Fragment, useState } from "react";
import { slugify, kalender } from "../common/common";
import { deleteRecipe } from "../../services/userService";

const ItemsItem = ({
  cart,
  Link,
  recipe,
  thelength,
  red,
  me,
  setMe,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("cart");
  console.log(cart);
  console.log("kalender");
  console.log(kalender);

  const handleDeleteRecipe = (id) => {
    deleteRecipe(me, setMe, id);
  };

  return (
    <Fragment>
      <div
        key={recipe._id}
        className={`recipe-box bg-rose-200 grid-box unvisable slide work-grid-item grid-box__black `}
      >
        <div className={`min-h-full70 p-12 md:p-15`}>
          <Link to={`/kookschrift/${slugify(recipe.title)}`}>
            <h4 className={`text-18 break-words mb-15`}>{recipe.title}</h4>
          </Link>
          <ul className="mb-12">
            {recipe.basics.map((b, id) => (
              <li key={id} className={`mb-0 font-700 text-15 md:text-16 `}>
                {b.name}
              </li>
            ))}
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
        {/* <div className="h-60 relative">
          <p className={`uppercase tracking-widest text-12 pl-15 `}>
            {recipe.dish}
          </p>
          {kalender.map((w) =>
            cart.date.includes(w.year) ? (
              <p
                key={w.index}
                className={`-mt-21 font-700 text-red-500 text-16 float-right pr-60 pt-16 mb-0 ${
                  red ? "text-red-500" : null
                }`}
              >
                {w.day} {w.index}
              </p>
            ) : null
          )}
          <div className={`recipe-footer__box-delete`}>
            <div className="recipe-footer__box-buttons">
              <button
                className="btn-delete"
                onClick={() => handleDeleteRecipe(recipe._id)}
              >
                <span>
                  <img className="h-28 w-28" src="/img/feather/x.svg" alt="" />
                </span>
              </button>
            </div>
          </div>
        </div> */}
        <div className="h-72 relative overflow-hidden">
          <p className={`uppercase tracking-widest text-14 pl-15 mb-0`}>
            {recipe.dish}
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
                  src="/img/icons/btn-remove.svg"
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
