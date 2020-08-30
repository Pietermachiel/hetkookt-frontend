import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { slugify } from "../common/common";

const Books = ({ kitchens, books, ...props }) => {
  const [kitchen, setKitchen] = useState("allKitchens");

  // const countries = [
  //   "nederlands",
  //   "frans",
  //   "duits",
  //   "engels",
  //   "vs",
  //   "italiaans",
  //   "spaans",
  //   "oosters",
  //   "vegetarisch",
  //   "geschiedenis",
  // ];

  console.log("books");
  console.log(books);
  console.log("kitchens");
  console.log(kitchens);
  console.log("kitchen");
  console.log(kitchen);
  books = books.filter((f) => f.kitchen !== undefined);

  const handleKitchens = (c) => {
    setKitchen(c);
  };

  return (
    <Fragment>
      <div className="container-x">
        <h1 className="favorieten-title">De kookboeken</h1>
        <ul className="lg:w-550 m-auto text-center mb-36">
          {kitchens.map((c, xid) => (
            <li
              key={xid}
              value={c}
              name={c}
              onClick={() => handleKitchens(c.name)}
              className="inline-block mb-0 font-500 hover:text-red-500"
            >
              {c.name}&nbsp;&nbsp;
            </li>
          ))}
        </ul>
        <div className="ko-box">
          <div className="ko-box-inner">
            {books.map((b) => {
              console.log("b.kitchen.indexOf(kitchen)");
              console.log(b.kitchen.name.indexOf(kitchen));
              if (
                b.kitchen.name.indexOf(kitchen) < 0 &&
                kitchen !== "allKitchens"
              )
                return null;

              return (
                <Fragment key={b._id}>
                  <div className="keuken ko-box-right__outer  unvisable slide work-grid-item">
                    <div className="ko-box-right__img">
                      <Link
                        to={{
                          pathname: `/books/${slugify(b.name)}`,
                          state: b._id,
                        }}
                      >
                        <img
                          src={`/img/books/${slugify(b.name)}_title.jpg`}
                          alt=""
                        />
                      </Link>
                    </div>
                    <Link
                      className="w-50"
                      to={{
                        pathname: `/books/${slugify(b.name)}`,
                        state: b._id,
                      }}
                    >
                      {" "}
                      <div className="text-16 lg:text-19 text-center lg:text-left pt-18 pb-24 lg:px-18 relative lg:bg-orange-200 h-full">
                        <strong className="text-17 lg:text-19">{b.name}</strong>
                        <p className="lg:text-18 mb-0">{b.author}</p>
                        <span className="hidden lg:block absolute bottom-0 right-0 pr-24 pb-9 text-36 font-100">
                          {b.year}
                        </span>
                      </div>{" "}
                    </Link>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Books;
