import http from "./httpService";
import { apiUrl } from "../config.json";
import axios from "axios";

// const apiUrl = "http://localhost:3900/api";

const apiEndpoint = apiUrl + "/recipes";
// const apiEndpoint = "/recipes";

function recipeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRecipes() {
  return http.get(apiEndpoint);
}

export function getRecipe(recipeId) {
  return http.get(recipeUrl(recipeId));
}

export async function createRecipe(recipe) {
  console.log("recipe");
  console.log(recipe);

  if (recipe._id) {
    const body = { ...recipe };
    console.log("body");
    console.log(body);
    delete body._id;
    return http.put(recipeUrl(recipe._id), body);
  }
  console.log("recipe2");
  console.log(recipe);
  await http.post(apiEndpoint, recipe);
}

export async function editRecipe(recipes, setRecipes, recipe) {
  console.log("editRecipe");
  console.log(recipe);
  console.log(recipes);

  var myRecipes = recipes.filter((f) => f._id !== recipe._id);
  console.log(myRecipes);
  await setRecipes(...myRecipes, recipe);

  await axios.put(`${apiUrl}/recipes/${recipe._id}`, recipe);
}

export async function deleteRecipe(recipes, setRecipes, recipeId) {
  const allRecipes = recipes.filter((f) => f._id !== recipeId);
  setRecipes(allRecipes);
  await http.delete(recipeUrl(recipeId));
}

// export async function deleteRecipe(me, setMe, id) {
//   var allMeItems = me.items.map((r) => r);
//   allMeItems = allMeItems.filter((f) => f._id !== id);
//   setMe({
//     _id: me._id,
//     name: me.name,
//     email: me.email,
//     items: allMeItems,
//     stock: me.stock,
//     extra: me.extra,
//   });
//   const body = { items: allMeItems };
//   await axios.put(`${apiUrl}/users/items/${me._id}`, body);
// }
