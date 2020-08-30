import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import auth from "../services/authService";
import { toast } from "react-toastify";

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const doSubmit = async (data) => {
    try {
      await auth.login(data.email, data.password);
      window.location = "/welkom";
    } catch (ex) {
      toast.error("Ongeldige gebruikersnaam of password");
    }
  };

  return (
    <Fragment>
      <div className="container-x unvisable slide work-grid-item">
        <div className="md:w-550 m-auto relative">
          <h3 className="favorieten-title">
            Login bij
            <span className="font-500">
              &nbsp;het<span className="font-700">kookt</span>.
            </span>
          </h3>
          <br />
          <p>Vul je gegevens in.</p>
          <form className="login-form" onSubmit={handleSubmit(doSubmit)}>
            {/* email */}
            <div className={`relative`}>
              <label className="text-16 text-gray-500" htmlFor="email">
                Email
              </label>
              <input
                name="email"
                className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-48"
                ref={register({
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  maxLength: 30,
                })}
              />
              <span className="absolute left-0 top-0">
                <img
                  className="w-20 h-20 mt-40 ml-15 opacity-50"
                  src="/img/feather/mail.svg"
                  alt=""
                />
              </span>
              {errors.email?.type === "required" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Dit veld is verplicht
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Vul een geldig email adres in
                </span>
              )}
            </div>
            {/* password */}
            <div className={`relative`}>
              <label className="text-16 text-gray-500" htmlFor="password">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-48"
                ref={register({ required: true })}
              />
              <span className="absolute left-0 top-0">
                <img
                  className="w-20 h-20 mt-40 ml-15 opacity-50"
                  src="/img/feather/lock.svg"
                  alt=""
                />
              </span>
              {errors.password?.type === "required" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Dit veld is verplicht
                </span>
              )}
            </div>
            <button className="uppercase text-16 bg-indigo-600 mt-36 px-36 py-10 text-white tracking-widest">
              login
            </button>
          </form>
          <br />
          <p className="link-inschrijven">
            Nieuw bij <span className="font-700">hetkookt</span>? &nbsp;
            <Link to="/register">
              <span>Inschrijven &gt;</span>
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
