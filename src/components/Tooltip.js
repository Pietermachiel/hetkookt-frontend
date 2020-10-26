import React from "react";

const Tooltip = ({ children, text, ...rest }) => {
  const [show, setShow] = React.useState(false);

  const handleMouseEnter = (event) => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  };

  return (
    <div>
      <div
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => setShow(false)}
        {...rest}
      >
        {children}
      </div>{" "}
      <div className="tooltip" style={show ? { visibility: "visible" } : {}}>
        {text}
        <span className="tooltip-arrow" />
      </div>
    </div>
  );
};

export default Tooltip;
