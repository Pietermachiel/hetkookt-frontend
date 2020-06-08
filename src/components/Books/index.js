import React from "react";
import { Fragment } from "react";

const Books = ({ books, ...props }) => {
  console.log(books);
  return (
    <Fragment>
      <h1>Boekentop100</h1>
      <div className="container">
        <div className="ko-box">
          <div className="ko-box-right">
            <h6>kookboeken</h6>
            {books.map((b) => (
              <div
                key={b.index}
                className="keuken ko-box-right__outer content-item work-grid-item inview"
              >
                <div className="ko-box-right__img">
                  <img src={`/img/books/${b.sourceId}_title.jpg`} alt="" />
                </div>
                <div className="ko-box-right__text">
                  <p>{b.title}</p>
                  <h2>2000</h2>
                  <p>{b.author}</p>
                </div>
              </div>
            ))}

            <h5>alle kookboeken</h5>
          </div>

          <div className="ko-box-left">
            {books.map((b) => (
              <div
                key={b.index}
                className="keuken ko-box-left__outer content-item work-grid-item inview"
              >
                <div className="ko-box-left__top">
                  <div className="ko-box-left__img">
                    <figure className="post__image">
                      <img src={`/img/books/${b.sourceId}_title.jpg`} alt="" />
                    </figure>
                  </div>
                </div>
                <div className="ko-box-left__bottom">
                  <p>selectie</p>
                  <h4>
                    {b.title}
                    <span>2000</span>
                  </h4>
                  <h5>{b.author}</h5>
                  <h6>Uitgever, 2000</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Books;
