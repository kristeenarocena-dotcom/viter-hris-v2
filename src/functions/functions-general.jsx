import React from "react";

export const urlPath = "http://localhost/react-vite/viter-hris";
export const devApiUrl = urlPath + "/rest";
export const devNavUrl = "";
export const apiVersion = "/v1";

export const setTimezone = "Asia/Manila";

// ROLES VARIABLE
export const urlDeveloper = "developer";

// dev API KEY
export const devKey = "123devkey";

// format the numbers separated by comma
export const isEmptyItem = (item, x = "") => {
  let result = x;

  if (typeof item !== "undefined" && item !== "") {
    result = item;
  }
  return result;
};

export const formatDate = (dateVal, val = "", format = "") => {
  const formatedDate = val;
  if (typeof dateVal !== "undefined" && dateVal !== "") {
    // formatting date
    const event = new Date(dateVal);

    return event.toLocaleString("en", dateOptions(format));
  }
  return formatedDate;
};

export const dateOptions = (format = "") => {
  const options = { month: "long", day: "numeric", year: "numeric" };
  if (format == "short-date") {
    return {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
  }
  return options;
};

export const handleEscape = (handleClose) => {
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  });
};

// get focus on a button
export const GetFocus = (id) => {
  React.useEffect(() => {
    const obj = document.getElementById(id);
    obj.focus();
  }, []);
};
