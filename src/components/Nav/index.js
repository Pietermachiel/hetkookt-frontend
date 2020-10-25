import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import auth from "../../services/authService";
import { deleteUser } from "../../services/userService";
import KookschriftNav from "./KookschriftNav";
import Search from "../Search";
import useCurrentWitdh from "../common/use-current-width";

// import SlidingPanel from "react-sliding-side-panel";

const Nav = ({
  isCatOpen,
  setCatOpen,
  handleCatOpen,
  isColOpen,
  setColOpen,
  handleColOpen,
  isOn,
  isOpen,
  handleIsOpen,
  me,
  user,
  recipes,
  categories,
  dish,
  searchResults,
  setSearchResults,
  search,
  setSearch,
  handleChange,
  handleClick,
  searchTerm,
  ...props
}) => {
  function handleDelete(userId) {
    deleteUser(userId);
    auth.logout();
    window.location = "/";
  }

  function handleLogin(e) {
    handleIsOpen(e);
    window.location = "/login";
  }
  // console.log("props-nav");
  // console.log(props.location.pathname);
  const location = props.location.pathname;

  const width = useCurrentWitdh();
  // console.log(width);

  // console.log("user");
  // console.log(user);

  // console.log(window.location.pathname);

  return (
    <Fragment>
      <div
        className={`${
          isOpen
            ? "sliding-panel-container menu-open"
            : "sliding-panel-container"
        }`}
      >
        <div className="panel-container-left">
          <div className={isOpen ? "hamburger-box menu-open" : "hamburger-box"}>
            <button
              aria-label="hamburger menu"
              onClick={handleIsOpen}
              className={isOn ? "hamburger navbox--menu-open" : "hamburger"}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <span className="hamburger-text">Menu</span>
          </div>
          <div className={`panel ${isOpen ? "menu-open" : "menu-closed"}`}>
            <div className="panel-content">
              <Search
                recipes={recipes}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                search={search}
                setSearch={setSearch}
                handleChange={handleChange}
                handleClick={handleClick}
                searchTerm={searchTerm}
              />
              <div className="main-navigation">
                <div className="list-links">
                  <li>
                    <div className="list-links__link">
                      <NavLink onClick={handleIsOpen} className="" to="/">
                        Home
                      </NavLink>
                    </div>
                  </li>
                  {/* <li>
                    <div className="">
                      <div className="text-white font-700 p-12">
                        De recepten
                      </div>
                    </div>
                  </li> */}
                  {/* <li>
                    <div className="list-links__link">
                      <NavLink
                        onClick={handleIsOpen}
                        className=""
                        to="/categories"
                      >
                        Ingredienten
                      </NavLink>
                    </div>
                  </li> */}
                  <li>
                    <div className="list-links__link">
                      <NavLink
                        onClick={handleIsOpen}
                        className=""
                        to={{ pathname: `/collections`, state: "brood" }}
                      >
                        Recepten
                      </NavLink>
                    </div>
                  </li>
                  {/* <CategoriesNav
                    categories={categories}
                    handleCatOpen={handleCatOpen}
                    isCatOpen={isCatOpen}
                    setCatOpen={setCatOpen}
                  />
                  <CollectionsNav
                    dish={dish}
                    handleColOpen={handleColOpen}
                    isColOpen={isColOpen}
                    setColOpen={setColOpen}
                  /> */}
                  <li>
                    <div className="list-links__link">
                      <NavLink onClick={handleIsOpen} className="" to="/books">
                        Kookboeken
                      </NavLink>
                    </div>
                  </li>
                  <li>
                    <div className="list-links__link">
                      <NavLink onClick={handleIsOpen} className="" to="/about">
                        About
                      </NavLink>
                    </div>
                  </li>
                  <li>
                    <div className="list-links__link">
                      <NavLink
                        onClick={handleIsOpen}
                        className=""
                        to="/tipstools"
                      >
                        Tips & tools
                      </NavLink>
                    </div>
                  </li>
                  {!user && (
                    <li>
                      {/* <NavLink to="/login"> */}
                      <div
                        onClick={(e) => handleLogin(e)}
                        className="list-links__link"
                      >
                        <span className="font-300">Login ></span>
                      </div>
                      {/* </NavLink> */}
                    </li>
                  )}
                  {/* {user && (
                    <Fragment>
                      <li>
                        <div className="list-links__link">
                          <NavLink
                            aria-label="user"
                            onClick={handleIsOpen}
                            className=""
                            to="/user"
                          >
                            {me.name}
                          </NavLink>
                        </div>
                      </li>
                      <li>
                        <div className="list-links__link">
                          <span
                            className="font-300"
                            onClick={() => handleDelete(user._id)}
                          >
                            Logout >
                          </span>
                        </div>
                      </li>
                    </Fragment>
                  )} */}
                  {user && user.isAdmin && (
                    <li>
                      <div className="list-links__link">
                        <NavLink
                          onClick={handleIsOpen}
                          className="font-300"
                          to="/recipes"
                        >
                          (Recipes)
                        </NavLink>
                      </div>
                    </li>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={`${isOpen ? "glass menu-open" : "glass"}`}></div>
          {/* <div
            className={isOn ? "page-overlay menu-open" : "page-overlay"}
          ></div> */}
        </div>
      </div>
      {/* {window.location.pathname === "/kookschrift" ||
      window.location.href.indexOf("/mijnrecepten") > -1 ||
      window.location.href.indexOf("/edit") > -1 ||
      window.location.pathname === "/nieuwitem" ||
      window.location.pathname === "/weekmenu" ||
      window.location.pathname === "/boodschappen" ? (
        <KookschriftNav width={width} user={user} location={location} />
      ) : null} */}
    </Fragment>
  );
};

export default withRouter(Nav);
