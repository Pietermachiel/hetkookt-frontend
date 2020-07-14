import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router";
import { uniq } from "../common/common";
import tags from "../../data/tags.json";
import thedishes from "../../data/dishes.json";
import { createRecipe } from "../../services/userService";
import { useForm, useFieldArray } from "react-hook-form";

// https://www.carlrippon.com/custom-validation-rules-in-react-hook-form/
// https://www.carlrippon.com/master-detail-forms-with-react-form-hook/

const theunits = [{ unit: "g" }, { unit: "ml" }];

const NieuwItem = ({ me, setMe, ...props }) => {
  // const [routeRedirect, setRedirect] = useState("");
  const [error, setError] = useState(false);
  const { register, control, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      tags: [{ name: "" }],
      basics: [{ name: "" }],
      related: [{ name: "" }],
      fresh: [{ name: "" }],
      stock: [{ name: "" }],
      directions: [{ name: "" }],
    },
  });

  const {
    fields: tagsFields,
    append: tagsAppend,
    remove: tagsRemove,
  } = useFieldArray({ control, name: "tags" });
  const {
    fields: basicsFields,
    append: basicsAppend,
    remove: basicsRemove,
  } = useFieldArray({ control, name: "basics" });
  const {
    fields: relatedFields,
    append: relatedAppend,
    remove: relatedRemove,
  } = useFieldArray({ control, name: "related" });
  const {
    fields: freshFields,
    append: freshAppend,
    remove: freshRemove,
  } = useFieldArray({ control, name: "fresh" });
  const {
    fields: stockFields,
    append: stockAppend,
    remove: stockRemove,
  } = useFieldArray({ control, name: "stock" });
  const {
    fields: directionsFields,
    append: directionsAppend,
    remove: directionsRemove,
  } = useFieldArray({ control, name: "directions" });

  const handleCreateRecipe = async (data) => {
    // console.log("handleCreateRecipe: data");
    // console.log(data);
    data = { ...data, item: true };
    // console.log("data2");
    // console.log(data);
    try {
      await createRecipe(me, setMe, data);
      const { state } = props.location;
      window.location = state ? state.from.pathname : "/kookschrift";
    } catch (error) {
      setError(true);
    }
    // setRedirect(true);
  };

  // const redirect = routeRedirect;
  // if (redirect) {
  //   return <Redirect to="/kookschrift" />;
  // }

  return (
    <React.Fragment>
      <div className="container-x">
        <div className="md:w-550 m-auto relative">
          <h1 className="favorieten-title">Nieuw recept</h1>
          <form onSubmit={handleSubmit(handleCreateRecipe)}>
            {/* titel */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Titel
              </label>
              <input
                name="title"
                className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                ref={register({
                  required: true,
                })}
              />
              {errors.title?.type === "required" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Dit veld is verplicht
                </span>
              )}
            </div>
            {/* collectie */}
            <div className="formgroup__collectie">
              <label htmlFor="collectie" className="text-16 text-gray-500">
                Collectie
              </label>
              <select
                name="dish"
                ref={register({ required: true })}
                id="dish"
                className="select h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
              >
                <option value="" />
                {thedishes.map((option, xid) => (
                  <option key={xid} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.dish?.type === "required" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Dit veld is verplicht
                </span>
              )}
            </div>
            {/* Tags */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Tags
              </label>
              <ul>
                {tagsFields.map((item, index) => (
                  <Fragment key={index}>
                    <li className="relative mb-0">
                      <select
                        name={`tags[${index}].name`}
                        className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                        defaultValue={item.name}
                        ref={register()}
                        // ref={register({ required: true })}
                      >
                        <option value="" />
                        {tags.map((option, xid) => (
                          <option key={xid} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <button
                        className="absolute top-0"
                        style={{ right: "-30px" }}
                        onClick={() => tagsRemove(index)}
                      >
                        <img
                          className="w-20 h-20 mt-13 opacity-50"
                          src="/img/feather/trash.svg"
                          alt=""
                        />
                      </button>
                    </li>
                  </Fragment>
                ))}
              </ul>
              <div
                className="relative w-full text-left pt-4 pl-30 text-indigo-600"
                onClick={() => tagsAppend({ name: "" })}
              >
                <div className="absolute left-0 top-0">
                  <img className="pt-6" src="/img/feather/plus.svg" alt="" />
                </div>
                tag
              </div>
            </div>
            {/* Basics */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Basics
              </label>
              <ul>
                {basicsFields.map((item, index) => (
                  <li key={index} className="relative mb-0">
                    <input
                      name={`basics[${index}].name`}
                      className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                      defaultValue={item.name}
                      ref={register()}
                    />
                    <button
                      className="absolute top-0"
                      style={{ right: "-44px" }}
                      onClick={() => basicsRemove(index)}
                    >
                      <img
                        className="w-20 h-20 mt-13 mr-15 opacity-50"
                        src="/img/feather/trash.svg"
                        alt=""
                      />
                    </button>
                  </li>
                ))}
              </ul>
              <div
                className="relative w-full text-left pt-4 pl-30 text-indigo-600"
                onClick={() => basicsAppend({ name: "" })}
              >
                <div className="absolute left-0 top-0">
                  <img className="pt-6" src="/img/feather/plus.svg" alt="" />
                </div>
                titel basisrecept
              </div>
            </div>
            {/* Related */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Related
              </label>
              <ul>
                {relatedFields.map((item, index) => (
                  <li key={index} className="relative mb-0">
                    <input
                      name={`related[${index}].name`}
                      className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                      defaultValue={item.name}
                      ref={register()}
                    />
                    <button
                      className="absolute top-0"
                      style={{ right: "-44px" }}
                      onClick={() => relatedRemove(index)}
                    >
                      <img
                        className="w-20 h-20 mt-13 mr-15 opacity-50"
                        src="/img/feather/trash.svg"
                        alt=""
                      />
                    </button>
                  </li>
                ))}
              </ul>
              <div
                className="relative w-full text-left pt-4 pl-30 text-indigo-600"
                onClick={() => relatedAppend({ name: "" })}
              >
                <div className="absolute left-0 top-0">
                  <img className="pt-6" src="/img/feather/plus.svg" alt="" />
                </div>
                titel gerelateerd recept
              </div>
            </div>
            {/* vers */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Vers
              </label>
              <ul>
                {freshFields.map((item, index) => (
                  <Fragment key={index}>
                    <li className="relative mb-0" key={item.id}>
                      <input
                        name={`fresh[${index}].quantity`}
                        placeholder="hoeveel"
                        className="form-input__quantity h-48 font-300 text-14 border-solid border border-gray-400 pl-18"
                        defaultValue={item.quantity}
                        // ref={register()}
                        ref={register({ pattern: /^[0-9]+$/ })}
                      />
                      <select
                        name={`fresh[${index}].unit`}
                        className="form-input__unit h-48 font-300 text-14 border-solid border border-gray-400 pl-18"
                        defaultValue={item.unit}
                        ref={register()}
                      >
                        <option value="" />
                        {theunits.map((option, xid) => (
                          <option key={xid} value={option.unit}>
                            {option.unit}
                          </option>
                        ))}
                      </select>
                      <input
                        name={`fresh[${index}].ingredient`}
                        placeholder="ingredient"
                        className="form-input__ingredient h-48 font-300 text-14 border-solid border border-gray-400 pl-18"
                        defaultValue={item.ingredient}
                        ref={register()}
                      />
                      <button
                        className="absolute top-0"
                        style={{ right: "-44px" }}
                        onClick={() => freshRemove(index)}
                      >
                        <img
                          className="w-20 h-20 mt-13 mr-15 opacity-50"
                          src="/img/feather/trash.svg"
                          alt=""
                        />
                      </button>
                    </li>
                    {errors.fresh &&
                      errors.fresh[index] &&
                      errors.fresh[index].quantity?.type === "pattern" && (
                        <span className="block text-16 py-6 font-700 text-orange-500">
                          Alleen cijfers
                        </span>
                      )}
                  </Fragment>
                ))}
              </ul>

              <div
                className="relative w-full text-left pt-4 pl-30 text-indigo-600"
                onClick={() => freshAppend({ name: "" })}
              >
                <div className="absolute left-0 top-0">
                  <img className="pt-6" src="/img/feather/plus.svg" alt="" />
                </div>
                vers ingredient
              </div>
            </div>
            {/* houdbaar */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Houdbaar
              </label>
              <ul>
                {stockFields.map((item, index) => (
                  <Fragment key={index}>
                    <li className="relative mb-0">
                      <input
                        name={`stock[${index}].quantity`}
                        placeholder="hoeveel"
                        className="form-input__quantity h-48 font-300 text-14 border-solid border border-gray-400 pl-18"
                        defaultValue={item.quantity}
                        ref={register()}
                      />
                      <select
                        name={`stock[${index}].unit`}
                        className="form-input__unit h-48 font-300 text-14 border-solid border border-gray-400 pl-18"
                        defaultValue={item.unit}
                        ref={register()}
                      >
                        <option value="" />
                        {theunits.map((option, xid) => (
                          <option key={xid} value={option.unit}>
                            {option.unit}
                          </option>
                        ))}
                      </select>
                      <input
                        name={`stock[${index}].ingredient`}
                        placeholder="ingredient"
                        className="form-input__ingredient h-48 font-300 text-14 border-solid border border-gray-400 pl-18"
                        defaultValue={item.ingredient}
                        ref={register()}
                      />
                      <button
                        className="absolute top-0"
                        style={{ right: "-44px" }}
                        onClick={() => stockRemove(index)}
                      >
                        <img
                          className="w-20 h-20 mt-13 mr-15 opacity-50"
                          src="/img/feather/trash.svg"
                          alt=""
                        />
                      </button>
                    </li>
                    {/* {errors.stock &&
                      errors.stock[index] &&
                      errors.stock[index].quantity?.type === "pattern" && (
                        <span className="block text-16 py-6 font-700 text-orange-500">
                          Alleen cijfers
                        </span>
                      )} */}
                  </Fragment>
                ))}
              </ul>
              <div
                className="relative w-full text-left pt-4 pl-30 text-indigo-600"
                onClick={() => stockAppend({ name: "" })}
              >
                <div className="absolute left-0 top-0">
                  <img className="pt-6" src="/img/feather/plus.svg" alt="" />
                </div>
                houdbaar ingredient
              </div>
            </div>
            {/* directions */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Werkwijze
              </label>
              <ul>
                {directionsFields.map((item, index) => (
                  <li key={index} className="relative mb-0">
                    <input
                      name={`directions[${index}].name`}
                      className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                      defaultValue={item.name}
                      ref={register()}
                    />
                    <button
                      className="absolute top-0"
                      style={{ right: "-44px" }}
                      onClick={() => directionsRemove(index)}
                    >
                      <img
                        className="w-20 h-20 mt-13 mr-15 opacity-50"
                        src="/img/feather/trash.svg"
                        alt=""
                      />
                    </button>
                  </li>
                ))}
              </ul>
              <div
                className="relative w-full text-left pt-4 pl-30 text-indigo-600"
                onClick={() => directionsAppend({ name: "" })}
              >
                <div className="absolute left-0 top-0">
                  <img className="pt-6" src="/img/feather/plus.svg" alt="" />
                </div>
                stap
              </div>
            </div>
            {/* author */}
            <div className="">
              <label className="text-16 text-gray-500" htmlFor="email">
                Author
              </label>
              <input
                name="author"
                className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                ref={register()}
              />
            </div>{" "}
            {/* source */}
            <div className="">
              <label className="text-16 text-gray-500" htmlFor="email">
                Source
              </label>
              <input
                name="source"
                className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                ref={register()}
              />
            </div>{" "}
            {/* url */}
            <div className="">
              <label className="text-16 text-gray-500" htmlFor="email">
                Url
              </label>
              <input
                name="source_url"
                className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                ref={register()}
              />
            </div>{" "}
            {/* info */}
            <div className="">
              <label className="text-16 text-gray-500" htmlFor="email">
                Info
              </label>
              <input
                name="info"
                className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                ref={register()}
              />
            </div>
            <button className="uppercase text-16 bg-indigo-500 mt-36 px-36 py-10 text-white tracking-widest">
              nieuw
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NieuwItem;
