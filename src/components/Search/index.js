import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parseHtml from "html-react-parser";
import { slugify } from "../common/common";

const Search = ({ recipes, isOn, ...props }) => {
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = recipes.filter((recipe) => {
      return (
        recipe.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    });
    setSearchResults(results);
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (e) => {
    console.log("handleClick");
    console.log(e);
    setSearchTerm(e);
    // setSearchResults([]);
  };

  return (
    <div className="w-full pr-48 pl-28 lg:pr-72 lg:pl-72">
      <form className="relative w-full">
        {/* {isOn ? "form-zoekrecept hidden" : "form-zoekrecept"} */}
        <input
          className="border border-gray-300 transition-colors duration-100 ease-in-out bg-white shadow-md focus:outline-0 border border-transparent placeholder-gray-600 rounded-lg py-8 pr-16 pl-36 block w-full appearance-none leading-normal ds-input text-16"
          type="text"
          placeholder="Zoek recept..."
          label="Search Country"
          icon="search"
          value={searchTerm}
          onChange={handleChange}
        />{" "}
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-14 flex items-center">
          <svg
            className="fill-current pointer-events-none text-gray-600 w-16 h-16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
          </svg>
        </div>
        <ul className="mt-18 absolute w-full bg-white z-10 shadow-md rounded-b-lg">
          {searchResults.length === recipes.length
            ? null
            : searchResults.map((recipe) => {
                function findString(str, find) {
                  var searchPattern = new RegExp("(" + find + ")", "ig");
                  return str.replace(searchPattern, "<b>$1</b>");
                }
                var result = parseHtml(findString(recipe.title, searchTerm));
                return (
                  <li
                    className="mb-0 border-b py-10 pl-20 text-21"
                    key={recipe._id}
                  >
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
      </form>
    </div>
  );
};

export default Search;
