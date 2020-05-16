import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../common/common";

const Favorites = ({ handleDeleteFavorite, thecart }) => {
  if (thecart === undefined) thecart = [];
  // console.log("thecart");
  // console.log(thecart.length);

  return (
    <Fragment>
      <div className="container-x">
        <h1 className="mb-10 pt-15">kookschrift</h1>
        {thecart.length === 0 ? (
          <div className="">
            <p className="font-600">Er staat nog niets in het kookschrift.</p>
            <p className="w-full md:w-50">
              Zoek je favorite recepten en voeg er persoonlijke notities aan
              toe.
            </p>
          </div>
        ) : null}
        <div className="-ml-15 mb-10 flex flex-row flex-wrap">
          {thecart.map((m) => {
            if (m.favorite === true)
              return (
                <div
                  className={`grid-box unvisable slide work-grid-item ${
                    m._id ? "grid-box__black" : "grid-box__gray"
                  }`}
                  key={m._id}
                >
                  <div className={`min-h-full70 p-15`}>
                    <Link to={`/recipe/${slugify(m.title)}`}>
                      <h4 className={`break-words mb-15`}>{m.title}</h4>
                    </Link>{" "}
                    <ul className="mb-12">
                      {m.basics.map((b, id) => (
                        <li
                          key={id}
                          className={`mb-0 leading-tight font-700 text-18 md:text-19 `}
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                    {m.tags.map((t, id) => {
                      const thelength = m.tags.length - 1;
                      return (
                        <Fragment key={id}>
                          <span className={`text-16`}>{t}</span>
                          {thelength === id ? "" : ", "}
                        </Fragment>
                      );
                    })}
                  </div>

                  <div className="h-72 relative overflow-hidden">
                    <p
                      className={`uppercase tracking-widest text-14 pl-15 mb-0`}
                    >
                      {m.dish}
                    </p>

                    <div
                      className={`recipe-footer__box-delete ${
                        m.isOpen ? "box-delete__open" : null
                      }`}
                    >
                      <div className="recipe-footer__box-buttons">
                        <button
                          className="btn-delete"
                          // onClick={() => handleUpdate(m._id)}
                          onClick={() => handleDeleteFavorite(m._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100"
                            height="100"
                            viewBox="0 0 19 19"
                            // stroke-linejoin="round"
                          >
                            <path d="M14.9 17.5l2.6-2.6 -5.4-5.4 5.4-5.4 -2.6-2.6 -5.4 5.4 -5.4-5.4 -2.6 2.6 5.4 5.4 -5.4 5.4 2.6 2.6 5.4-5.4 5.4 5.4Z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteFavorite(m._id)}
                          className="btn-weg"
                        >
                          Wegdoen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Favorites;
