import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import inschrijven from "./components/inschrijven";
import Verify from "./components/verify";
import logout from "./components/logout";
import Test from "./components/Test";
import Home from "./components/Home";
import Recipe from "./components/Recipe";
import Sorts from "./components/Sorts";
import Categories from "./components/Categories";
import Collections from "./components/Collections";
import Favorites from "./components/Favorites";
import Boodschappen from "./components/Boodschappen";
import Voorraad from "./components/Voorraad";
import Books from "./components/Books";
import Weekmenu from "./components/Weekmenu";
import User from "./components/User";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import axios from "axios";
import { apiUrl, recipeUrl } from "./config.json";
import LogoBox from "./components/LogoBox";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [sorts, setSorts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [stock, setStock] = useState([]);
  const [user, setUser] = useState([]);
  const [me, setMe] = useState([]);
  const [about, setAbout] = useState([]);
  const [books, setBooks] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCatOpen, setCatOpen] = useState(false);
  const [isColOpen, setColOpen] = useState(false);

  const handleIsOpen = (e) => {
    // toggleMenu();
    toggleSwitch();
    setIsOpen(!isOpen);
    e.stopPropagation();
  };

  const handleCatOpen = () => {
    toggleSwitch();
    setIsOpen(!isOpen);
    setCatOpen(!isCatOpen);
  };

  const handleColOpen = () => {
    toggleSwitch();
    setIsOpen(!isOpen);
    setColOpen(!isColOpen);
  };

  // hamburger: = => x, red => white
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  // console.log("recipes");
  // console.log(recipes);
  // console.log("sorts");
  // console.log(sorts);
  // console.log("categories");
  // console.log(categories);
  // console.log("dishes");
  // console.log(dishes);
  // console.log("user");
  // console.log(user);
  // console.log("me");
  // console.log(me);
  // console.log(stock);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${recipeUrl}/recipes.json`);
      res.json().then((res) => setRecipes(res));
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${recipeUrl}/sorts.json`);
      res.json().then((res) => setSorts(res));
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${recipeUrl}/categories.json`);
      res.json().then((res) => setCategories(res));
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${recipeUrl}/dishes.json`);
      res.json().then((res) => setDishes(res));
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${recipeUrl}/stock.json`);
      res.json().then((res) => setStock(res));
    }
    getData();
  }, []);

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  useEffect(() => {
    if (!auth.getCurrentUser()) return;
    async function getData() {
      const res = await axios.get(`${apiUrl}/users/me`);
      const me = await res.data;
      setMe(me);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${recipeUrl}/about.json`);
      res.json().then((res) => setAbout(res));
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${recipeUrl}/source.json`);
      res.json().then((res) => setBooks(res));
    }
    getData();
  }, []);

  var thecart = me.recipes;
  if (thecart === undefined) thecart = [];

  var thefavorites = me.favorites;
  if (thefavorites === undefined) thefavorites = [];

  return (
    <>
      <div className={`${isOpen ? "content menu-open" : "content"}`}>
        <header>
          <Nav
            isOn={isOn}
            isOpen={isOpen}
            handleIsOpen={handleIsOpen}
            isCatOpen={isCatOpen}
            setCatOpen={setCatOpen}
            handleCatOpen={handleCatOpen}
            isColOpen={isColOpen}
            setColOpen={setColOpen}
            handleColOpen={handleColOpen}
            me={me}
            user={user}
            categories={categories}
            sorts={sorts}
            dishes={dishes}
          />
        </header>
        <LogoBox me={me} user={user} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                me={me}
                setMe={setMe}
                user={user}
                recipes={recipes}
                categories={categories}
                sorts={sorts}
                dishes={dishes}
                thecart={thecart}
                about={about}
                {...props}
              />
            )}
          />
          <Route
            path="/recipe/:id"
            render={(props) => {
              return (
                <Recipe
                  user={user}
                  me={me}
                  setMe={setMe}
                  categories={categories}
                  sorts={sorts}
                  thecart={thecart}
                  thefavorites={thefavorites}
                  {...props}
                />
              );
            }}
          />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/inschrijven" component={inschrijven} />
          <Route path="/verify/:id" component={Verify} />
          <Route path="/logout" component={logout} />
          <ProtectedRoute
            path="/user"
            render={(props) => (
              <User {...props} user={user} thecart={thecart} me={me} />
            )}
          />
          <ProtectedRoute
            path="/favorites"
            render={(props) => (
              <Favorites
                {...props}
                thecart={thecart}
                thefavorites={thefavorites}
                recipes={recipes}
                dishes={dishes}
                me={me}
                setMe={setMe}
              />
            )}
          />
          <ProtectedRoute
            path="/weekmenu"
            render={(props) => (
              <Weekmenu
                {...props}
                dishes={dishes}
                user={user}
                thecart={thecart} //  [ _id, _id, ... ]
                recipes={recipes}
                me={me}
                setMe={setMe}
              />
            )}
          />
          <Route
            path="/sorts/:id"
            render={(props) => {
              return (
                <Sorts
                  me={me}
                  thecart={thecart}
                  recipes={recipes}
                  categories={categories}
                  sorts={sorts}
                  {...props}
                />
              );
            }}
          />
          <Route
            path="/categories/:id"
            render={(props) => {
              return (
                <Categories
                  thecart={thecart}
                  recipes={recipes}
                  {...props}
                  categories={categories}
                />
              );
            }}
          />
          <Route
            path="/collections/:id"
            render={(props) => {
              return (
                <Collections
                  thecart={thecart}
                  dishes={dishes}
                  recipes={recipes}
                  {...props}
                />
              );
            }}
          />
          <Route
            path="/boodschappen"
            render={(props) => {
              return (
                <Boodschappen me={me} setMe={setMe} stock={stock} {...props} />
              );
            }}
          />
          <Route
            path="/voorraad"
            render={(props) => {
              return (
                <Voorraad me={me} setMe={setMe} stock={stock} {...props} />
              );
            }}
          />
          <Route
            path="/books"
            render={(props) => {
              return (
                <Books
                  me={me}
                  setMe={setMe}
                  books={books}
                  stock={stock}
                  {...props}
                />
              );
            }}
          />
          <Route
            path="/test/:id"
            render={(props) => (
              <Test {...props} dishes={dishes} recipes={recipes} />
            )}
          />
        </Switch>
        <footer className="">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default App;
