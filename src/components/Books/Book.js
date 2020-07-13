import React, { Fragment, useEffect, useState } from "react";
import recipeUrl from "../../config.json";

const Book = ({ books, recipes, ...props }) => {
  const [thebook, setTheBook] = useState([]);
  console.log(props);

  const API = props.match.url;

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${recipeUrl}${API}.json`);
      res.json().then((res) => setTheBook);
    }
    getData();
  }, [API]);

  console.log(recipeUrl);
  console.log(thebook);
  return (
    <Fragment>
      <h1>Book</h1>
      <h2>{thebook.title}</h2>
    </Fragment>
  );
};

export default Book;
