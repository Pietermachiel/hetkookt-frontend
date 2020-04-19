import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
// import { AnimatedSwitch } from "react-router-transition";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import logout from "./components/logout";
import Test from "./components/Test";
import Home from "./components/Home";
import RecipesApi from "./components/RecipesApi";
// import RecipeForm from "./components/RecipesApi/recipeForm_hooks";
import Recipe from "./components/Recipe";
import Sorts from "./components/Sorts";
import Categories from "./components/Categories";
import Collections from "./components/Collections";
import Favorites from "./components/Favorites";
import Weekmenu from "./components/Weekmenu";
import User from "./components/User";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import axios from "axios";
import { slugify } from "./components/common/common";
import _ from "lodash";
import { apiUrl } from "./config.json";

// http://maisano.github.io/react-router-transition/

// const API = "http://localhost:3900/api";
// const API = "http://localhost:5000/api";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [sorts, setSorts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [user, setUser] = useState([]);
  const [me, setMe] = useState([]);

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

  // const [inProp, setInProp] = useState(true);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`https://hetkookt.roozen.nl/api/recipes.json`);
      res.json().then((res) => setRecipes(res));
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`https://hetkookt.roozen.nl/api/sorts.json`);
      res.json().then((res) => setSorts(res));
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`https://hetkookt.roozen.nl/api/categories.json`);
      res.json().then((res) => setCategories(res));
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`https://hetkookt.roozen.nl/api/dishes.json`);
      res.json().then((res) => setDishes(res));
    }
    getData();
  }, []);

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
    // console.log("user");
    // console.log(user);
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

  // console.log("dishes");
  // console.log(dishes);

  // thecart = all me.recipes ({_id, title, author})

  var thecart = me.recipes;
  if (thecart === undefined) thecart = [];

  function doSave(recipe, dedate) {
    // if (me.recipes.find(r => r._id === recipe._id)) return;
    console.log("recipe");
    console.log(recipe);
    // if (recipe.date.includes(dedate)) return;
    const newrecipe = me.recipes.find((r) => r._id === recipe._id);
    me.recipes = me.recipes.filter((r) => r._id !== recipe._id);
    setMe({
      _id: me._id,
      name: me.name,
      email: me.email,
      recipes: [...me.recipes],
    });
    const thebody = { recipes: me.recipes };
    putAxios(me._id, thebody);
    // recipe = newrecipe || recipe;
    recipe.date = recipe.date || [];
    // console.log("recipe.date");
    // console.log(recipe.date);
    // console.log(dedate);
    recipe.date.push(dedate);
    setMe({
      _id: me._id,
      name: me.name,
      email: me.email,
      recipes: [...me.recipes, recipe],
    });
    // console.log("me.recipes1");
    // console.log(me.recipes);
    me.recipes.push(recipe);
    // console.log("me.recipes2");
    // console.log(me.recipes);
    const body = { recipes: me.recipes };
    putAxios(me._id, body);
  }

  function putAxios(id, body) {
    return axios.put(`${apiUrl}/users/favorites/${id}`, body);
  }

  function doFavorite(recipe) {
    const newrecipe = me.recipes.find((r) => r._id === recipe._id);
    me.recipes = me.recipes.filter((r) => r._id !== recipe._id);
    setMe({
      _id: me._id,
      name: me.name,
      email: me.email,
      recipes: [...me.recipes],
    });
    const thebody = { recipes: me.recipes };
    putAxios(me._id, thebody);
    recipe = newrecipe || recipe;
    // if (recipe.favorite === true) return;
    recipe.favorite = !recipe.favorite;
    setMe({
      _id: me._id,
      name: me.name,
      email: me.email,
      recipes: [...me.recipes, recipe],
    });
    me.recipes.push(recipe);
    const body = { recipes: me.recipes };
    putAxios(me._id, body);
  }

  function handleDeleteFavorite(id) {
    console.log("handleDeleteFavorite");
    var allMeRecipes = me.recipes.map((r) => r);
    console.log("allMeRecipes1");
    console.log(allMeRecipes);
    var myRecipe = allMeRecipes.find((item) => item._id === id);
    myRecipe.favorite = !myRecipe.favorite;
    // myRecipe.isOpen = !myRecipe.isOpen;
    allMeRecipes =
      myRecipe.date === null
        ? allMeRecipes.filter((item) => item._id !== id)
        : [];
    console.log("allMeRecipes2");
    console.log(allMeRecipes);
    setMe({
      _id: me._id,
      name: me.name,
      email: me.email,
      recipes: allMeRecipes,
    });
    const body = { recipes: allMeRecipes };
    return axios.put(`${apiUrl}/users/favminus/${me._id}`, body);
  }

  function handleDelete(id, year) {
    var allMeRecipes = me.recipes.map((r) => r);
    var myRecipe = allMeRecipes.filter((item) => item._id === id);
    console.log("myRecipe.date");
    console.log(myRecipe[0].date, year);
    console.log("filter");
    myRecipe[0].date = myRecipe[0].date.filter((d) => d !== year);
    // myRecipe[0] = myRecipe[0].date.splice(myRecipe[0].date.indexOf(year), 1);
    console.log("myRecipe.date2");
    console.log(myRecipe[0], year);
    // allMeRecipes = allMeRecipes.filter(item => item._id !== id);
    // console.log("allMeRecipes");
    // console.log(allMeRecipes, year);

    // myRecipe[0].isOpen = !myRecipe[0].isOpen;
    console.log("allMeRecipes");
    console.log(allMeRecipes);

    allMeRecipes =
      myRecipe[0].date.length === 0 && myRecipe[0].favorite === false
        ? allMeRecipes.filter((item) => item._id !== id)
        : allMeRecipes;

    console.log("allMeRecipes2");
    console.log(allMeRecipes);

    setMe({
      _id: me._id,
      name: me.name,
      email: me.email,
      recipes: allMeRecipes,
    });
    const body = { recipes: allMeRecipes };
    updateAxios(me._id, body);
    // console.log("myRecipe[0].favorite");
    // console.log(myRecipe[0].favorite);
    if (myRecipe[0].favorite === true) return;
    const allMeRecipes2 = allMeRecipes.filter((a) => a._id !== id);
    const body2 = { recipes: allMeRecipes2 };
    // console.log("allMeRecipes2");
    // console.log(allMeRecipes2);
    updateAxios(me._id, body2);
  }

  function updateAxios(id, body) {
    return axios.put(`${apiUrl}/users/favminus/${id}`, body);
  }

  function handleUpdate(id, year) {
    var allMeRecipes = me.recipes.map((r) => r);
    var myRecipe = allMeRecipes.filter((item) => item._id === id);
    console.log("myRecipe");
    console.log(myRecipe[0].date);
    const find = myRecipe[0].date.find((d) => d === year);
    console.log("find");
    console.log(find);
    myRecipe[0].isOpen = !myRecipe[0].isOpen;
    setMe({
      _id: me._id,
      name: me.name,
      email: me.email,
      recipes: allMeRecipes,
    });
  }

  return (
    <>
      <div className="content">
        <header>
          <Nav sorts={sorts} thecart={thecart} user={user} recipes={recipes} />
        </header>
        {/* <Search recipes={recipes} /> */}
        {/* <div className="container-switch"> */}
        {/* <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      > */}
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                recipes={recipes}
                dishes={dishes}
                doSave={doSave}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                // handleOpen={handleOpen}
                thecart={thecart}
              />
            )}
          />
          <Route
            path="/recipetable"
            render={(props) => (
              <RecipesApi {...props} recipes={recipes} user={user} />
            )}
          />
          <Route
            path="/recipe/:id"
            render={(props) => {
              // const recipe = recipes.find(
              //   r => slugify(r.title) === props.match.params.id
              // );
              return (
                <Recipe
                  user={user}
                  categories={categories}
                  thecart={thecart}
                  // {...recipe}
                  {...props}
                  doSave={doSave}
                  doFavorite={doFavorite}
                />
              );
            }}
          />
          {/* <Route
            path="/recipeform/:id"
            render={props => {
              const recipe = recipes.find(
                r => slugify(r.title) === props.match.params.id
              );
              return <RecipeForm {...recipe} {...props} recipes={recipes} />;
            }}
          /> */}
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
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
              <User
                {...props}
                user={user}
                thecart={thecart}
                me={me}
                handleDelete={handleDelete}
              />
            )}
          />
          <ProtectedRoute
            path="/favorites"
            render={(props) => (
              <Favorites
                {...props}
                handleDeleteFavorite={handleDeleteFavorite}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                thecart={thecart}
                recipes={recipes}
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
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
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
                  sorts={sorts}
                  categories={categories}
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
                  sorts={sorts}
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
        </Switch>
      </div>
      <footer className="">
        <Footer />
      </footer>
      {/* </AnimatedSwitch> */}
      {/* </div> */}
    </>
  );
};

export default App;
