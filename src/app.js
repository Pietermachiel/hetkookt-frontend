import React, { Fragment, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import auth from "./services/authService";
import http from "./services/httpService";
import Login from "./components/login";
import Register from "./components/register";
import inschrijven from "./components/inschrijven";
import Verify from "./components/verify";
import logout from "./components/logout";
import Welkom from "./components/welkom";
import Test from "./components/Test";
import Home from "./components/Home";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipes/Recipe";
import NewRecipe from "./components/Recipes/NewRecipe";
import EditRecipe from "./components/Recipes/EditRecipe";
import Sorts from "./components/Sorts";
import CategoriesItems from "./components/Categories/CategoriesItems";
import Categories from "./components/Categories";
import CollectionsItems from "./components/Collections/CollectionsItems";
import Collections from "./components/Collections";
import Items from "./components/Items";
import Item from "./components/Items/item";
import NieuwItem from "./components/Items/NieuwItem";
import EditItem from "./components/Items/EditItem";
import Boodschappen from "./components/Boodschappen";
import Voorraad from "./components/Voorraad";
import Books from "./components/Books";
import Book from "./components/Books/Book";
import Weekmenu from "./components/Weekmenu";
import User from "./components/User";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/common/protectedRoute";
import { apiUrl, recipeUrl } from "./config.json";
import LogoBox from "./components/LogoBox";
import { slugify } from "./components/common/common.js";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  // const [sorts, setSorts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dish, setDish] = useState([]);
  const [stock, setStock] = useState([]);
  const [user, setUser] = useState([]);
  const [me, setMe] = useState([]);
  // const [about, setAbout] = useState([]);
  const [kitchens, setKitchens] = useState([]);
  const [books, setBooks] = useState([]);
  const [tags, setTags] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCatOpen, setCatOpen] = useState(false);
  const [isColOpen, setColOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const results = recipes.filter((recipe) => {
      const lowercaserecipe = recipe.title.toLowerCase();
      return lowercaserecipe.indexOf(searchTerm) !== -1;
    });
    setSearchResults(results);
  }, [searchTerm, recipes]);

  const handleChange = (e) => {
    const searchterm = e.target.value.toLowerCase();
    setSearchTerm(searchterm);
    setSearch(true);
  };

  const handleClick = (e) => {
    setSearchTerm(e);
    setSearch(false);
    toggleSwitch();
    setIsOpen(!isOpen);
  };

  // menu
  const handleIsOpen = (e) => {
    setSearchTerm([]);
    setSearch(false);
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
  // console.log("dish");
  // console.log(dish);
  // console.log("user");
  // console.log(user);
  // console.log("me");
  // console.log(me);
  // console.log(stock);
  // console.log("books");
  // console.log(books);
  // console.log("tags");
  // console.log(tags);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${apiUrl}/recipes`);
      res.json().then((res) => setRecipes(res));
    }
    getData();
  }, []);

  // useEffect(() => {
  //   async function getData() {
  //     const res = await fetch(`${recipeUrl}/sorts.json`);
  //     res.json().then((res) => setSorts(res));
  //   }
  //   getData();
  // }, []);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${apiUrl}/categories`);
      res.json().then((res) => setCategories(res));
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${apiUrl}/dishes`);
      res.json().then((res) => setDish(res));
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

  // users me

  async function getUsersMe() {
    if (!auth.getCurrentUser()) return;
    const res = await http.get(`${apiUrl}/users/me`);
    const me = await res.data;
    setMe(me);
  }

  useEffect(() => {
    getUsersMe();
  }, []);

  // useEffect(() => {
  //   async function getData() {
  //     const res = await fetch(`${recipeUrl}/about.json`);
  //     res.json().then((res) => setAbout(res));
  //   }
  //   getData();
  // }, []);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${apiUrl}/kitchens`);
      res.json().then((res) => setKitchens(res));
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${apiUrl}/books`);
      res.json().then((res) => setBooks(res));
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${apiUrl}/tags`);
      res.json().then((res) => setTags(res));
    }
    getData();
  }, []);

  // tags = _.orderBy(tags, ["title"]); // Use Lodash to sort array by 'name'
  // books = _.orderBy(books, ["year", "title"], ["desc"]); // Use Lodash to sort array by 'name'
  // books = _.orderBy(books, ["_id"]); // Use Lodash to sort array by 'name'

  // console.log("recipes");
  // console.log(recipes);

  var thecart = me.items;
  if (thecart === undefined) thecart = [];

  return (
    <Fragment>
      <ToastContainer
        className="mytoaststyle"
        position={toast.POSITION.BOTTOM_RIGHT}
        hideProgressBar={false}
        autoClose={false}
        // bounce: false,
        // newestOnTop: true,
        closeOnClick={true}
        // draggable: false,
        // rtl: false,
        // position="bottom-right"
        // hideProgressBar={false}
        // autoClose={false}
        // newestOnTop={true}
        // closeOnClick={false}
        // draggable={false}
        // rtl={false}
      />
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
            dish={dish}
          />
        </header>
        <LogoBox me={me} user={user} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home user={user} recipes={recipes} {...props} />
            )}
          />
          <ProtectedRoute
            exact
            path="/recipes"
            render={(props) => {
              return (
                <Recipes
                  recipes={recipes}
                  setRecipes={setRecipes}
                  books={books}
                  {...props}
                />
              );
            }}
          />
          <Route
            path="/recipes/:id"
            render={(props) => {
              return (
                <Recipe
                  user={user}
                  me={me}
                  setMe={setMe}
                  categories={categories}
                  tags={tags}
                  thecart={thecart}
                  {...props}
                />
              );
            }}
          />
          <Route
            path="/nieuwrecept"
            render={(props) => {
              return (
                <NewRecipe
                  me={me}
                  setMe={setMe}
                  dish={dish}
                  tags={tags}
                  books={books}
                />
              );
            }}
          />
          <Route
            path="/editrecipe/:id"
            render={(props) => {
              if (recipes === undefined) return [];
              const therecipe = recipes.find(
                (i) => slugify(i._id) === props.location.state
              );
              if (therecipe === undefined) return [];

              return (
                <EditRecipe
                  me={me}
                  setMe={setMe}
                  tags={tags}
                  dish={dish}
                  books={books}
                  recipes={recipes}
                  therecipe={therecipe}
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
                dish={dish}
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
                tags={tags}
                dish={dish}
                user={user}
                me={me}
                setMe={setMe}
              />
            )}
          />
          <Route
            path="/nieuwitem"
            render={(props) => {
              return (
                <NieuwItem
                  tags={tags}
                  dish={dish}
                  me={me}
                  setMe={setMe}
                  {...props}
                />
              );
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
                  tags={tags}
                  dish={dish}
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
                dish={dish}
                user={user}
                thecart={thecart}
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
                  tags={tags}
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
                  me={me}
                  setMe={setMe}
                  thecart={thecart}
                  tags={tags}
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
                  dish={dish}
                  tags={tags}
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
                  dish={dish}
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
              return <Books kitchens={kitchens} books={books} {...props} />;
            }}
          />
          <Route
            path="/books/:id"
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
    </Fragment>
  );
};

export default App;
