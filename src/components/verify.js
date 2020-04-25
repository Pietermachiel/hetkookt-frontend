import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { apiUrl } from "../config.json";
import axios from "axios";
import { verifyUser } from "../services/userService";

const Verify = (props) => {
  // const API = props.match.url;
  // console.log("props.match.url");
  // console.log(props.match.url);

  console.log(props);
  console.log(props.match.params.id);

  useEffect(() => {
    verifyUser(props.match.params.id);
  });

  return (
    <div className="constainer-x">
      <div className="login-box__inner">
        <p className="font-700">De inschrijving is voltooid.</p>
        <p>
          Je kunt nu inloggen. <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Verify;
