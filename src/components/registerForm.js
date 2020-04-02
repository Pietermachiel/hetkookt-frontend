import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "", recipes: [] },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name"),
    recipes: Joi.array()
  };

  doSubmit = async () => {
    console.log("dosubmit");
    try {
      const response = await userService.register(this.state.data); // dit in een try-catch block
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
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
      <div id="checkoutBox" className="login-box">
        <div className="login-box__inner">
          {" "}
          {/* <h2>inschrijven</h2> */}
          <h4>Nieuw bij MijnRecepten?</h4>
          <p>
            Stuur ons eerst je e-mailadres. <br />
            We sturen direct een email terug, zodat we zeker weten dat jij de
            eigenaar bent... <br />
            Als je dat bevestigt kan je de inschrijving voltooien.
          </p>
          <form className="login-form" onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Inschrijven")}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
