import http from "./httpService";
import { apiUrl } from "../config.json";
import axios from "axios";

const apiEndpoint = apiUrl + "/users";

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

function userTokenUrl(token) {
  return `${apiEndpoint}/verify/${token}`;
}

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}

export function saveUser(user) {
  console.log("user");
  console.log(user);
  if (user._id) {
    const body = { ...user };
    delete body._id;
    return http.put(userUrl(user._id), body);
  }

  return http.post(apiEndpoint, user);
}

export function deleteUser(userId) {
  console.log("userId");
  console.log(userId);
  return http.delete(userUrl(userId));
}

export function verifyUser(token) {
  console.log("token");
  console.log(token);
  return http.put(userTokenUrl(token));
}

export function doFavorite(me, setMe, recipeId) {
  console.log("zet in favorieten");
  const newrecipeId = me.favorites.find((r) => r === recipeId);
  if (newrecipeId === recipeId) return;
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    recipes: me.recipes,
    favorites: [...me.favorites, recipeId],
    stock: me.stock,
    extra: me.extra,
  });
  me.favorites.push(recipeId);
  const body = { favorites: me.favorites };
  return axios.put(`${apiUrl}/users/favorites/${me._id}`, body);
}

export function handleDeleteFavorite(me, setMe, recipeId) {
  console.log("handleDeleteFavorite");
  var allMeFavorites = me.favorites.map((r) => r);
  console.log(allMeFavorites);
  var myFavorite = allMeFavorites.filter((item) => item !== recipeId);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    recipes: me.recipes,
    favorites: myFavorite,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { favorites: myFavorite };
  return axios.put(`${apiUrl}/users/favorites/${me._id}`, body);
}

export function doSave(me, setMe, recipe, dedate) {
  me.recipes = me.recipes.filter((r) => r._id !== recipe._id);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    favorites: me.favorites,
    recipes: [...me.recipes],
    stock: me.stock,
    extra: me.extra,
  });
  const thebody = { recipes: me.recipes };
  putAxios(me._id, thebody);
  recipe.date = recipe.date || [];
  console.log("recipe.date");
  console.log(recipe.date);
  console.log(dedate);
  recipe.date.push(dedate);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    favorites: me.favorites,
    recipes: [...me.recipes, recipe],
    stock: me.stock,
    extra: me.extra,
  });
  me.recipes.push(recipe);
  const body = { recipes: me.recipes };
  putAxios(me._id, body);
}

function putAxios(id, body) {
  return axios.put(`${apiUrl}/users/recipes/${id}`, body);
}

export function handleDelete(me, setMe, id, year) {
  var allMeRecipes = me.recipes.map((r) => r);
  var allMeFavorites = me.favorites.map((f) => f);
  var myRecipe = allMeRecipes.find((item) => item._id === id);
  myRecipe.date = myRecipe.date.filter((d) => d !== year);
  if (myRecipe.date.length === 0)
    allMeRecipes = allMeRecipes.filter((f) => f._id !== id);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    favorites: allMeFavorites,
    recipes: allMeRecipes,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { recipes: allMeRecipes };
  updateAxios(me._id, body);
}

function updateAxios(id, body) {
  return axios.put(`${apiUrl}/users/recipes/${id}`, body);
}

export function deleteFresh(me, setMe, id, freshitem) {
  console.log("deleteFresh");
  console.log(freshitem);
  var allMeRecipes = me.recipes.map((r) => r);
  var myRecipe = allMeRecipes.find((item) => item._id === id);
  console.log(myRecipe);
  var donotbuy = myRecipe.fresh.find((e) => e.item === freshitem);
  donotbuy.to_buy = !donotbuy.to_buy;
  console.log(donotbuy);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    recipes: allMeRecipes,
    favorites: me.favorites,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { recipes: allMeRecipes };
  return axios.put(`${apiUrl}/users/recipes/${me._id}`, body);
}

export function toggleStock(me, setMe, item) {
  console.log(item);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    favorites: me.favorites,
    stock: [...me.stock, item],
    recipes: me.recipes,
    extra: me.extra,
  });
  me.stock.push(item);
  const body = { stock: me.stock };
  return axios.put(`${apiUrl}/users/stock/${me._id}`, body);
}

export function removeStock(me, setMe, item) {
  let allItems = me.stock.map((s) => s);
  let newItems = allItems.filter((a) => a !== item);
  console.log(allItems);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    favorites: me.favorites,
    stock: newItems,
    recipes: me.recipes,
    extra: me.extra,
  });
  const body = { stock: newItems };
  return axios.put(`${apiUrl}/users/stock/${me._id}`, body);
}

export function toggleExtra(me, setMe, item) {
  console.log(item);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    favorites: me.favorites,
    extra: [...me.extra, item],
    recipes: me.recipes,
    stock: me.stock,
  });
  me.extra.push(item);
  const body = { extra: me.extra };
  return axios.put(`${apiUrl}/users/extra/${me._id}`, body);
}

export function removeExtra(me, setMe, item) {
  console.log("item");
  console.log(item);
  let allItems = me.extra.map((s) => s);
  let newItems = allItems.filter((a) => a !== item);
  console.log(allItems);
  console.log(newItems);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    favorites: me.favorites,
    stock: me.stock,
    recipes: me.recipes,
    extra: newItems,
  });
  const body = { stock: newItems };
  return axios.put(`${apiUrl}/users/extra/${me._id}`, body);
}

export function deleteBoodschappen(me, setMe, title) {
  console.log("deleteBoodschappen");
  console.log(title);
  let allRecipes = me.recipes.map((r) => r);
  allRecipes = allRecipes.filter((element) => {
    let fresh = element.fresh.some(({ item }) => item === title);
    return fresh;
  });
  console.log("allRecipes");
  console.log(allRecipes);
  allRecipes = allRecipes.map((recipe) => {
    var donotbuy = recipe.fresh.find((e) => e.item === title);
    console.log(donotbuy);
    donotbuy.to_buy = !donotbuy.to_buy;
    console.log(donotbuy);
    return recipe;
  });
  console.log("allRecipes after");
  console.log(allRecipes);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    recipes: me.recipes,
    favorites: me.favorites,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { recipes: me.recipes };
  return axios.put(`${apiUrl}/users/recipes/${me._id}`, body);
}
