import React, { Fragment } from "react";
import { toast } from "react-toastify";
import { createItem } from "../../services/userService";
import { useForm, useFieldArray } from "react-hook-form";

// https://www.carlrippon.com/custom-validation-rules-in-react-hook-form/
// https://www.carlrippon.com/master-detail-forms-with-react-form-hook/

const theunits = [{ unit: "g" }, { unit: "ml" }];
const stockunits = [
  { unit: "g" },
  { unit: "ml" },
  { unit: "tl" },
  { unit: "el" },
];

const NieuwItem = ({ me, setMe, recipes, tags, dish, ...props }) => {
  const { register, control, handleSubmit, errors } = useForm({
    defaultValues: {
      _id: "",
      title: "",
      dish: { _id: "" },
      tags: [{ _id: "" }],
      related: [{ _id: "" }],
      fresh: [{ quantity: null, unit: "", ingredient: "" }],
      stock: [{ quantity: null, unit: "", ingredient: "" }],
      directions: [{ name: "" }],
      book: { _id: "", name: "", author: "", source: "", year: "" },
      info: "",
      date: [{ name: "" }],
      myrecipe: true,
    },
  });

  const {
    fields: tagsFields,
    append: tagsAppend,
    remove: tagsRemove,
  } = useFieldArray({ control, name: "tags" });
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

  const handleCreateRecipe = async (data) => {
    const newdata = {
      ...data,
      related:
        data.related === undefined || data.related[0]._id === ""
          ? []
          : data.related,
    };
    try {
      // alert("create recipe");
      await createItem(me, setMe, newdata);
      window.location.pathname = "/mijnrecepten";
      // const { state } = props.location;
      // window.location = state ? state.from.pathname : "/kookschrift";
    } catch (ex) {
      // alert("catch error");
      if (ex.response && ex.response.status === 400) {
        toast.error("foutje");
        // const theerr = ex.response.data;
        // setError(theerr);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="container-y ">
        <div className="md:w-550 m-auto relative">
          <h1 className="py-18 text-36">Nieuw eigen recept</h1>
          <form onSubmit={handleSubmit(handleCreateRecipe)}>
            {/* titel */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Titel <span className="verplicht">*</span>
              </label>
              <input
                name="title"
                className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                ref={register({
                  required: true,
                  maxLength: 50,
                  pattern: /^[a-zA-Z0-9 ]+$/,
                })}
              />
              {errors.title?.type === "required" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Dit veld is verplicht
                </span>
              )}
              {errors.title?.type === "maxLength" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Maximaal 50 lettertekens
                </span>
              )}
              {errors.title && errors.title?.type === "pattern" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Ongeldig teken
                </span>
              )}
            </div>
            {/* collectie */}
            <div className="formgroup__collectie">
              <label htmlFor="collectie" className="text-16 text-gray-500">
                Collectie <span className="verplicht">*</span>
              </label>
              <select
                name="dish.name"
                ref={register({ required: true })}
                // id="dish"
                className="select h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-36"
              >
                <option value="" />
                {dish.map((option, xid) => (
                  <option key={xid} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.dish && errors.dish?.type === "required" && (
                <span className="block text-16 py-6 font-700 text-orange-500">
                  Dit veld is verplicht
                </span>
              )}
            </div>
            {/* Tags */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Tags <span className="verplicht">*</span>
              </label>
              <ul>
                {tagsFields.map((item, index) => (
                  <Fragment key={index}>
                    <li className="relative mb-0">
                      <select
                        name={`tags[${index}].name`}
                        className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-36"
                        ref={register({ required: true })}
                      >
                        <option value="" />
                        {tags.map((option, xid) => (
                          <option key={xid} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      {errors.name?.type === "required" && (
                        <span className="block text-16 py-6 font-700 text-orange-500">
                          Dit veld is verplicht
                        </span>
                      )}

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
            {/* Related */}
            <div className="formgroup__collectie">
              <label className="text-16 text-gray-500" htmlFor="email">
                Related
              </label>
              <ul>
                {relatedFields.map((item, index) => (
                  <li key={index} className="relative mb-0">
                    {/* <input
                      name={`related[${index}].name`}
                      className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                      ref={register({ maxLength: 30 })}
                    /> */}
                    <select
                      name={`related[${index}]._id`}
                      className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-36"
                      ref={register({ maxLength: 100 })}
                      // ref={register({ required: true })}
                    >
                      <option value="" />
                      {recipes.map((option, xid) => (
                        <option key={xid} value={option._id}>
                          {option.title}
                        </option>
                      ))}
                    </select>
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
                    {/* {errors.directions?.type === "maxLength" && (
                      <span className="block text-16 py-6 font-700 text-orange-500">
                        Maximaal 30 lettertekens
                      </span>
                    )} */}
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
            {/* book */}
            <div className="formgroup__collectie">
              <label htmlFor="collectie" className="text-16 text-gray-500">
                Bron
              </label>
              <input
                name="book.name"
                className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                ref={register()}
                placeholder="naam"
              />
              <input
                name="book.author"
                className="hidden"
                // className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                ref={register()}
                placeholder="auteur"
              />
              <input
                name="book.publisher"
                className="hidden"
                // className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                ref={register()}
                placeholder="uitgever"
              />
              <input
                name="book.source"
                className="hidden"
                //  className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                ref={register()}
                placeholder="link"
              />
              <input
                name="book.year"
                className="hidden"
                // className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                ref={register()}
                placeholder="jaar"
              />
            </div>
            {/* myrecipe */}
            {/* <div className="formgroup__collectie hidden">
              <label htmlFor="collectie" className="text-16 text-gray-500">
                myrecipe
              </label>
              <input
                name="myrecipe"
                className="h-48 w-full font-300 text-14 border-solid border border-gray-400 pl-18"
                ref={register()}
                defaultValue="true"
              />
            </div> */}
            <button className="mb-36 uppercase text-16 bg-indigo-500 mt-36 px-36 py-10 text-white tracking-widest">
              nieuw
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NieuwItem;
