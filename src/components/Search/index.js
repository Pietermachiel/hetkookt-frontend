import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parseHtml from "html-react-parser";
import { slugify } from "../common/common";

const Search = ({ recipes, isOn, ...props }) => {
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = recipes.filter(recipe => {
      return (
        recipe.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    });
    setSearchResults(results);
  }, [searchTerm]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleClick = e => {
    console.log("handleClick");
    console.log(e);
    setSearchTerm(e);
    // setSearchResults([]);
  };

  return (
    <div className="container-x">
      <form className="form-zoekrecept">
        {/* {isOn ? "form-zoekrecept hidden" : "form-zoekrecept"} */}
        <input
          className="form-zoekrecept__input"
          type="text"
          placeholder="Zoek recept met bv 'tomaten'..."
          label="Search Country"
          icon="search"
          value={searchTerm}
          onChange={handleChange}
        />{" "}
      </form>
      <ul className="search-box__results">
        {searchResults.length === recipes.length
          ? null
          : searchResults.map(recipe => {
              function findString(str, find) {
                var searchPattern = new RegExp("(" + find + ")", "ig");
                return str.replace(searchPattern, "<b>$1</b>");
              }
              var result = parseHtml(findString(recipe.title, searchTerm));
              return (
                <li key={recipe._id}>
                  <Link
                    to={`/recipe/${slugify(recipe.title)}`}
                    value="Zoek recept met bv 'tomaten'..."
                    onClick={() =>
                      handleClick("Zoek recept met bv 'tomaten'...")
                    }
                  >
                    {result}/<b>{recipe.dish}</b>
                  </Link>
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export default Search;
