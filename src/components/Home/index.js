import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useCurrentWidth from "../common/use-current-width";
import useCurrentHeight from "../common/use-current-height";
import useCurrentScroll from "../common/use-current-scroll";
import { slugify, kalender } from "../common/common";
import Hetkookt from "./hetkookt";
// import CategoriesFilter from "../CategoriesFilter";
// import CollectionsFilter from "../CollectionsFilter";
import Search from "../Search";
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
      <Hetkookt user={user} />
      <div className="container-x">
        <Search recipes={recipes} />
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
