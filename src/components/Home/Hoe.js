import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useCurrentWidth from "../common/use-current-width";
import useCurrentHeight from "../common/use-current-height";
import useCurrentScroll from "../common/use-current-scroll";
import { slugify, kalender } from "../common/common";
import CollectionsFilter from "../CollectionsFilter";
import Search from "../Search";
import Dishes from "./dishes";
import About from "./about";

const Hoe = ({
  user,
  dishes,
  recipes,
  categories,
  sorts,
  handleSave,
  handleDelete,
  thecart,
  about,
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
      {/* <Search recipes={recipes} /> */}
      <CollectionsFilter dishes={dishes} />
      <div className="container-x">
        {/* {!user ? (
          <div className="">
            <h1 className="text-center text-4xl font-500">
              <span className="font-300">dat</span>hetkookt!
            </h1>
            <p className="text-center mb-0">
              Schrijf je in bij <span className="font-700">hetkookt</span> en
              maak een eigen kookschrift.
            </p>
            <NavLink aria-label="register" to="/register">
              <p className="text-center text-indigo-700 font-500 mb-18">
                inschrijven >
              </p>
            </NavLink>
          </div>
        ) : null} */}
        {/* <About about={about} /> */}

        <Dishes
          dishes={dishes}
          recipes={recipes}
          thecart={thecart}
          width={width}
          boxheight={boxheight}
          offset={offset}
          box={box}
        />
      </div>
    </Fragment>
  );
};

export default Hoe;
