import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import inschrijven from "./components/inschrijven";
import Verify from "./components/verify";
import logout from "./components/logout";
import Test from "./components/Test";
import Home from "./components/Home";
import Wat from "./components/Home/Wat";
import Hoe from "./components/Home/Hoe";
// import Waarom from "./components/Home/Waarom";
import Recipe from "./components/Recipe";
import Sorts from "./components/Sorts";
import Categories from "./components/Categories";
import Collections from "./components/Collections";
import Favorites from "./components/Favorites";
import Voorraad from "./components/Voorraad";
import Weekmenu from "./components/Weekmenu";
import User from "./components/User";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import axios from "axios";
import { apiUrl, recipeUrl } from "./config.json";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [sorts, setSorts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [stock, setStock] = useState([]);
  const [user, setUser] = useState([]);
  const [me, setMe] = useState([]);
  const [about, setAbout] = useState([]);

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

  var thecart = me.recipes;
  if (thecart === undefined) thecart = [];

  var thefavorites = me.favorites;
  if (thefavorites === undefined) thefavorites = [];

  return (
    <>
      <div className="content">
        <header>
          <Nav
            thecart={thecart}
            thefavorites={thefavorites}
            user={user}
            recipes={recipes}
            dishes={dishes}
            categories={categories}
          />
        </header>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                user={user}
                recipes={recipes}
                categories={categories}
                sorts={sorts}
                dishes={dishes}
                thecart={thecart}
                about={about}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                user={user}
                recipes={recipes}
                categories={categories}
                sorts={sorts}
                dishes={dishes}
                thecart={thecart}
                about={about}
              />
            )}
          />
          <Route
            exact
            path="/wat"
            render={(props) => (
              <Wat
                {...props}
                user={user}
                recipes={recipes}
                categories={categories}
                sorts={sorts}
                dishes={dishes}
                thecart={thecart}
                about={about}
              />
            )}
          />
          <Route
            exact
            path="/hoe"
            render={(props) => (
              <Hoe
                {...props}
                user={user}
                recipes={recipes}
                categories={categories}
                sorts={sorts}
                dishes={dishes}
                thecart={thecart}
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
          <Route
            path="/test"
            render={(props) => (
              <Test {...props} dishes={dishes} recipes={recipes} />
            )}
          />
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
            path="/voorraad"
            render={(props) => {
              return <Voorraad {...props} stock={stock} />;
            }}
          />
        </Switch>
      </div>
      <footer className="">
        <Footer />
      </footer>
    </>
  );
};

export default App;
