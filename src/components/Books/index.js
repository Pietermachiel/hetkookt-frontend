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
                <Link className="w-50" to={`/book/${slugify(b.title)}`}>
                  <div className="text-16 lg:text-19 text-center lg:text-left pt-18 pb-24 lg:px-18 relative lg:bg-orange-200 h-full">
                    <strong className="text-17 lg:text-19">{b.title}</strong>
                    <p className="lg:text-18 mb-0">{b.author}</p>

                    <span className="hidden lg:block absolute bottom-0 right-0 pr-24 pb-9 text-36 font-100">
                      {b.year}
                    </span>
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
