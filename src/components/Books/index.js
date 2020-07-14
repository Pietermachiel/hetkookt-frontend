import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { slugify } from "../common/common";

const Books = ({ books, ...props }) => {
  // console.log(books);
  return (
    <Fragment>
      <div className="container-x">
        <h1 className="favorieten-title">Boeken top 100</h1>
        <div className="filter-box__kookboeken">
          nederlands&nbsp; frans&nbsp; duits&nbsp; engels&nbsp; vs&nbsp;
          italiaans&nbsp; spaans&nbsp; nordic&nbsp; oosters&nbsp;
          vegetarisch&nbsp; geschiedenis&nbsp;
        </div>
        <div className="ko-box">
          <div className="ko-box-inner">
            {books.map((b) => (
              <div
                key={b.index}
                className="keuken ko-box-right__outer  unvisable slide work-grid-item"
              >
                <div className="ko-box-right__img">
                  <Link to={`/book/${slugify(b.title)}`}>
                    <img src={`/img/books/${b.sourceId}_title.jpg`} alt="" />
                  </Link>
                </div>
                <Link
                  className="ko-box-right__text"
                  to={`/book/${slugify(b.title)}`}
                >
                  <div>
                    <p>{b.title}</p>

                    <h2>{b.year}</h2>
                    <p>{b.author}</p>
                  </div>{" "}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Books;
