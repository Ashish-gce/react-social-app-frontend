import * as userActions from "./user.action";

//  feature-key
export const userFeatureKey = "user-info";

//  initial-state
let initialState = {
  loading: false,
  token: "", // store each token locally for authentication purpose -> who is logged-in
  user: {},
  isAuthenticated: true, // b'z this particular guy's is authenticated: false,
  errorMessage: "",
};

//  reducer() -> takes 2-arg.  1. -> initial-state  2. -> action  as in argument
export const reducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    //  Register a user
    case userActions.REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userActions.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case userActions.REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error,
      };

    //  Login a user
    case userActions.LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userActions.LOGIN_USER_SUCCESS:
      // if user "login" success, we get the token from 'local-storage'
      // "payload.token" -> value comes from  'userRouter' create token
      localStorage.setItem("react-social-token", payload.token); // "payload.token" -> is the value of 'react-social-token'
      return {
        ...state,
        loading: false,
        // private user request
        token: payload.token, // token add to local storage
        isAuthenticated: true, // b'z this guy's has been authenticated
      };

    // if login failure then we 'remove' the token
    case userActions.LOGIN_USER_FAILURE:
      localStorage.removeItem("react-social-token");
      return {
        ...state,
        loading: false,
        // user: {}, // login failure then  userInfo  is empty
        token: "",
        isAuthenticated: false,
        //  below data comes from  'user.action'
        errorMessage: payload.error, // since payload contains error message
      };

    //  Get specific user info
    case userActions.GET_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userActions.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        // when user get success to login keep that's data in the local stotre
        user: payload.user,
        isAuthenticated: true, // b'z this guy's has been authenticated
      };

    // if users get fail to login
    case userActions.GET_USER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        user: {}, // user's object empty -> login fail
        isAuthenticated: false,
        //  below data comes from  'user.action'
        errorMessage: payload.error, // since payload contains error message
      };

    // User's Logout
    case userActions.LOGOUT_USER:
      localStorage.removeItem("react-social-token"); // remove token from Local-storage
      return {
        ...state, // keep holding of existing data
        loading: false,
        user: {}, // if user  logout -> then remove user information
        token: "",
        isAuthenticated: false,
      };
    case userActions.LOGOUT_USER_FAILURE:
      return {
        ...state, // there is no change in the state -> if logout fails
      };

    //   ♟️ 🚗 🚌 Never forget to write default case oterwise we get an error
    default: // if no action performed then default case execute
      return state;
  }
};
