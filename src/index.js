import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "react-router-scroll-top";
// import "bootstrap/dist/css/bootstrap.css";
import "./assets/main.css";
import "./style.scss";
import * as ServiceWorker from "./serviceWorker";
import App from "./app";

if (process.env.NODE_ENV === "production") {
  document.title = "hetKookt";
} else {
  document.title = "hetKookt-frontend";
}

const app = (
  <BrowserRouter>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("app"));

ServiceWorker.register();
