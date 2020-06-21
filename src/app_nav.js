import React, { useState } from "react";
import { Fragment } from "react";

const App = () => {
  const [isOn, setIsOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
    toggleSwitch();
  };

  const handleMouseDown = (e) => {
    toggleSwitch();
    setIsOpen(!isOpen);
    e.stopPropagation();
  };

  // hamburger: = => x, red => white
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <Fragment>
      <div className={`${isOpen ? "viewport menu-open" : "viewport"}`}>
        <div className="hamburger-box">
          <button
            aria-label="hamburger menu"
            onClick={handleMouseDown}
            className={isOn ? "hamburger navbox--menu-open" : "hamburger"}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <span className="hamburger-text">Menu</span>
        </div>
        <nav
          className={`${isOpen ? "sidebar menu-open" : "sidebar"}`}
          id="menu"
        >
          <div className="main-navigation">
            <div className="list-links">
              <div>
                <div className="list-links__link">
                  <a className="" href="/">
                    Home
                  </a>
                </div>
                <ul className="list-links list-plain">
                  <li>
                    <a className="text-light-hover" href="/" tabIndex="-1"></a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="list-links__link">
                  <a className="" href="/">
                    Ingrediënten
                  </a>
                  <span class="icon-arrow-right"></span>
                </div>
                <ul className="list-links list-plain">
                  <li>
                    <a className="text-light-hover" href="/">
                      Plan your Visit
                    </a>
                  </li>
                  <li>
                    <a className="text-light-hover" href="/">
                      Group and School Visits
                    </a>
                  </li>
                  <li>
                    <a className="text-light-hover" href="/">
                      What's On
                    </a>
                  </li>
                  <li>
                    <a className="text-light-hover" href="/">
                      Tickets and Webstore
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="list-links__link">
                  <a className="" href="/">
                    Gerechten
                  </a>
                  <span class="icon-arrow-right"></span>
                </div>

                <ul className="list-links list-plain">
                  <li>
                    <a className="text-light-hover" href="/">
                      Vincent's Life and Work
                    </a>
                  </li>
                  <li>
                    <a className="text-light-hover" href="/">
                      Stories about Vincent
                    </a>
                  </li>
                  <li>
                    <a className="text-light-hover" href="/">
                      Explore the Collection
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="list-links__link">
                  <a className="" href="/">
                    User
                  </a>{" "}
                  <span class="icon-arrow-right"></span>
                </div>

                <ul className="list-links list-plain">
                  <li>
                    <a className="text-light-hover" href="/">
                      Support the Museum
                    </a>
                  </li>
                  <li>
                    <a className="text-light-hover" href="/">
                      News and Press
                    </a>
                  </li>
                  <li>
                    <a className="text-light-hover" href="/">
                      Knowledge and Research
                    </a>
                  </li>
                  <li>
                    <a className="text-light-hover" href="/">
                      Business
                    </a>
                  </li>
                  <li>
                    <a className="text-light-hover" href="/">
                      Organisation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className={`page ${isOpen ? "menu-open" : null}`} id="top">
          <div className="page-body">
            <div className="page-header">
              <button className="button-login">Login</button>
            </div>
            <div className="logo-hetkookt">
              h
              <span className="shift">
                <span>e</span>
              </span>
              t <br />
              kookt
            </div>
            <div class="page-unit"></div>
          </div>
        </div>
        <div className={isOn ? "page-overlay menu-open" : "page-overlay"}></div>
      </div>
    </Fragment>
  );
};

export default App;
