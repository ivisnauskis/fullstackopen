import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  console.log("notification", notification);
  const fullClassName = `notification ${
    notification.success ? "success" : "error"
  }`;
  return (
    notification.message && (
      <div className={fullClassName}>{notification.message}</div>
    )
  );
};

export default Notification;
