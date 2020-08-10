import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { slugify } from "../common/common";
import thedishes from "../../data/dishes.json";
import { doSave } from "../../services/userService";
import { useForm, useFieldArray } from "react-hook-form";

const theunits = [{ unit: "" }, { unit: "g" }, { unit: "ml" }];
const stockunits = [
  { unit: "" },
  { unit: "g" },
  { unit: "ml" },
  { unit: "tl" },
  { unit: "el" },
];

const EditItem = ({ me, tags, setMe, therecipe, ...props }) => {
  // const [routeRedirect, setRedirect] = useState("");
  const [error, setError] = useState("");
  const { register, control, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      // _id: therecipe._id,
      title: therecipe.title,
      dish: therecipe.dish,
      tags: therecipe.tags,
      basics: therecipe.basics,
      related: therecipe.related,
      fresh: therecipe.fresh,
      stock: therecipe.stock,
      directions: therecipe.directions,
      author: therecipe.author,
      source: therecipe.source,
      source_url: therecipe.source_url,
      info: therecipe.info,
      date: therecipe.date,
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
  const { fields: dateFields } = useFieldArray({ control, name: "date" });

  console.log("therecipe");
  console.log(therecipe);

  const handledoSave = async (data) => {
    const thedata = { ...data, _id: therecipe._id };
    console.log("data");
    console.log(data);
    try {
      // throw new Error("Whoops!");
      await doSave(me, setMe, thedata);
      // const { state } = props.location;
      // window.location = state ? state.from.pathname : "/kookschrift";
      window.location = "/kookschrift";
    } catch (ex) {
      // console.log(ex.message);
      // if (ex.response && ex.response.status === 400) {
      //   const theerr = ex.response.data;
      //   setError(theerr);
      // }
      if (ex.response && ex.response.status === 400) {
        toast.error("foutje");
      }
    }
  };

  console.log("error");
  console.log(error);
  // const redirect = routeRedirect;
  // if (redirect) {
  //   return <Redirect to="/kookschrift" />;
  // }

  // console.log("EditItem: me.items");
  // console.log(me.items);
  // console.log(therecipe);

  return (
    <React.Fragment>
      <div className="container-y bg-rose-100">
        <div className="md:w-550 m-auto relative">
          <h1 className="favorieten-title text-36 text-green-600">
            {therecipe.title}{" "}
            <Link to={`/kookschrift/${slugify(therecipe.title)}`}>
              <span className="ml-18 py-18 px-36 bg-indigo-500 uppercase tracking-widest text-16 text-white">
                terug
              </span>
            </Link>
          </h1>
          <form onSubmit={handleSubmit(handledoSave)}>
            {/* _id  */}
            {/* <div className="">
              <input name="_id" ref={register()} className="hidden invisible" />
            </div> */}
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
                  minLength: 5,
                  maxLength: 50,
                })}
              />
              {errors.title?.type === "required" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Dit veld is verplicht
                </span>
              )}
              {errors.title?.type === "minLength" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Minimaal 5 lettertekens
                </span>
              )}
              {errors.title?.type === "maxLength" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Maximaal 50 lettertekens
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
                className="select h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-36"
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
                        className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-36"
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
                        style={{ right: "18px" }}
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
                      ref={register()}
                    />{" "}
                    <button
                      className="absolute top-0"
                      style={{ right: "0" }}
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
                      ref={register({ maxLength: 30 })}
                    />
                    {errors.related?.type === "maxLength" && (
                      <span className="block text-16 py-6 font-700 text-orange-500">
                        Maximaal 30 lettertekens
                      </span>
                    )}
                    <button
                      className="absolute top-0"
                      style={{ right: "0" }}
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
                        ref={register({ pattern: /^[0-9]+$/, maxLength: 4 })}
                      />
                      <select
                        name={`fresh[${index}].unit`}
                        className="form-input__unit h-48 font-300 text-14 border-solid border border-gray-400 pl-36"
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
                        ref={register({ maxLength: 30 })}
                      />
                      <button
                        className="absolute top-0"
                        style={{ right: "0" }}
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
                    {errors.fresh &&
                      errors.fresh[index] &&
                      errors.fresh[index].quantity?.type === "maxLength" && (
                        <span className="block text-16 py-6 font-700 text-orange-500">
                          Hoeveelheid maximaal 4 cijfers
                        </span>
                      )}
                    {errors.fresh &&
                      errors.fresh[index] &&
                      errors.fresh[index].ingredient?.type === "maxLength" && (
                        <span className="block text-16 py-6 font-700 text-orange-500">
                          Ingredient maximaal 30 lettertekens
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
                        ref={register({ maxLength: 4 })}
                      />
                      <select
                        name={`stock[${index}].unit`}
                        className="form-input__unit h-48 font-300 text-14 border-solid border border-gray-400 pl-36"
                        defaultValue={item.unit}
                        ref={register()}
                      >
                        <option value="" />
                        {stockunits.map((option, xid) => (
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
                        ref={register({ maxLength: 30 })}
                      />
                      <button
                        className="absolute top-0"
                        style={{ right: "0" }}
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
                    {errors.stock &&
                      errors.stock[index] &&
                      errors.stock[index].quantity?.type === "maxLength" && (
                        <span className="block text-16 py-6 font-700 text-orange-500">
                          Hoeveelheid maximaal 4 lettertekens
                        </span>
                      )}
                    {errors.stock &&
                      errors.stock[index] &&
                      errors.stock[index].ingredient?.type === "maxLength" && (
                        <span className="block text-16 py-6 font-700 text-orange-500">
                          Ingredient maximaal 30 lettertekens
                        </span>
                      )}
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
                      ref={register()}
                    />
                    <button
                      className="absolute top-0"
                      style={{ right: "0" }}
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
            <div className="hidden invisible">
              {dateFields.map((item, index) => (
                <li key={index}>
                  <input name={`date[${index}].name`} ref={register()} />
                </li>
              ))}
            </div>
            <button className="uppercase text-16 bg-indigo-500 mt-36 mb-36 px-36 py-10 text-white tracking-widest">
              aanpassen
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditItem;
