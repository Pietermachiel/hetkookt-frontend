import React from "react";
import { NavLink } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    console.log("dosubmit");
    try {
      const response = await userService.register(this.state.data); // dit in een try-catch block
      // auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/inschrijven";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data; // "..." of van de server
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container-x">
        <div id="checkoutBox" className="login-box mt-24">
          <div className="login-box__inner">
            <h3 className="">
              Schrijf je in bij
              <span className="font-500">
                &nbsp;het<span className="font-700">kookt</span>.
              </span>
            </h3>
            <br />
            <p className="text-24 mb-18 leading-snug">
              Maak een account aan voor een weekmenu en een kookschrift met
              persoonlijke notities.
            </p>
            <p className="link-inschrijven">
              Heb je al een account?&nbsp;
              <NavLink to="/login">
                <span>login &gt;</span>
              </NavLink>
            </p>
            {/* <h2>inschrijven</h2> */}
            <h4 className="font-600">Nieuw bij hetkookt?</h4>
            <p>
              Na verzending van je gegevens sturen we je een email ter
              verificatie. Je kunt je inschrijving te allen tijde intrekken.
            </p>
            {/* <p className="text-indigo-700 font-600">disclaimer</p> */}
            <form
              className="login-form px-10 sm:px-0"
              onSubmit={this.handleSubmit}
            >
              {this.renderInput("name", "Name")}
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Verzend")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
