import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as userService from "../services/userService";

const Register = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [err, setErr] = useState("");

  const doSubmit = async (data) => {
    try {
      await userService.register(data);
      window.location = "/inschrijven";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const theerr = ex.response.data;
        setErr(theerr);
      }
    }
  };

  return (
    <Fragment>
      <div className="container-x unvisable slide work-grid-item">
        <div className="md:w-550 m-auto relative">
          <h3 className="favorieten-title">
            Schrijf je in bij{" "}
            <span>
              <strong>hetkookt!</strong>
            </span>
          </h3>
          <p className="link-inschrijven">
            Heb je al een account?&nbsp;
            <NavLink to="/login">
              <span className="ml-5 font-500">login &gt;</span>
            </NavLink>
          </p>
          {/* <h4 className="font-600">Nieuw bij hetkookt?</h4> */}
          <p className="text-red-500">
            Na verzending van je gegevens sturen we je een email ter
            verificatie. Je kunt je inschrijving te allen tijde intrekken.
          </p>
          <form className="login-form" onSubmit={handleSubmit(doSubmit)}>
            {/* name */}
            <div className={`relative`}>
              <label className="text-16 text-gray-500" htmlFor="name">
                name
              </label>
              <input
                name="name"
                className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-48"
                ref={register({
                  required: true,
                  minLength: 2,
                })}
              />
              <span className="absolute left-0 top-0">
                <img
                  className="w-20 h-20 mt-40 ml-15 opacity-50"
                  src="/img/feather/user.svg"
                  alt=""
                />
              </span>
              {errors.name?.type === "required" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Dit veld is verplicht
                </span>
              )}
              {errors.name?.type === "minLength" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Minimaal 2 letters
                </span>
              )}
            </div>
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
                ref={register({ required: true, minLength: 6 })}
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
              {errors.password?.type === "minLength" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Minimaal 6 karakters
                </span>
              )}
            </div>
            {err && (
              <p className="font-700 text-16 text-orange-500 mb-0 mt-6">
                {err}
              </p>
            )}
            <button className="uppercase text-16 bg-indigo-500 mt-36 px-36 py-10 text-white tracking-widest">
              inschrijven
            </button>
          </form>
          <br />
          {/* <p className="link-inschrijven">
            Nieuw bij <span className="font-700">hetkookt</span>? &nbsp;
            <Link to="/register">
              <span>Inschrijven &gt;</span>
            </Link>
          </p> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
