import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import CategoriesNav from "./CategoriesNav";
import CollectionsNav from "./CollectionsNav";
import auth from "../../services/authService";
import { deleteUser } from "../../services/userService";
import Kookschrift from "../Kookschrift";
import Search from "../Search";
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
  dishes,
  ...props
}) => {
  function handleDelete(userId) {
    deleteUser(userId);
    auth.logout();
    window.location = "/";
  }
  // console.log("props-nav");
  // console.log(props.location.pathname);
  const location = props.location.pathname;
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
              <Search recipes={recipes} />
              <div className="main-navigation">
                <div className="list-links">
                  <li>
                    <div className="list-links__link">
                      <NavLink onClick={handleIsOpen} className="" to="/">
                        Home
                      </NavLink>
                    </div>
                  </li>
                  {/* <p className="font-500 tracking-widest text-center mb-0 mt-18">
                      recepten
                    </p> */}
                  <CategoriesNav
                    categories={categories}
                    handleCatOpen={handleCatOpen}
                    isCatOpen={isCatOpen}
                    setCatOpen={setCatOpen}
                  />
                  <CollectionsNav
                    dishes={dishes}
                    handleColOpen={handleColOpen}
                    isColOpen={isColOpen}
                    setColOpen={setColOpen}
                  />
                  <li>
                    <div className="list-links__link">
                      <NavLink onClick={handleIsOpen} className="" to="/books">
                        Boekentop100
                      </NavLink>
                    </div>
                  </li>
                  {/* <p className="font-500 tracking-widest text-center mb-0 mt-18">
                      kookschrift
                    </p> */}
                  {/* <li>
                      <div className="list-links__link">
                        <NavLink
                          onClick={handleIsOpen}
                          className=""
                          to="/weekmenu"
                        >
                          Weekmenu
                        </NavLink>
                      </div>
                    </li>
                    <li>
                      <div className="list-links__link">
                        <NavLink
                          onClick={handleIsOpen}
                          className=""
                          to="/boodschappen"
                        >
                          Boodschappen
                        </NavLink>
                      </div>
                    </li>
                    <li>
                      <div className="list-links__link">
                        <NavLink
                          onClick={handleIsOpen}
                          className=""
                          to="/voorraad"
                        >
                          Voorraad
                        </NavLink>
                      </div>
                    </li>
                    <li>
                      <div className="list-links__link">
                        <NavLink
                          onClick={handleIsOpen}
                          className=""
                          to="/favorites"
                        >
                          Favorieten
                        </NavLink>
                      </div>
                    </li> */}
                  {/* <p className="font-500 tracking-widest text-center mb-0 mt-18">
                      user
                    </p> */}
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
                  {user && (
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
      <Kookschrift user={user} location={location} />
    </Fragment>
  );
};

export default withRouter(Nav);
