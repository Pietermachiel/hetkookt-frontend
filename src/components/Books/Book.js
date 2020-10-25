import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../config.json";
import { slugify } from "../common/common";

const Book = ({ books, recipes, ...props }) => {
  const [thebook, setTheBook] = useState([]);

  const API = props.location.state;

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${apiUrl}/books/${API}`);
      res.json().then((res) => setTheBook(res));
    }
    getData();
  }, [API]);

  if (thebook.name === undefined) return [];

  return (
    <Fragment>
      <div className="container-x">
        <div className="flexbox-lg mt-90">
          <div className="lg:w-50 p-36 pb-0 lg:pb-36">
            <div className="koo-box-boek">
              <img
                src={`/img/books/${slugify(thebook.name)}_cover.jpg`}
                alt={thebook.name}
              />
            </div>
          </div>
          <div className="lg:w-50 p-36 pt-0 lg:pt-72">
            <div className="mb-48">
              <h1>{thebook.name}</h1>
              <h4 className="my-18">{thebook.author}</h4>
              <p>
                {thebook.publisher} {thebook.year}
              </p>
              <p>keuken: {thebook.kitchen.name}</p>
            </div>{" "}
            <Link className="text-indigo-600 font-700" to="/books">
              Boeken top 100 >
            </Link>
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

        <div className="lg:flex">
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
            {recipes.map((r) => {
              if (r.book === null) return console.log(r.title);

              if (slugify(r.book.name) === slugify(thebook.name))
                return (
                  <p key={r._id}>
                    <Link
                      to={{
                        pathname: `/recipes/${slugify(r.title)}`,
                        state: r._id,
                      }}
                    >
                      <strong className="text-indigo-600">{r.title}</strong>
                    </Link>{" "}
                    – {r.dish.name}
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
