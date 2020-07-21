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

// USER items/stock/extra

// createRecipe

export async function createRecipe(me, setMe, item) {
  console.log("create recipe");
  me.items = me.items.filter((r) => r._id !== item._id);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: [...me.items],
    stock: me.stock,
    extra: me.extra,
  });
  const body = { items: me.items };
  await putItemsAxios(me._id, body);

  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: [...me.items, item],
    stock: me.stock,
    extra: me.extra,
  });
  me.items.push(item);
  const thebody = { items: me.items };
  await putItemsAxios(me._id, thebody);
}

function putItemsAxios(id, body) {
  axios.put(`${apiUrl}/users/items/${id}`, body);
}

export function deleteRecipe(me, setMe, id) {
  var allMeItems = me.items.map((r) => r);
  var myItem = allMeItems.find((item) => item._id === id);
  allMeItems = allMeItems.filter((f) => f._id !== id);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: allMeItems,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { items: allMeItems };
  axios.put(`${apiUrl}/users/items/${me._id}`, body);
}

// doPutMenu

export function doPutMenu(me, setMe, item, dedate) {
  console.log("doPutMenu");
  me.items = me.items.filter((r) => r._id !== item._id);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: [...me.items],
    stock: me.stock,
    extra: me.extra,
  });
  const body = { items: me.items };
  putAxios(me._id, body);
  // item.date = item.date || [];
  item.date.push({ name: dedate });
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: [...me.items, item],
    stock: me.stock,
    extra: me.extra,
  });
  me.items.push(item);
  const thebody = { items: me.items };
  putAxios(me._id, thebody);
}

function putAxios(id, body) {
  return axios.put(`${apiUrl}/users/items/${id}`, body);
}

// deleteFromMenu

export function deleteFromMenu(me, setMe, id, year) {
  console.log("deleteFromMenu");
  var allMeItems = me.items.map((r) => r);
  var myItem = allMeItems.find((item) => item._id === id);
  myItem.date = myItem.date.filter((d) => d.name !== year);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: allMeItems,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { items: allMeItems };
  updateAxios(me._id, body);
}

function updateAxios(id, body) {
  return axios.put(`${apiUrl}/users/items/${id}`, body);
}

// export function doEditMenu(me, setMe, item) {
//   console.log("doEditMenu");
//   console.log(me);
//   console.log(item);
//   const allItems = me.items.filter((r) => r._id !== item._id);
//   const editItem = me.items.filter((e) => e._id === item._id);
//   console.log(allItems);
//   console.log("editItem");
//   console.log(editItem);
//   setMe({
//     _id: me._id,
//     name: me.name,
//     email: me.email,
//     items: allItems,
//     stock: me.stock,
//     extra: me.extra,
//   });
//   const body = { items: allItems };
//   putEditAxios(me._id, body);
//   setMe({
//     _id: me._id,
//     name: me.name,
//     email: me.email,
//     items: [...me.items, editItem],
//     stock: me.stock,
//     extra: me.extra,
//   });
//   allItems.push(editItem);
//   console.log("allItems2");
//   console.log(allItems);
//   const thebody = { items: allItems };
//   putEditAxios(me._id, thebody);
// }

// function putEditAxios(id, body) {
//   return axios.put(`${apiUrl}/users/items/${id}`, body);
// }

// TEST: doSave

export function doSave(me, setMe, item) {
  me.items = me.items.filter((r) => r._id !== item._id);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: [...me.items, item],
    stock: me.stock,
    extra: me.extra,
  });
  me.items.push(item);
  const body = { items: me.items };
  doSaveAxios(me._id, body);
}

function doSaveAxios(id, body) {
  return axios.put(`${apiUrl}/users/items/${id}`, body);
}

// fresh

export function toggleFresh(me, setMe, id, freshitem) {
  var allMeItems = me.items.map((r) => r);
  var myItem = allMeItems.find((item) => item._id === id);
  console.log(myItem);
  var donotbuy = myItem.fresh.find((e) => e.ingredient === freshitem);
  donotbuy.to_buy = !donotbuy.to_buy;
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    recipes: me.recipes,
    items: allMeItems,
    favorites: me.favorites,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { items: allMeItems };
  return axios.put(`${apiUrl}/users/items/${me._id}`, body);
}

// stock
export function toggleStock(me, setMe, item) {
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    stock: [...me.stock, item],
    items: me.items,
    extra: me.extra,
  });
  me.stock.push(item);
  const body = { stock: me.stock };
  return axios.put(`${apiUrl}/users/stock/${me._id}`, body);
}

export function removeStock(me, setMe, item) {
  let allItems = me.stock.map((s) => s);
  let newItems = allItems.filter((a) => a !== item);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    stock: newItems,
    items: me.items,
    extra: me.extra,
  });
  const body = { stock: newItems };
  return axios.put(`${apiUrl}/users/stock/${me._id}`, body);
}

// extra

export function toggleExtra(me, setMe, item) {
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    extra: [...me.extra, item],
    items: me.items,
    stock: me.stock,
  });
  me.extra.push(item);
  const body = { extra: me.extra };
  return axios.put(`${apiUrl}/users/extra/${me._id}`, body);
}

export function removeExtra(me, setMe, item) {
  let allItems = me.extra.map((s) => s);
  let newItems = allItems.filter((a) => a !== item);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    stock: me.stock,
    items: me.items,
    extra: newItems,
  });
  const body = { extra: newItems };
  return axios.put(`${apiUrl}/users/extra/${me._id}`, body);
}

// boodschappen

export function deleteBoodschappen(me, setMe, title) {
  let allItems = me.items.map((r) => r);
  allItems = allItems.filter((element) => {
    let fresh = element.fresh.some(({ ingredient }) => ingredient === title);
    return fresh;
  });
  allItems = allItems.map((item) => {
    var donotbuy = item.fresh.find((e) => e.ingredient === title);
    console.log(donotbuy);
    donotbuy.to_buy = !donotbuy.to_buy;
    console.log(donotbuy);
    return item;
  });
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: me.items,
    recipes: me.recipes,
    favorites: me.favorites,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { items: me.items };
  return axios.put(`${apiUrl}/users/items/${me._id}`, body);
}
