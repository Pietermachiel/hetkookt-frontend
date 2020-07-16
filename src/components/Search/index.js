import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parseHtml from "html-react-parser";
import { slugify } from "../common/common";

const Search = ({
  recipes,
  searchResults,
  search,
  handleChange,
  handleClick,
  searchTerm,
}) => {
  return (
    <>
      <div className="relative">
        <form className="relative w-full">
          <input
            className={`w-full bg-red-400 text-white placeholder-white py-16 pr-20 pl-36 w-full  text-17`}
            type="text"
            placeholder="Zoek recept..."
            label="Search recipe"
            icon="search"
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 pl-14 flex items-center">
            <svg
              className="fill-current pointer-events-none text-gray-600 w-18 h-18 mr-24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
            </svg>
          </div>
          <ul
            className={`search-results bg-red absolute w-full z-10 shadow-md rounded-b-lg ${
              search ? "h-screen" : null
            }`}
          >
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
                      className="bg-red-500 text-white mb-0 border-b py-12 px-36 text-19"
                      key={recipe._id}
                    >
                      <Link
                        to={`/recipe/${slugify(recipe.title)}`}
                        // value="Zoek recept..."
                        onClick={() => handleClick("")}
                      >
                        {result}/<b>{recipe.dish}</b>
                      </Link>
                    </li>
                  );
                })}
          </ul>{" "}
        </form>
      </div>
    </>
  );
};

export default Search;
