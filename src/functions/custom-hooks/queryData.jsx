import { devApiUrl, devKey } from "../functions-general";

export const queryData = (endpoint, method = "get", fd = {}) => {
  let url = devApiUrl + endpoint;
  let username = devKey;
  let password = "";
  let auth = btoa(`${username}:${password}`);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic " + auth);
  myHeaders.append("Content-Type", "application/json");

  let options = {
    method,
    headers: myHeaders,
  };

  if (method !== "get") {
    options = {
      ...options,
      body: JSON.stringify(fd),
    };
  }

  const data = fetch(url, options)
    .then((res) => res.json())
    .then((result) => {
      if (result.success === false) {
        const errorMessage =
          result?.error?.error ||
          result?.data?.error ||
          result?.error ||
          result?.message ||
          "API Error";
        const error = new Error(errorMessage);
        error.response = result;
        throw error;
      }
      return result;
    });

  return data;
};
