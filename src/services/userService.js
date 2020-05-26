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
  });
  me.favorites.push(recipeId);
  const body = { favorites: me.favorites };
  return axios.put(`${apiUrl}/users/favorites/${me._id}`, body);
}

export function handleDeleteFavorite(me, setMe, id) {
  console.log("handleDeleteFavorite");
  var allMeFavorites = me.favorites.map((r) => r);
  console.log(allMeFavorites);
  var myFavorite = allMeFavorites.filter((item) => item !== id);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    recipes: me.recipes,
    favorites: myFavorite,
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
  });
  const body = { recipes: allMeRecipes };
  updateAxios(me._id, body);
}

function updateAxios(id, body) {
  return axios.put(`${apiUrl}/users/recipes/${id}`, body);
}
