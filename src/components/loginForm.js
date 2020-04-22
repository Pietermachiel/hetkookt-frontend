import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    console.log("dosubmit");
    try {
      const { data } = this.state;
      console.log(data);
      await auth.login(data.email, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    console.log(this.props.location);
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="container-x">
        <div id="checkoutBox" className="login-box mt-24">
          <div className="login-box__inner">
            <p className="font-600">Login bij hetKookt</p>
            <p>Vul je gegevens in.</p>
            <form className="login-form" onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login")}
            </form>
            <br />
            <p className="link-inschrijven">
              Nieuw bij <strong>hetKookt</strong>? &nbsp;
              <NavLink to="/register">
                <span>Inschrijven &gt;</span>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
