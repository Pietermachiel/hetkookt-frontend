import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { recipeUrl } from "../../config.json";
import { slugify } from "../common/common";

const Book = ({ books, recipes, ...props }) => {
  const [thebook, setTheBook] = useState([]);
  //   console.log(props);

  const API = props.match.url;
  //   console.log("API");
  //   console.log(API);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${recipeUrl}${API}.json`);
      res.json().then((res) => setTheBook(res));
    }
    getData();
  }, [API]);

  if (thebook.title === undefined) return [];

  //   console.log("recipeUrl");
  //   console.log(recipeUrl);
  console.log("thebook");
  console.log(thebook);
  console.log("recipes");
  console.log(recipes);

  return (
    <Fragment>
      <div className="container-x">
        <div className="flexbox mt-20">
          <div className="w-50 p-36">
            <div className="koo-box-boek">
              <img
                src={`/img/books/${slugify(thebook.title)}_cover.jpg`}
                alt={thebook.title}
              />
            </div>
          </div>
          <div className="w-50 p-36 pt-72">
            <div className="">
              <h1>{thebook.title}</h1>
              <h4 className="my-18">
                <a href="">{thebook.author}</a>
              </h4>
              <p>
                {thebook.publisher} {thebook.year}
              </p>
              <p>keuken: {thebook.kitchen}</p>
            </div>
          </div>
        </div>

        <div className="">
          <div className="kookboek-content">
            <p>{thebook.text}</p>
            <br />
            <h5>
              Bron:
              <a
                href={`${thebook.source}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ml-9">
                  <strong className="text-indigo-600">
                    {thebook.publisher}
                  </strong>
                </span>
              </a>
            </h5>
          </div>
        </div>

        <div className="flex">
          <div className="koo-box-footer">
            <div className="kookboek-portret">
              <img
                src={`/img/books/auteur_${slugify(thebook.author)}.jpg`}
                alt=""
              />
              <h6 className="mt-18 font-700 text-17">{thebook.author}</h6>
            </div>
          </div>

          <div className="koo-box-footer pt-12">
            {/* {% include recepten.html %} */}
            {recipes.map((r) => {
              if (slugify(r.source) === thebook.bookId)
                return (
                  <p>
                    <Link to={`/recipe/${slugify(r.title)}`}>
                      <strong className="text-indigo-600">{r.title}</strong>
                    </Link>{" "}
                    – {r.dish}
                  </p>
                );
            })}
            <br />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Book;
