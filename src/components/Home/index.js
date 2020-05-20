import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useCurrentWidth from "../common/use-current-width";
import useCurrentHeight from "../common/use-current-height";
import useCurrentScroll from "../common/use-current-scroll";
import { slugify, kalender } from "../common/common";
// import CategoriesFilter from "../CategoriesFilter";
// import CollectionsFilter from "../CollectionsFilter";
// import Search from "../Search";
// import Dishes from "./dishes";
import About from "./about";

const Home = ({
  user,
  dishes,
  recipes,
  categories,
  sorts,
  handleSave,
  handleDelete,
  thecart,
  about,
  isWat,
  ...props
}) => {
  const width = useCurrentWidth();
  const height = useCurrentHeight();
  const scroll = useCurrentScroll();
  const offset = 0;
  const box = 265;
  const boxheight = height + scroll;

  if (recipes.length === 0)
    return (
      <div className="container-x">
        <p>Loading...</p>
      </div>
    );

  return (
    <Fragment>
      {/* {isWat ? (
        <CollectionsFilter dishes={dishes} isWat={isWat} />
      ) : (
        <CategoriesFilter categories={categories} isWat={isWat} />
      )} */}
      <div className="container-x">
        {/* <Search recipes={recipes} /> */}

        {/* {!user ? (
          <div className="mt-36">
            <h1 className="text-center text-4xl font-500">
              <span className="font-300">dat</span>hetkookt!
            </h1>
            <h4 className="text-center mb-0">
              Schrijf je in bij <span className="font-700">hetkookt</span>{" "}
              <br />
              en maak een kookschrift, weekplanner en notities.
            </h4>
            <NavLink aria-label="register" to="/register">
              <p className="text-center text-indigo-700 font-500 mb-18">
                inschrijven >
              </p>
            </NavLink>
          </div>
        ) : null} */}

        {categories.map((c, xid) => {
          return (
            <Fragment>
              <Link to={`categories/${c.title}`}>
                <h1 className={`my-10 leading-relaxed ${c.title}`}>
                  {c.title}
                </h1>
              </Link>

              <div className="-ml-15 flex flex-row flex-wrap">
                {c.sorts.map((s, xid) => {
                  return (
                    <div
                      // className="grid-box unvisable slide work-grid-item"
                      key={xid}
                      className="grid-box unvisable slide work-grid-item bg-offblack text-white border border-gray-400 min-h-250 w-1/2/10 sm:w-1/2/15 lg:w-1/4/15 xl:w-1/4/15 ml-10 mb-10 md:ml-15 md:mb-15"
                    >
                      <Link to={`/sorts/${slugify(s.title)}`}>
                        <div className="">
                          <img
                            src={`/img/products/product_${slugify(
                              s.title
                            )}.jpg`}
                            alt=""
                          />
                        </div>
                      </Link>
                      <div className="relative h-60">
                        <p
                          className={`mt-10 uppercase absolute tracking-widest top-0 left-0 text-14`}
                        >
                          <span className="pl-15">{s.title}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Fragment>
          );
        })}

        <About about={about} />
        {/* <Dishes
        dishes={dishes}
        recipes={recipes}
        thecart={thecart}
        width={width}
        boxheight={boxheight}
        offset={offset}
        box={box}
      /> */}
      </div>
    </Fragment>
  );
};

export default Home;
