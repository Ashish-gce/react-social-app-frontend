// evaluate the login
export const isLoggedIn = () => {
  //  "react-social-token" ->  localStorage.removeItem("react-social-token") -> userReducer.js  ->  Login a user
  return !!localStorage.getItem("react-social-token"); // if token is available then it returns 'true' otherwisw return false
};

// by this we get the token
// if login is successful then we get the 'token' which is present in local storage
export const getToken = () => {
  return localStorage.getItem("react-social-token");
};
