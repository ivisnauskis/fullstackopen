import React from "react";

const Notification = ({ message, isSuccess }) => {
  const fullClassName = `notification ${isSuccess ? "success" : "error"}`;
  return message && <div className={fullClassName}>{message}</div>;
};

export default Notification;
