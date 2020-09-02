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

export async function deleteUser(userId) {
  console.log("userId");
  console.log(userId);
  await axios.delete(`${apiEndpoint}/${userId}`);
  // return http.delete(userUrl(userId));
}

export function verifyUser(token) {
  console.log("token");
  console.log(token);
  return http.put(userTokenUrl(token));
}

// USER items/stock/extra

// createRecipe (Item > NieuwItem en Recipes > Recipe)

export async function createRecipe(me, setMe, item) {
  console.log("create recipe");

  await setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: [...me.items, item],
    stock: me.stock,
    extra: me.extra,
  });
  me.items.push(item);
  console.log("create me.items");
  console.log(me.items);
  const thebody = { items: me.items };
  console.log("thebody");
  console.log(thebody);

  await axios.put(`${apiUrl}/users/items/${me._id}`, thebody);
}

export async function doSave(me, setMe, item) {
  console.log("edit recipe");
  console.log(item);
  console.log(me.items);
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
  console.log("edit me.items");
  console.log(me.items);
  const body = { items: me.items };
  await doSaveAxios(me._id, body);
}

function doSaveAxios(id, body) {
  return axios.put(`${apiUrl}/users/items/${id}`, body);
}

// delete recipe

export async function deleteRecipe(me, setMe, id) {
  var allMeItems = me.items.map((r) => r);
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
  await axios.put(`${apiUrl}/users/items/${me._id}`, body);
}

// doPutMenu

export async function doPutMenu(me, setMe, item, dedate) {
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
  await putAxios(me._id, body);
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
  await putAxios(me._id, thebody);
}

function putAxios(id, body) {
  return axios.put(`${apiUrl}/users/items/${id}`, body);
}

// deleteFromMenu

export async function deleteFromMenu(me, setMe, id, dayall) {
  console.log("deleteFromMenu");
  var allMeItems = me.items.map((r) => r);
  var myItem = allMeItems.find((item) => item._id === id);
  myItem.date = myItem.date.filter((d) => d.name !== dayall);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: allMeItems,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { items: allMeItems };
  await updateAxios(me._id, body);
}

function updateAxios(id, body) {
  return axios.put(`${apiUrl}/users/items/${id}`, body);
}

// fresh

export async function toggleFresh(me, setMe, id, freshitem) {
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
  await axios.put(`${apiUrl}/users/items/${me._id}`, body);
}

// stock
export async function toggleStock(me, setMe, item) {
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
  await axios.put(`${apiUrl}/users/stock/${me._id}`, body);
}

export async function removeStock(me, setMe, item) {
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
  await axios.put(`${apiUrl}/users/stock/${me._id}`, body);
}

// extra

export async function toggleExtra(me, setMe, item) {
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
  await axios.put(`${apiUrl}/users/extra/${me._id}`, body);
}

export async function removeExtra(me, setMe, item) {
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
  await axios.put(`${apiUrl}/users/extra/${me._id}`, body);
}

// boodschappen

export async function deleteBoodschappen(me, setMe, title) {
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
  await axios.put(`${apiUrl}/users/items/${me._id}`, body);
}
