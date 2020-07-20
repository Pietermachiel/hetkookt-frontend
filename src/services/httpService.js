import React from "react";
import axios from "axios"; // the only place we call axios, so here modify if change do different module
import logger from "./logService";
import { toast, ToastContainer } from "react-toastify";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast("Sorry, geen verbinding.", {
      position: toast.POSITION.BOTTOM_RIGHT,
      hideProgressBar: false,
      autoClose: false,
      // bounce: false,
      // newestOnTop: true,
      closeOnClick: true,
      // draggable: false,
      // rtl: false,
    });
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt, // gebruikt in authService
};
