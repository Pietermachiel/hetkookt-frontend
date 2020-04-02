import React from "react";
import { useFormInput } from "./hooks";
import { useFormTagsInput } from "./hooks-tags";

// https://codesandbox.io/s/j4o92owqvv
// https://codesandbox.io/s/react-hook-form-seterror-epesl?from-embed

const Test = props => {
  // const author = props.author;
  // console.log(author);

  let profile = props.recipe;

  const dish = useFormInput(profile.dish);
  const author = useFormInput(profile.author);
  const title = useFormInput(profile.title);
  const thetags = useFormTagsInput(profile.tags);

  console.log("recipe");
  console.log(props.recipe);

  const handleSubmit = () => {
    // call update api with filed data
  };

  console.log("profile");
  console.log(profile);

  console.log("props");
  console.log(title);
  console.log(thetags);
  const tagvalue = thetags.value.map(v => v.item);
  console.log(tagvalue);

  console.log("useFormInput");
  console.log(useFormInput);

  return (
    <div className="container-page">
      <h1>{props.match.params.id}</h1>
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="tags">
          <label className="input-label" htmlFor="title">
            title
          </label>
          <input className="input-field" {...title} name="title" />
        </div>
        <div className="tags">
          <label className="input-label" htmlFor="author">
            author
          </label>
          <input className="input-field" {...author} name="author" />
        </div>
        <div className="tags">
          <label className="input-label" htmlFor="dish">
            dish
          </label>
          <input className="input-field" {...dish} name="dish" />
        </div>
        <div className="tags">
          <label className="input-label" htmlFor="tags">
            tags
          </label>
          {profile.tags.map(t => {
            console.log("thetags2");
            console.log(thetags);
            const tag = thetags.value.find(tag => tag._id === t._id);
            const change = thetags.onChange;
            console.log("tag");
            console.log(tag);
            return (
              <input
                className="input-field"
                type="text"
                value={tag.item}
                // {...thetags}
                name="item"
                id={t._id}
                key={t._id}
                onChange={change}
              />
            );
          })}
        </div>
        <button className="button">Update Profile</button>
      </form>
      <pre>{JSON.stringify({ title, author, dish }, " ", 2)}</pre>
    </div>
  );
};

export default Test;
