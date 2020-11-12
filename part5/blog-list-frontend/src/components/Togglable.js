import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  var hideWhenVisible = { display: visible ? "" : "none" };
  var showWhenVisible = { display: visible ? "none" : "" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={showWhenVisible}>
        <button id="togglableButton" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={hideWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
