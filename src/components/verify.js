import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { verifyUser } from "../services/userService";

const Verify = (props) => {
  // const API = props.match.url;
  // console.log("props.match.url");
  // console.log(props.match.url);
  const history = useHistory();

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
        <p>Je kunt nu inloggen.</p> {/* <Link to="/login"> */}
        <button
          onClick={() => {
            history.push("/login");
            window.location.reload();
          }}
          className="bg-indigo-500 text-16 p-16 px-30 mt-18 align-bottom text-white uppercase tracking-widest"
        >
          Login
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Verify;
