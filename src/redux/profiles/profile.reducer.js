import * as profileActions from "./profile.action";

// profileReducer feature key
export const profileFeatureKey = "profile-info";

// initial state
let initialState = {
  loading: false,
  profile: {},
  errorMessage: "",
};

// profileReducer method
export const reducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    //
    //  Clear profile when click on Logout button
    case profileActions.CLEAR_PROFILE:
      return {
        ...state,
        profile: {}, // clear profie / keep the profile empty when we click on Logout
      };

    // Get Profile
    case profileActions.GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case profileActions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload.profile,
      };
    case profileActions.GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error,
      };

    // Delete experience
    case profileActions.DELETE_EXPERIENCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case profileActions.DELETE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload.profile,
      };
    case profileActions.DELETE_EXPERIENCE_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error,
      };

    // Delete Education
    case profileActions.DELETE_EDUCATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case profileActions.DELETE_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload.profile,
      };
    case profileActions.DELETE_EDUCATION_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error,
      };

    // add Profile
    case profileActions.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case profileActions.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload.profile, // payload.profile -> is my updatedprofile  comes from "profileAction.js"
        // -> dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data });  we're getting profile from server  at the update  'REDUX' profile
      };
    case profileActions.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error,
      };

    // Add Experience
    case profileActions.ADD_EXPERIENCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case profileActions.ADD_EXPERIENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload.profile, // payload.profile -> is my addEducation  comes from "profileAction.js"
        // -> dispatch({ type: ADD_EDUCATION_SUCCESS, payload: response.data });  we're adding Experience to server  to  'REDUX' profile
      };
    case profileActions.ADD_EXPERIENCE_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error,
      };

    // Add Education
    case profileActions.ADD_EDUCATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case profileActions.ADD_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload.profile, // payload.profile -> is my addEducation  comes from "profileAction.js"
        // -> dispatch({ type: ADD_EDUCATION_SUCCESS, payload: response.data });  we're adding Education to server  to  'REDUX' profile
      };
    case profileActions.ADD_EDUCATION_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error,
      };

    // Create Profile
    case profileActions.CREATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case profileActions.CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload.profile, // payload.profile -> is my CREATEdprofile  comes from "profileAction.js"
        // -> dispatch({ type: CREATE_PROFILE_SUCCESS, payload: response.data });  we're getting profile from server  at the CREATE  'REDUX' profile
      };
    case profileActions.CREATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error,
      };
    default:
      return state;
  }
};
