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
  if (user._id) {
    const body = { ...user };
    delete body._id;
    return http.put(userUrl(user._id), body);
  }

  return http.post(apiEndpoint, user);
}

export async function deleteUser(userId) {
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

export async function createItem(me, setMe, item) {
  await setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: [...me.items, item],
    groceries: me.groceries,
    stock: me.stock,
    extra: me.extra,
  });
  me.items.push(item);
  const thebody = { items: me.items };
  await axios.put(`${apiUrl}/users/items/${me._id}`, thebody);
}

export async function editItem(me, setMe, item) {
  me.items = me.items.filter((r) => r._id !== item._id);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: [...me.items, item],
    groceries: me.groceries,
    stock: me.stock,
    extra: me.extra,
  });
  me.items.push(item);
  const body = { items: me.items };
  await doSaveAxios(me._id, body);
}

function doSaveAxios(id, body) {
  return axios.put(`${apiUrl}/users/items/${id}`, body);
}

// delete item

export async function deleteItem(me, setMe, id) {
  var allMeItems = me.items.map((r) => r);
  allMeItems = allMeItems.filter((f) => f._id !== id);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: allMeItems,
    groceries: me.groceries,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { items: allMeItems };
  await axios.put(`${apiUrl}/users/items/${me._id}`, body);
}

// doPutMenu (items)

export async function doPutMenu(me, setMe, item, dedate) {
  me.items = me.items.filter((r) => r._id !== item._id);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: [...me.items],
    groceries: me.groceries,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { items: me.items };
  await putItems(me._id, body);
  // item.date = item.date || [];
  item.date.push({ name: dedate });
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: [...me.items, item],
    groceries: me.groceries,
    stock: me.stock,
    extra: me.extra,
  });
  me.items.push(item);
  const thebody = { items: me.items };
  await putItems(me._id, thebody);
}

function putItems(id, body) {
  return axios.put(`${apiUrl}/users/items/${id}`, body);
}

// deleteFromMenu

export async function deleteFromMenu(me, setMe, id, dayall) {
  var allMeItems = me.items.map((r) => r);
  var myItem = allMeItems.find((item) => item._id === id);
  myItem.date = myItem.date.filter((d) => d.name !== dayall);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: allMeItems,
    groceries: me.groceries,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { items: allMeItems };
  await updateItem(me._id, body);
}

function updateItem(id, body) {
  return axios.put(`${apiUrl}/users/items/${id}`, body);
}

// doPutGroceries (groceries)

export async function doPutGroceries(me, setMe, grocery) {
  me.groceries = me.groceries.filter((r) => r._id !== grocery._id);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: [...me.items],
    groceries: [...me.groceries, grocery],
    stock: me.stock,
    extra: me.extra,
  });
  me.groceries.push(grocery);
  const thebody = { groceries: me.groceries };
  await putGroceries(me._id, thebody);
}

function putGroceries(id, body) {
  return axios.put(`${apiUrl}/users/groceries/${id}`, body);
}

// deleteFromGroceries

export async function deleteFromGroceries(me, setMe, id) {
  var allMeGroceries = me.groceries.filter((g) => g._id !== id);
  // var allMeItems = me.items.map((r) => r);
  // var myItem = allMeItems.find((item) => item._id === id);
  // myItem.date = myItem.date.filter((d) => d.name !== dayall);
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: me.items,
    groceries: allMeGroceries,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { groceries: allMeGroceries };
  await updateGroceries(me._id, body);
}

function updateGroceries(id, body) {
  return axios.put(`${apiUrl}/users/groceries/${id}`, body);
}
//tot hier

// toggle fresh grocery

export async function toggleFreshGrocery(me, setMe, id, freshgrocery) {
  var allMeGroceries = me.groceries.map((r) => r);
  var myGrocery = allMeGroceries.find((g) => g._id === id);
  var donotbuy = myGrocery.fresh.find((e) => e.ingredient === freshgrocery);
  donotbuy.to_buy = !donotbuy.to_buy;
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    recipes: me.recipes,
    items: me.items,
    groceries: allMeGroceries,
    favorites: me.favorites,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { groceries: allMeGroceries };
  await axios.put(`${apiUrl}/users/groceries/${me._id}`, body);
}

// toggle fresh item

export async function toggleFresh(me, setMe, id, freshgrocery) {
  var allMeItems = me.items.map((r) => r);
  var myItem = allMeItems.find((item) => item._id === id);
  var donotbuy = myItem.fresh.find((e) => e.ingredient === freshgrocery);
  donotbuy.to_buy = !donotbuy.to_buy;
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    recipes: me.recipes,
    items: allMeItems,
    groceries: me.groceries,
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
    groceries: me.groceries,
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
    groceries: me.groceries,
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
    groceries: me.groceries,
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
    groceries: me.groceries,
    extra: newItems,
  });
  const body = { extra: newItems };
  await axios.put(`${apiUrl}/users/extra/${me._id}`, body);
}

// groceries

export async function deleteGroceries(me, setMe, title) {
  let allGroceries = me.groceries.map((r) => r);
  allGroceries = allGroceries.filter((element) => {
    let fresh = element.fresh.some(({ ingredient }) => ingredient === title);
    return fresh;
  });
  allGroceries = allGroceries.map((grocery) => {
    var donotbuy = grocery.fresh.find((e) => e.ingredient === title);
    console.log(donotbuy);
    donotbuy.to_buy = !donotbuy.to_buy;
    console.log(donotbuy);
    return grocery;
  });
  setMe({
    _id: me._id,
    name: me.name,
    email: me.email,
    items: me.items,
    groceries: me.groceries,
    recipes: me.recipes,
    favorites: me.favorites,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { groceries: me.groceries };
  await axios.put(`${apiUrl}/users/items/${me._id}`, body);
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
    groceries: me.groceries,
    recipes: me.recipes,
    favorites: me.favorites,
    stock: me.stock,
    extra: me.extra,
  });
  const body = { items: me.items };
  await axios.put(`${apiUrl}/users/items/${me._id}`, body);
}
