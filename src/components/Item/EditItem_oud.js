import React, { useEffect, useState, Fragment } from "react";
// import defaultImage from "../assets/images.png";
import { Redirect } from "react-router";
import { uniq, slugify } from "../common/common";
import tags from "../../data/tags.json";
import thedishes from "../../data/dishes.json";
import { doSave } from "../../services/userService"; // doEditMenu

// const themeal = ["true", "false"];

const theunits = [{ unit: "g" }, { unit: "ml" }];

const EditItem = ({ me, setMe, therecipe, ...props }) => {
  const [_id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [dish, setDish] = useState("");
  const [inputTags, setInputTags] = useState([""]);
  const [inputBasics, setInputBasics] = useState([""]);
  const [inputRelated, setInputRelated] = useState([""]);
  const [inputFresh, setInputFresh] = useState([
    {
      ingredient: "",
      quantity: "",
      unit: "",
    },
  ]);
  const [inputStock, setInputStock] = useState([
    {
      ingredient: "",
      quantity: "",
      unit: "",
    },
  ]);
  const [inputDirections, setInputDirections] = useState([""]);
  const [author, setAuthor] = useState("");
  const [source, setSource] = useState("");
  const [source_url, setSource_url] = useState("");
  const [info, setInfo] = useState("");
  const [date, setDate] = useState([""]);
  const [recipeItem, setRecipeItem] = useState("");
  const [error, setError] = useState(false);
  // const [routeRedirect, setRedirect] = useState("");

  useEffect(() => {
    setId(therecipe._id);
    setTitle(therecipe.title);
    setDish(therecipe.dish);
    setInputFresh(therecipe.fresh);
    setInputStock(therecipe.stock);
    setInputTags(therecipe.tags);
    setInputBasics(therecipe.basics);
    setInputRelated(therecipe.related);
    setInputDirections(therecipe.directions);
    setAuthor(therecipe.author);
    setSource(therecipe.source);
    setSource_url(therecipe.source_url);
    setInfo(therecipe.info);
    setDate(therecipe.date);
    setRecipeItem(therecipe.item);
  }, [therecipe]);

  const theitem = {
    _id: _id,
    title: title,
    dish: dish,
    fresh: inputFresh,
    stock: inputStock,
    tags: inputTags,
    basics: inputBasics,
    related: inputRelated,
    directions: inputDirections,
    author: author,
    source: source,
    source_url: source_url,
    info: info,
    date: date,
    item: recipeItem,
  };

  console.log("theitem");
  console.log(theitem);
  // console.log("therecipe");
  // console.log(therecipe);

  const handledoSave = async (me, setMe, theitem) => {
    console.log("theitem index");
    console.log(theitem);
    try {
      await doSave(me, setMe, theitem);
      const { state } = props.location;
      window.location = state ? state.from.pathname : "/kookschrift";
    } catch (error) {
      setError(true);
    }
  };

  // Tags

  const handleInputTags = (e, index) => {
    const { value } = e.target;
    const list = [...inputTags];
    list[index] = value;
    setInputTags(list);
  };

  const handleRemoveTags = (index) => {
    const list = [...inputTags];
    list.splice(index, 1);
    setInputTags(list);
  };

  const handleAddTags = () => {
    setInputTags([...inputTags, ""]);
  };

  // Stock

  const handleInputStock = (e, index) => {
    console.log("e");
    console.log(e);
    console.log("e.target");
    console.log(e.target);
    const { name, value } = e.target;
    const list = [...inputStock];
    list[index][name] = value;
    setInputStock(list);
    console.log("list");
    console.log(list);
  };

  const handleRemoveStock = (index) => {
    const list = [...inputStock];
    list.splice(index, 1);
    setInputStock(list);
  };

  const handleAddStock = () => {
    setInputStock([
      ...inputStock,
      {
        ingredient: "",
        quantity: "",
        unit: "",
      },
    ]);
  };

  // Fresh

  const handleInputFresh = (e, index) => {
    console.log("e");
    console.log(e);
    console.log("e.target");
    console.log(e.target);
    const { name, value } = e.target;
    const list = [...inputFresh];
    list[index][name] = value;
    setInputFresh(list);
    console.log("list");
    console.log(list);
  };

  const handleRemoveFresh = (index) => {
    const list = [...inputFresh];
    list.splice(index, 1);
    setInputFresh(list);
  };

  const handleAddFresh = () => {
    setInputFresh([
      ...inputFresh,
      {
        ingredient: "",
        quantity: "",
        unit: "",
      },
    ]);
  };

  // Basics

  const handleInputBasics = (e, index) => {
    const { value } = e.target;
    const list = [...inputBasics];
    list[index] = value;
    setInputBasics(list);
  };

  const handleRemoveBasics = (index) => {
    const list = [...inputBasics];
    list.splice(index, 1);
    setInputBasics(list);
  };

  const handleAddBasics = () => {
    setInputBasics([...inputBasics, ""]);
  };

  // Related

  const handleInputRelated = (e, index) => {
    const { value } = e.target;
    const list = [...inputRelated];
    list[index] = value;
    setInputRelated(list);
  };

  const handleRemoveRelated = (index) => {
    const list = [...inputRelated];
    list.splice(index, 1);
    setInputRelated(list);
  };

  const handleAddRelated = () => {
    setInputRelated([...inputRelated, ""]);
  };

  // Directions

  const handleInputDirections = (e, index) => {
    const { value } = e.target;
    const list = [...inputDirections];
    list[index] = value;
    setInputDirections(list);
  };

  const handleRemoveDirections = (index) => {
    const list = [...inputDirections];
    list.splice(index, 1);
    setInputDirections(list);
  };

  const handleAddDirections = () => {
    setInputDirections([...inputDirections, ""]);
  };

  // const redirect = routeRedirect;
  // if (redirect) {
  //   return <Redirect to="/kookschrift" />;
  // }

  return (
    <React.Fragment>
      <div className="container-x">
        {/* <div className="banner"></div> */}

        <div className="newrecipe login-box__inner">
          <h3>Edit {title}</h3>
          <form
            onSubmit={() => handledoSave(me, setMe, theitem)}
            className="login-form"
          >
            <div className="formgroup w-556">
              <label className="input-label" htmlFor="title">
                Titel
              </label>
              <input
                className="form-control input-field"
                type="text"
                title="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="formgroup__collectie">
              <label className="input-label" htmlFor="dish">
                Collectie
              </label>
              <select
                name="dish"
                id="dish"
                value={dish}
                className="form-control input-field"
                onChange={(e) => setDish(e.target.value)}
              >
                <option value="" />
                {thedishes.map((option, xid) => (
                  <option key={xid} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* input Tags */}

            <div className="formgroup__collectie">
              <label className="input-label" htmlFor="dish">
                Tags
              </label>
              {inputTags.map((x, i) => {
                return (
                  <Fragment key={i}>
                    <div className="relative">
                      <div className="relative">
                        <select
                          name="unit"
                          value={x}
                          id="unit"
                          className="form-control input-field"
                          onChange={(e) => handleInputTags(e, i)}
                        >
                          <option value="" />
                          {tags.map((option, xid) => (
                            <option key={xid} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      {inputTags.length !== 1 && (
                        <button
                          className="btn-fresh__remove"
                          onClick={() => handleRemoveTags(i)}
                        >
                          <img src="/img/feather/trash.svg" alt="" />
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      {inputTags.length - 1 === i && (
                        <Fragment>
                          <button
                            className="btn-fresh__add"
                            onClick={handleAddTags}
                          >
                            <div className="absolute">
                              <img src="/img/feather/plus.svg" alt="" />
                            </div>
                            Nog een label
                          </button>
                        </Fragment>
                      )}
                    </div>
                  </Fragment>
                );
              })}
            </div>

            {/* input Basics */}

            <div className="formgroup">
              <label className="input-label" htmlFor="dish">
                Basics
              </label>
              {inputBasics.map((x, i) => {
                return (
                  <Fragment key={i}>
                    <div className="relative">
                      <div className="relative w-556">
                        <input
                          name="unit"
                          value={x}
                          id="unit"
                          className="form-control input-field" // form-control
                          onChange={(e) => handleInputBasics(e, i)}
                        />
                      </div>

                      {inputBasics.length !== 1 && (
                        <button
                          className="btn-fresh__remove"
                          onClick={() => handleRemoveBasics(i)}
                        >
                          <img src="/img/feather/trash.svg" alt="" />
                        </button>
                      )}
                    </div>
                    <div className="relative w-556">
                      {inputBasics.length - 1 === i && (
                        <Fragment>
                          <button
                            className="btn-fresh__add"
                            onClick={handleAddBasics}
                          >
                            <div className="absolute">
                              <img src="/img/feather/plus.svg" alt="" />
                            </div>
                            Nog een basic
                          </button>
                        </Fragment>
                      )}
                    </div>
                  </Fragment>
                );
              })}
            </div>

            {/* input Related */}

            <div className="formgroup">
              <label className="input-label" htmlFor="dish">
                Related
              </label>
              {inputRelated.map((x, i) => {
                return (
                  <Fragment key={i}>
                    <div className="relative">
                      <div className="relative w-556">
                        <input
                          name="unit"
                          value={x}
                          id="unit"
                          className="form-control input-field" // form-control
                          onChange={(e) => handleInputRelated(e, i)}
                        />
                      </div>

                      {inputRelated.length !== 1 && (
                        <button
                          className="btn-fresh__remove"
                          onClick={() => handleRemoveRelated(i)}
                        >
                          <img src="/img/feather/trash.svg" alt="" />
                        </button>
                      )}
                    </div>
                    <div className="relative w-556">
                      {inputRelated.length - 1 === i && (
                        <Fragment>
                          <button
                            className="btn-fresh__add"
                            onClick={handleAddRelated}
                          >
                            <div className="absolute">
                              <img src="/img/feather/plus.svg" alt="" />
                            </div>
                            Nog een related
                          </button>
                        </Fragment>
                      )}
                    </div>
                  </Fragment>
                );
              })}
            </div>

            {/* input Fresh */}

            <div className="formgroup__vers">
              <label className="input-label" htmlFor="dish">
                Verse ingredienten
              </label>
              {inputFresh.map((x, i) => {
                return (
                  <Fragment key={i}>
                    <div className="flex relative">
                      <div className="form-input__quantity">
                        {/* <label htmlFor="title">Hoeveel </label> */}
                        <input
                          placeholder="hoeveel"
                          className="input-field"
                          name="quantity"
                          title="quantity"
                          value={x.quantity || ""}
                          onChange={(e) => handleInputFresh(e, i)}
                        />
                      </div>
                      <div className="form-input__unit">
                        {/* <label htmlFor="dish">Eenheid</label> */}
                        <select
                          name="unit"
                          value={x.unit}
                          id="unit"
                          className="" // form-control
                          onChange={(e) => handleInputFresh(e, i)}
                        >
                          <option value="" />
                          {theunits.map((option, xid) => (
                            <option key={xid} value={option.unit}>
                              {option.unit}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-input__ingredient flex flex-column">
                        {/* <label htmlFor="title">Ingredient </label> */}
                        <input
                          placeholder="ingredient"
                          className="form-control input-field"
                          name="ingredient"
                          value={x.ingredient}
                          onChange={(e) => handleInputFresh(e, i)}
                        />
                      </div>
                      {inputFresh.length !== 1 && (
                        <button
                          className="btn-fresh__remove"
                          onClick={() => handleRemoveFresh(i)}
                        >
                          <img src="/img/feather/trash.svg" alt="" />
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      {inputFresh.length - 1 === i && (
                        <Fragment>
                          <button
                            className="btn-fresh__add"
                            onClick={handleAddFresh}
                          >
                            <div className="absolute">
                              <img src="/img/feather/plus.svg" alt="" />
                            </div>
                            Nog een vers ingredient
                          </button>
                        </Fragment>
                      )}
                    </div>
                  </Fragment>
                );
              })}
            </div>

            {/* input Stock */}

            <div className="formgroup__vers">
              <label className="input-label" htmlFor="dish">
                Houdbare ingredienten
              </label>
              {inputStock.map((x, i) => {
                return (
                  <Fragment key={i}>
                    <div className="flex relative">
                      <div className="form-input__quantity">
                        {/* <label htmlFor="title">Hoeveel </label> */}
                        <input
                          placeholder="hoeveel"
                          className="input-field"
                          name="quantity"
                          title="quantity"
                          value={x.quantity || ""}
                          onChange={(e) => handleInputStock(e, i)}
                        />
                      </div>
                      <div className="form-input__unit">
                        {/* <label htmlFor="dish">Eenheid</label> */}
                        <select
                          name="unit"
                          value={x.unit}
                          id="unit"
                          className="" // form-control
                          onChange={(e) => handleInputStock(e, i)}
                        >
                          <option value="" />
                          {theunits.map((option, xid) => (
                            <option key={xid} value={option.unit}>
                              {option.unit}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-input__ingredient flex flex-column">
                        {/* <label htmlFor="title">Ingredient </label> */}
                        <input
                          placeholder="ingredient"
                          className="form-control input-field"
                          name="ingredient"
                          value={x.ingredient}
                          onChange={(e) => handleInputStock(e, i)}
                        />
                      </div>
                      {inputFresh.length !== 1 && (
                        <button
                          className="btn-fresh__remove"
                          onClick={() => handleRemoveStock(i)}
                        >
                          <img src="/img/feather/trash.svg" alt="" />
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      {inputStock.length - 1 === i && (
                        <Fragment>
                          <button
                            className="btn-fresh__add"
                            onClick={handleAddStock}
                          >
                            <div className="absolute">
                              <img src="/img/feather/plus.svg" alt="" />
                            </div>
                            Nog een houdbaar ingredient
                          </button>
                        </Fragment>
                      )}
                    </div>
                  </Fragment>
                );
              })}
            </div>

            {/* input Directions */}

            <div className="formgroup">
              <label className="input-label" htmlFor="dish">
                Directions
              </label>
              {inputDirections.map((x, i) => {
                return (
                  <Fragment key={i}>
                    <div className="relative">
                      <div className="relative w-556">
                        <input
                          name="unit"
                          value={x}
                          id="unit"
                          className="form-control input-field" // form-control
                          onChange={(e) => handleInputDirections(e, i)}
                        />
                      </div>

                      {inputFresh.length !== 1 && (
                        <button
                          className="btn-fresh__remove"
                          onClick={() => handleRemoveDirections(i)}
                        >
                          <img src="/img/feather/trash.svg" alt="" />
                        </button>
                      )}
                    </div>
                    <div className="relative w-556">
                      {inputDirections.length - 1 === i && (
                        <Fragment>
                          <button
                            className="btn-fresh__add"
                            onClick={handleAddDirections}
                          >
                            <div className="absolute">
                              <img src="/img/feather/plus.svg" alt="" />
                            </div>
                            Volgende stap
                          </button>
                        </Fragment>
                      )}
                    </div>
                  </Fragment>
                );
              })}
            </div>
            <div className="formgroup w-556">
              <label className="input-label" htmlFor="title">
                Author
              </label>
              <input
                className="form-control input-field"
                type="text"
                title="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="formgroup w-556">
              <label className="input-label" htmlFor="title">
                Source
              </label>
              <input
                className="form-control input-field"
                type="text"
                title="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
            <div className="formgroup w-556">
              <label className="input-label" htmlFor="title">
                Source_url
              </label>
              <input
                className="form-control input-field"
                type="text"
                title="source_url"
                value={source_url}
                onChange={(e) => setSource_url(e.target.value)}
              />
            </div>
            <div className="formgroup w-556">
              <label className="input-label" htmlFor="title">
                Info
              </label>
              <input
                className="form-control input-field"
                type="text"
                title="info"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
            </div>
            <button className="btn-newrecipe__submit">Submit</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditItem;
