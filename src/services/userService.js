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

function putAxios(id, body) {
  return axios.put(`${apiUrl}/users/favorites/${id}`, body);
}

export function doFavorite(me, setMe, recipeId) {
  const newrecipeId = me.favorites.find((r) => r === recipeId);
  if (newrecipeId === recipeId) return;
  // me.recipes = me.recipes.filter((r) => r !== recipe._id);
  // setMe({
  //   _id: me._id,
  //   name: me.name,
  //   email: me.email,
  //   recipes: [...me.recipes],
  // });
  // const thebody = { recipes: me.recipes };
  // putAxios(me._id, thebody);
  // recipeId = newrecipeId || recipeId;
  // if (recipe.favorite === true) return;
  // recipe.favorite = !recipe.favorite;
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    favorites: [...me.favorites, recipeId],
  });
  me.favorites.push(recipeId);
  const body = { favorites: me.favorites };
  putAxios(me._id, body);
}

export function handleDeleteFavorite(me, setMe, id) {
  console.log("handleDeleteFavorite");
  var allMeFavorites = me.favorites.map((r) => r);
  // console.log("allMeFavorites1");
  console.log(allMeFavorites);
  var myFavorite = allMeFavorites.filter((item) => item !== id);
  // myFavorite.favorite = !myFavorite.favorite;
  // myFavorite.isOpen = !myFavorite.isOpen;
  // allMeRecipes =
  //   myFavorite.date === null
  //     ? allMeRecipes.filter((item) => item._id !== id)
  //     : [];
  // console.log("allMeRecipes2");
  // console.log(allMeRecipes);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    favorites: myFavorite,
  });
  const body = { favorites: myFavorite };
  return axios.put(`${apiUrl}/users/favminus/${me._id}`, body);
}
