import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import inschrijven from "./components/inschrijven";
import Verify from "./components/verify";
import logout from "./components/logout";
import Welkom from "./components/welkom";
import Test from "./components/Test";
import Home from "./components/Home";
import Recipe from "./components/Recipes/Recipe";
import Sorts from "./components/Sorts";
import CategoriesItems from "./components/Categories/CategoriesItems";
import Categories from "./components/Categories";
import CollectionsItems from "./components/Collections/CollectionsItems";
import Collections from "./components/Collections";
import Items from "./components/Items";
import Item from "./components/Item";
import NieuwItem from "./components/Item/NieuwItem";
import EditItem from "./components/Item/EditItem";
import Boodschappen from "./components/Boodschappen";
import Voorraad from "./components/Voorraad";
import Books from "./components/Books";
import Book from "./components/Books/Book";
import Weekmenu from "./components/Weekmenu";
import User from "./components/User";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import axios from "axios";
import { apiUrl, recipeUrl } from "./config.json";
import LogoBox from "./components/LogoBox";
import { slugify } from "./components/common/common.js";
import _ from "lodash";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [sorts, setSorts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [stock, setStock] = useState([]);
  const [user, setUser] = useState([]);
  const [me, setMe] = useState([]);
  const [about, setAbout] = useState([]);
  let [books, setBooks] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCatOpen, setCatOpen] = useState(false);
  const [isColOpen, setColOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState(false);
  // search

  useEffect(() => {
    const results = recipes.filter((recipe) => {
      const lowercaserecipe = recipe.title.toLowerCase();
      return lowercaserecipe.indexOf(searchTerm) !== -1;
    });
    setSearchResults(results);
  }, [searchTerm, recipes]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setSearch(true);
    // console.log("search");
  };

  const handleClick = (e) => {
    // console.log("handleClick");
    // console.log(e);
    setSearchTerm(e);
    // setSearchResults([]);
    setSearch(false);
    toggleSwitch();
    setIsOpen(!isOpen);
  };

  // menu
  const handleIsOpen = (e) => {
    // toggleMenu();
    toggleSwitch();
    setIsOpen(!isOpen);
    e.stopPropagation();
  };

  // categories
  const handleCatOpen = () => {
    toggleSwitch();
    setIsOpen(!isOpen);
    setCatOpen(!isCatOpen);
  };

  // collections
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
  console.log("books");
  console.log(books);

  books = _.orderBy(books, ["year"], ["desc"]); // Use Lodash to sort array by 'name'

  console.log("books2");
  console.log(books);

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

  async function getUsersMe() {
    if (!auth.getCurrentUser()) return;
    const res = await axios.get(`${apiUrl}/users/me`);
    const me = await res.data;
    setMe(me);
  }

  useEffect(() => {
    getUsersMe();
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

  var thecart = me.items;
  if (thecart === undefined) thecart = [];

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
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            search={search}
            setSearch={setSearch}
            handleChange={handleChange}
            handleClick={handleClick}
            searchTerm={searchTerm}
            me={me}
            user={user}
            recipes={recipes}
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
                recipes={recipes}
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
                  {...props}
                />
              );
            }}
          />
          <Route path="/login" component={Login} />
          {/* <Route path="/Login" component={Login} /> */}
          <Route path="/register" component={Register} />
          <Route path="/inschrijven" component={inschrijven} />
          <Route path="/verify/:id" component={Verify} />
          <Route path="/logout" component={logout} />
          <ProtectedRoute
            path="/user"
            // component={User}
            render={(props) => {
              return <User me={me} user={user} thecart={thecart} {...props} />;
            }}
          />
          <ProtectedRoute
            exact
            path="/kookschrift"
            render={(props) => (
              <Items
                {...props}
                thecart={thecart}
                recipes={recipes}
                dishes={dishes}
                me={me}
                setMe={setMe}
              />
            )}
          />
          <Route
            path="/kookschrift/:id"
            render={(props) => (
              <Item
                {...props}
                recipes={recipes}
                sorts={sorts}
                dishes={dishes}
                user={user}
                me={me}
                setMe={setMe}
              />
            )}
          />
          <Route
            path="/nieuwrecept"
            render={(props) => {
              return <NieuwItem me={me} setMe={setMe} {...props} />;
            }}
          />
          <Route
            path="/edit/:id"
            render={(props) => {
              if (me.items === undefined) return [];
              const therecipe = me.items.find(
                (i) => slugify(i.title) === props.match.params.id
              );
              if (therecipe === undefined) return [];

              return (
                <EditItem
                  me={me}
                  setMe={setMe}
                  therecipe={therecipe}
                  {...props}
                />
              );
            }}
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
                  user={user}
                  recipes={recipes}
                  categories={categories}
                  sorts={sorts}
                  {...props}
                />
              );
            }}
          />
          <Route
            exact
            path="/categories"
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
            path="/categories/:id"
            render={(props) => {
              return (
                <CategoriesItems
                  thecart={thecart}
                  recipes={recipes}
                  {...props}
                  categories={categories}
                />
              );
            }}
          />
          <Route
            exact
            path="/collections"
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
            path="/collections/:id"
            render={(props) => {
              return (
                <CollectionsItems
                  me={me}
                  setMe={setMe}
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
                <Voorraad
                  me={me}
                  setMe={setMe}
                  recipes={recipes}
                  stock={stock}
                  {...props}
                />
              );
            }}
          />
          <Route
            exact
            path="/books"
            render={(props) => {
              return <Books books={books} {...props} />;
            }}
          />
          <Route
            path="/book/:id"
            render={(props) => {
              return <Book books={books} recipes={recipes} {...props} />;
            }}
          />
          <Route
            path="/welkom"
            render={(props) => <Welkom user={user} {...props} />}
          />
          <Route
            path="/test"
            render={(props) => (
              <Test user={user} recipes={recipes} {...props} />
            )}
          />
        </Switch>
      </div>{" "}
      <footer className="">
        <Footer />
      </footer>
    </>
  );
};

export default App;
