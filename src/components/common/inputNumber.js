import React from "react";

const InputNumber = ({ value, name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <p {...rest} name={name} id={name} className="form-control">
        {value}
      </p>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default InputNumber;
