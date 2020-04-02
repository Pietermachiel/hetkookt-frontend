import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className={name}>
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <input className="input-field" {...rest} name={name} id={name} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
