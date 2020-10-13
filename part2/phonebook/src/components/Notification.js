import React from "react";
import "../index.css";

const Notification = ({ message, isError }) => {
  return (
    message && (
      <div className={`notification ${isError ? "error" : "success"}`}>
        {message}
      </div>
    )
  );
};

export default Notification;
