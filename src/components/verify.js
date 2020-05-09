import React, { useEffect } from "react";
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
      <div className="login-box__inner mt-24">
        <h3 className="">De inschrijving is voltooid.</h3>
        <br />
        <p>
          Je kunt nu inloggen.
          <a href="/">
            <button className="button-blue">Login</button>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Verify;
