import React, { Fragment } from "react";
// import dishes from "../../data/dishes.json";

const Test = ({ dishes, recipes, ...props }) => {
  // console.log("recipes");
  // console.log(recipes);
  // console.log(props);
  console.log(dishes);

  return (
    <Fragment>
      {dishes.map((d, xid) => {
        return (
          <Fragment key={xid}>
            <h3>{d}</h3>
          </Fragment>
        );
      })}

      <div className="container">
        <div className="w-1/2 h-36 bg-white"></div>
        <div className="w-1/2 h-36 bg-gray-200"></div>
        <div className="w-1/2 h-36 bg-gray-300"></div>
        <div className="w-1/2 h-36 bg-gray-400"></div>
        <div className="w-1/2 h-36 bg-gray-500"></div>
        <div className="w-1/2 h-36 bg-gray-600"></div>
        <div className="w-1/2 h-36 bg-gray-700"></div>
        <div className="w-1/2 h-36 bg-gray-800"></div>
        <div className="w-1/2 h-36 bg-gray-900"></div>

        <p className="bg-red-300 pl-0 w-full">this is a test</p>
        <p className="bg-red-300 pl-1">this is a test</p>
        <p className="bg-red-300 pl-2">this is a test</p>
        <p className="bg-red-300 pl-3">this is a test</p>
        <p className="bg-red-300 pl-4">this is a test</p>
        <p className="bg-red-300 pl-5">this is a test</p>
        <p className="bg-red-300 pl-6">this is a test</p>
        <p className="bg-red-300 pl-7">this is a test</p>
        <p className="bg-red-300 pl-8">this is a test</p>
        <p className="bg-red-300 pl-9">this is a test</p>
        <p className="bg-red-300 pl-10">this is a test</p>
        <p className="bg-red-300 pl-11">this is a test</p>
        <p className="bg-red-300 pl-12">this is a test</p>
        <p className="bg-red-300 pl-14">this is a test</p>
        <p className="bg-red-300 pl-15">this is a test</p>
        <p className="bg-red-300 pl-16">this is a test</p>
        <p className="bg-red-300 pl-18">this is a test</p>
        <p className="bg-red-300 pl-20">this is a test</p>
        <p className="bg-red-300 pl-21">this is a test</p>
        <p className="bg-red-300 pl-24">this is a test</p>
        <p className="bg-red-300 pl-28">this is a test</p>
        <p className="bg-red-300 pl-30">this is a test</p>
        <p className="bg-red-300 pl-36">this is a test</p>
        <p className="bg-red-300 pl-48">this is a test</p>
        <p className="bg-red-300 pl-60">this is a test</p>
        <p className="bg-red-300 pl-72">this is a test</p>

        <p className="font-300 text-12">Test</p>
        <p className="font-300 text-14">Test</p>
        <p className="font-300 text-16">Test</p>
        <p className="font-300 text-18">Test</p>
        <p className="font-300 text-19">Test</p>
        <p className="font-300 text-20">Test</p>
        <p className="font-300 text-21">Test</p>
        <p className="font-300 text-24">Test</p>
        <p className="font-300 text-28">Test</p>
        <p className="font-300 text-30">Test</p>
        <p className="font-300 text-36">Test</p>
        <p className="font-300 text-42">Test</p>
        <p className="font-300 text-48">Test</p>
        <p className="font-300 text-54">Test</p>
        <p className="font-300 text-60">Test</p>
        <p className="font-300 text-72">Test</p>

        <h1 className="font-100 text-48">HetKookt</h1>
        <h2 className="font-300 text-48">HetKookt</h2>
        <h3 className="font-500 text-48">HetKookt</h3>
        <h4 className="font-700 text-48">HetKookt</h4>
        <h5 className="font-900 text-48">HetKookt</h5>
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-24 pt-18 pb-24 mb-12">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-6"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-6 px-9 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-6"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-6 px-9 text-gray-700 mb-9 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
              <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-16 text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Test;
