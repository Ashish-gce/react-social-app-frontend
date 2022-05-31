import axios from "axios";
//   if Register user successful then we dispatch an action
import * as alertActions from "../alert/alert.action";
import * as userUtil from "../../util/userUtil";
import * as authUtil from "../../util/authUtil";

import * as profileActions from "../profiles/profile.action";

//  //  //  //  action types of user-registration  //  //  //  //
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

//  action types of user-login
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

//  action types of get user-info
export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILURE = "GET_USER_INFO_FAILURE";

// action types of user-logout
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE";

//  //  'registerUser()' -> providing user-details i.e. user-object  &&  'history' -> to redirect to "LOGIN" page after registration
export const registerUser = (user, navigate) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      let dataurl = `/api/users/register`;
      let response = await axios.post(dataurl, user); // post() -> sending "dataurl" and "user"/content object to the server by url
      dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data });

      //  setAlert  -> dispatch() an alert to display the message of registration success
      dispatch(alertActions.setAlert("Registration is success", "success"));

      navigate("/users/login"); // after registeration successful page redirect / push to 'login page'
    } catch (error) {
      console.error(error);
      dispatch({ type: REGISTER_USER_FAILURE, payload: { error: error } });
    }
  };
};

//  //  'loginUser()' -> providing user-details i.e. user-object  &&  'navigate' -> to redirect to "Dashboard" page after login successful
export const loginUser = (user, navigate) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_USER_REQUEST });
      let dataurl = `/api/users/login`;
      let response = await axios.post(dataurl, user); // post() -> in post() we providing same user data to the server
      dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data }); // once login success -> it'ii keep the token to the local storage

      //  setAlert  -> dispatch() an alert to display the message of registration success
      dispatch(alertActions.setAlert("Login is success", "success"));

      dispatch(getUserInfo()); // getting user info directly  b'z  getUserInfo() looking for token and then dispatch
      // 'dashboard' => dashboard of the person who is login
      navigate("/profiles/dashboard"); // after successful from this page we directly go to the "Dashboard" page
    } catch (error) {
      console.error(error);
      dispatch({ type: LOGIN_USER_FAILURE, payload: { error: error } });
    }
  };
};

// private Request -> get a single request
export const getUserInfo = () => {
  return async (dispatch) => {
    try {
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken(); // here we receive token
        authUtil.setAuthToken(token); // here we set our token to "x-auth-token" -> authUtil.js

        dispatch({ type: GET_USER_INFO_REQUEST });
        let dataurl = `/api/users/me`;
        let response = await axios.get(dataurl); // post() -> in post() we providing same user data to the server
        dispatch({ type: GET_USER_INFO_SUCCESS, payload: response.data }); // getting response back from the server
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: GET_USER_INFO_FAILURE, payload: { error: error } });
    }
  };
};

// logout user request
export const logoutUser = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGOUT_USER });

      //  dispatch() -> new action to CLEAR_PROFILE, when user's LOGOUT
      dispatch(profileActions.clearProfile());

      navigate("/");
    } catch (error) {
      console.error(error);
      dispatch({ type: LOGOUT_USER_FAILURE });
    }
  };
};
