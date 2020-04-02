import http from "./httpService";

const apiUrl = "http://localhost:5000/api";

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

export function saveRecipe(recipe) {
  console.log("recipe");
  console.log(recipe);
  if (recipe._id) {
    const body = { ...recipe };
    delete body._id;
    return http.put(recipeUrl(recipe._id), body);
  }

  return http.post(apiEndpoint, recipe);
}

export function deleteRecipe(recipeId) {
  return http.delete(recipeUrl(recipeId));
}
