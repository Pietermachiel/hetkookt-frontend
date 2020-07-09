import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className={`formgroup ${name}`}>
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <input
        {...rest}
        name={name}
        id={name}
        className="form-control input-field__user"
      />
      {error && <div className="alert alert-danger font-700">{error}</div>}
    </div>
  );
};

export default Input;
