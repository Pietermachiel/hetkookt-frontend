import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { saveRecipe } from "../../services/recipeService";
import { slugify } from "../common/common";

export default class RecipeForm extends Form {
  state = {
    data: {
      title: "",
      dish: "",
      author: "",
      tags: [{ item: "" }],
      fresh: [{ item: "", quantity: "", unit: "" }],
      stock: [{ item: "", quantity: "", unit: "" }],
      directions: [],
      basics: []
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("title"),
    dish: Joi.string()
      .required()
      .label("dish"),
    author: Joi.string()
      .required()
      .label("author"),
    tags: Joi.array().label("tags"),
    fresh: Joi.array().label("fresh"),
    stock: Joi.array().label("stock"),
    directions: Joi.array().label("directions"),
    basics: Joi.array().label("basics")
  };

  async populateRecipe() {
    try {
      const recipeId = this.props.match.params.id;
      console.log(recipeId);
      if (recipeId === "new") return;
      let allrecipes = this.props.recipes;
      const filterrecipe = allrecipes.filter(
        recipe => slugify(recipe.title) === recipeId
      );
      // this.setState({ data: this.mapToViewModel(filterrecipe[0]) });

      this.setState(prevState => ({
        ...prevState,
        data: this.mapToViewModel(filterrecipe[0])
      }));
      console.log(this.props.recipes);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        // this.props.history.replace("/not-found");
        return ex;
    }
  }

  async componentDidMount() {
    await this.populateRecipe();
    console.log(this.state.data);
  }

  mapToViewModel(recipe) {
    return {
      _id: recipe._id,
      title: recipe.title,
      dish: recipe.dish,
      author: recipe.author,
      tags: recipe.tags.map(t => t),
      fresh: recipe.fresh,
      stock: recipe.stock,
      directions: recipe.directions,
      basics: recipe.basics
    };
  }

  doSubmit = async () => {
    console.log("doSubmit clicked");
    await saveRecipe(this.state.data);
    console.log("doSubmit saveRecipe");
    this.props.history.push("/recipetable");
  };

  render() {
    // const { title } = this.props;
    const {
      errors,
      data: { tags, title, _id }
    } = this.state;
    // const { tags, title } = this.state.data;

    return (
      <div className="container-page">
        <h1>{title}</h1>
        <form onSubmit={this.handleSubmit} className="recipe-form">
          {/* {this.renderInput("title", "title")} */}

          <div className="title">
            <label className="input-label" htmlFor="title">
              title
            </label>
            <input
              className="input-field"
              type="text"
              value={title}
              name="title"
              // id={_id}
              onChange={this.handleChange}
            />
            {errors[title] && (
              <div className="alert alert-danger">{errors[title]}</div>
            )}
          </div>

          {this.renderInput("dish", "dish")}
          {this.renderInput("author", "author")}
          {/* {this.renderInput("tags", "tags")} */}

          <div className="tags">
            <label className="input-label" htmlFor="tags">
              tags
            </label>
            {tags.map((t, xid) => (
              <div key={xid}>
                <input
                  className="input-field"
                  type="text"
                  value={t.item}
                  name="item"
                  id={t._id}
                  key={t._id}
                  onChange={this.handleTagsChange(t._id)}
                />
                {errors[t.item] && (
                  <div className="alert alert-danger">{errors[t.item]}</div>
                )}
              </div>
            ))}
          </div>
          {this.renderInput("fresh", "fresh")}
          {this.renderInput("stock", "stock")}
          {this.renderInput("directions", "directions")}
          {this.renderInput("basics", "basics")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}
