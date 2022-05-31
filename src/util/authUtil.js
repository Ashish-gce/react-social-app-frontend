import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    // store the "Token" in the local JavaScript file  ->  Application -> Local-Storage
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
