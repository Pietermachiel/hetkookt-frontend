import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiUrl = "http://localhost:5000/api";

const apiEndpoint = apiUrl + "/users";

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name
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
