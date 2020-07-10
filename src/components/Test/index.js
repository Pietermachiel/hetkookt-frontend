import React, { Fragment } from "react";
import { uniq } from "../common/common";
import RecipeItems from "../RecipeItems";
import { useForm, useFieldArray } from "react-hook-form";
import thedishes from "../../data/dishes.json";

const theunits = [{ unit: "g" }, { unit: "ml" }];

const Test = ({ user, recipes, ...props }) => {
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

  // console.log("recipes");
  // console.log(recipes);
  // console.log(props);
  // console.log(props);

  // var selectedtags = recipes
  //   .map((s) => s.tags)
  //   .filter(uniq)
  //   .filter((e) => e !== undefined);

  // const collection = selectedtags.map((s) => {
  //   const selection = recipes.filter((r) => r.tags[0] === s);
  //   return { title: s, selection: selection };
  // });

  // var selectedtags = recipes.map((s) => s.tags[0]);
  // selectedtags = selectedtags.filter(uniq).filter((e) => e !== undefined);

  // const collection = selectedtags.map((s) => {
  //   const selection = recipes.filter((r) => r.tags[0] === s);
  //   return { title: s, selection: selection };
  // });

  // console.log("selectedtags");
  // console.log(selectedtags);
  // console.log("collection");
  // console.log(collection);

  // if (user === null)
  //   return (
  //     <div className="container-x">
  //       <p>Loading...</p>
  //     </div>
  //   );

  return (
    <Fragment>
      <div className="container-x -mt-20">
        <div className="md:w-550 m-auto relative">
          <h1>Test</h1>
          <form onSubmit={handleSubmit((data) => console.log("data", data))}>
            {/* titel */}
            <div className="">
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
              {errors.titel?.type === "required" && (
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
                  <li className="relative mb-0" key={item.id}>
                    <select
                      name={`tags[${index}].name`}
                      className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                      defaultValue={item.name}
                      ref={register()}
                    >
                      <option value="" />
                      {thedishes.map((option, xid) => (
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
                ))}
              </ul>
              <button
                className="relative w-full text-left pt-4 pl-30 text-indigo-600"
                onClick={() => tagsAppend({ name: "" })}
              >
                <div className="absolute left-0 top-0">
                  <img className="pt-6" src="/img/feather/plus.svg" alt="" />
                </div>
                tag
              </button>
            </div>
            {/* Basics */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Basics
              </label>
              <ul>
                {basicsFields.map((item, index) => (
                  <li className="relative mb-0" key={item.id}>
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
              <button
                className="relative w-full text-left pt-4 pl-30 text-indigo-600"
                onClick={() => basicsAppend({ name: "" })}
              >
                <div className="absolute left-0 top-0">
                  <img className="pt-6" src="/img/feather/plus.svg" alt="" />
                </div>
                titel basisrecept
              </button>
            </div>
            {/* Related */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Related
              </label>
              <ul>
                {relatedFields.map((item, index) => (
                  <li className="relative mb-0" key={item.id}>
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
              <button
                className="relative w-full text-left pt-4 pl-30 text-indigo-600"
                onClick={() => relatedAppend({ name: "" })}
              >
                <div className="absolute left-0 top-0">
                  <img className="pt-6" src="/img/feather/plus.svg" alt="" />
                </div>
                titel gerelateerd recept
              </button>
            </div>
            {/* vers */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Vers
              </label>
              <ul>
                {freshFields.map((item, index) => (
                  <li className="relative mb-0" key={item.id}>
                    <input
                      name={`fresh[${index}].quantity`}
                      placeholder="hoeveel"
                      className="form-input__quantity h-48 font-300 text-14 border-solid border border-gray-400 pl-18"
                      defaultValue={item.quantity}
                      ref={register()}
                    />
                    <input
                      name={`fresh[${index}].unit`}
                      className="form-input__unit h-48 font-300 text-14 border-solid border border-gray-400 pl-18"
                      defaultValue={item.unit}
                      ref={register()}
                    />
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
                ))}
              </ul>
              <button
                className="relative w-full text-left pt-4 pl-30 text-indigo-600"
                onClick={() => freshAppend({ name: "" })}
              >
                <div className="absolute left-0 top-0">
                  <img className="pt-6" src="/img/feather/plus.svg" alt="" />
                </div>
                vers ingredient
              </button>
            </div>
            {/* houdbaar */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Houdbaar
              </label>
              <ul>
                {stockFields.map((item, index) => (
                  <li className="relative mb-0" key={item.id}>
                    <input
                      name={`stock[${index}].quantity`}
                      placeholder="hoeveel"
                      className="form-input__quantity h-48 font-300 text-14 border-solid border border-gray-400 pl-18"
                      defaultValue={item.quantity}
                      ref={register()}
                    />
                    <input
                      name={`stock[${index}].unit`}
                      className="form-input__unit h-48 font-300 text-14 border-solid border border-gray-400 pl-18"
                      defaultValue={item.unit}
                      ref={register()}
                    />
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
                ))}
              </ul>
              <button
                className="relative w-full text-left pt-4 pl-30 text-indigo-600"
                onClick={() => stockAppend({ name: "" })}
              >
                <div className="absolute left-0 top-0">
                  <img className="pt-6" src="/img/feather/plus.svg" alt="" />
                </div>
                houdbaar ingredient
              </button>
            </div>
            {/* directions */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Werkwijze
              </label>
              <ul>
                {directionsFields.map((item, index) => (
                  <li className="relative mb-0" key={item.id}>
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
              <button
                className="relative w-full text-left pt-4 pl-30 text-indigo-600"
                onClick={() => directionsAppend({ name: "" })}
              >
                <div className="absolute left-0 top-0">
                  <img className="pt-6" src="/img/feather/plus.svg" alt="" />
                </div>
                stap
              </button>
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
    </Fragment>
  );
};

export default Test;
