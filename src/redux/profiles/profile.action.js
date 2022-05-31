import axios from "axios";
import * as userUtil from "../../util/userUtil";
import * as authUtil from "../../util/authUtil";

// import  ALERT folder
import * as alertActions from "../alert/alert.action";

// we should clear profile when user LogOut from the site, otherwise it show's previous loggedin user's data
//  //  but, we're clearing the profile locally  click on Logout -> clear the profile
export const CLEAR_PROFILE = "CLEAR_PROFILE";

//  Actions type
//  here we performing actions for  "Logged-in"  user's has it's own profile or not ?
//   below action we performed for  profileRouter
export const GET_PROFILE_REQUEST = "GET_PROFILE_REQUEST";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_FAILURE = "GET_PROFILE_FAILURE";

// Update profile -> editProfile.js
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

// Create a profile
export const CREATE_PROFILE_REQUEST = "CREATE_PROFILE_REQUEST";
export const CREATE_PROFILE_SUCCESS = "CREATE_PROFILE_SUCCESS";
export const CREATE_PROFILE_FAILURE = "CREATE_PROFILE_FAILURE";

//  Add experience
export const ADD_EXPERIENCE_REQUEST = "ADD_EXPERIENCE_REQUEST";
export const ADD_EXPERIENCE_SUCCESS = "ADD_EXPERIENCE_SUCCESS";
export const ADD_EXPERIENCE_FAILURE = "ADD_EXPERIENCE_FAILURE";

//  Add education
export const ADD_EDUCATION_REQUEST = "ADD_EDUCATION_REQUEST";
export const ADD_EDUCATION_SUCCESS = "ADD_EDUCATION_SUCCESS";
export const ADD_EDUCATION_FAILURE = "ADD_EDUCATION_FAILURE";

// Delete an experience by experience_id
export const DELETE_EXPERIENCE_REQUEST = "DELETE_EXPERIENCE_REQUEST";
export const DELETE_EXPERIENCE_SUCCESS = "DELETE_EXPERIENCE_SUCCESS";
export const DELETE_EXPERIENCE_FAILURE = "DELETE_EXPERIENCE_FAILURE";

// Delete an education by education_id
export const DELETE_EDUCATION_REQUEST = "DELETE_EDUCATION_REQUEST";
export const DELETE_EDUCATION_SUCCESS = "DELETE_EDUCATION_SUCCESS";
export const DELETE_EDUCATION_FAILURE = "DELETE_EDUCATION_FAILURE";

// clearProfile() method  ->  clear the profile when user's logout
export const clearProfile = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: CLEAR_PROFILE });
    } catch (error) {
      console.error(error);
    }
  };
};

//  get profile of a particular user
export const getProfile = () => {
  return async (dispatch) => {
    try {
      //   since,  "api/profiles/me" -> PRIVATE url so, we need to verify / authenticate the user's before create profile
      //    for PRIVATE req. we've to attach the 'token' -> for authentication purpose
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: GET_PROFILE_REQUEST });
        //    NOTE:- 💯💯💯  'api/profile/me' -> link is  PRIVATE request -> So, we've to attach the  Token  to verify the user's is  Authorized and create his profile
        let dataurl = "/api/profiles/me"; // comes from 'profileRouter.js' -> to get my own profile
        let response = await axios.get(dataurl);
        dispatch({ type: GET_PROFILE_SUCCESS, payload: response.data }); // 'payload: response.data' -> we get this data from  "profileRouter" -> {profile: profile}
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: GET_PROFILE_FAILURE, payload: { error: error } });
    }
  };
};

//  action of delete experience
export const deleteExperience = (experienceId) => {
  console.log("**********************************************");
  console.log(experienceId);
  return async (dispatch) => {
    try {
      //   since,  "api/profiles/experience/:experienceId" -> PRIVATE url so, we need to verify / authenticate the user's before deleting
      //     PRIVATE req. we've to attach the 'token' -> for authentication purpose
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: DELETE_EXPERIENCE_REQUEST });
        //    NOTE:- 💯💯💯  'api/profiles/experience/:experienceId' -> link is  PRIVATE request -> So, we've to attach the  Token  to verify the user's is  Authorized and create his profile
        let dataurl = `/api/profiles/experience/${experienceId}`; // comes from 'profileRouter.js'
        let response = await axios.delete(dataurl, experienceId);

        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log(response);

        dispatch({ type: DELETE_EXPERIENCE_SUCCESS, payload: response.data });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: DELETE_EXPERIENCE_FAILURE, payload: { error: error } });

      // 💻 ♻️ 💻 ♻️ Once, we delete the experience i want  to dispatch an action for 'Alert' message
      dispatch(
        alertActions.setAlert("Experience is Deleted successfully", "success")
      );
    }
  };
};

//  action of delete education
export const deleteEducation = (educationId) => {
  return async (dispatch) => {
    try {
      //   since,  "api/profiles/education/:educationId" -> PRIVATE url so, we need to verify / authenticate the user's before deleting
      //     PRIVATE req. we've to attach the 'token' -> for authentication purpose
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: DELETE_EDUCATION_REQUEST });
        //    NOTE:- 💯💯💯  'api/profiles/education/:educationId' -> link is  PRIVATE request -> So, we've to attach the  Token  to verify the user's is  Authorized and create his profile
        let dataurl = `/api/profiles/education/${educationId}`; // comes from 'profileRouter.js'
        let response = await axios.delete(dataurl);
        dispatch({ type: DELETE_EDUCATION_SUCCESS, payload: response.data });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: DELETE_EDUCATION_FAILURE, payload: { error: error } });

      // 💻 ♻️ 💻 ♻️ Once, we delete the Education i want  to dispatch an action for 'Alert' message
      dispatch(
        alertActions.setAlert("Education is Deleted successfully", "success")
      );
    }
  };
};

// action of updateProfile -> editProfile.js  'profile' -> for updating fields, 'navigate' -> redirect to dashboard page
export const updateProfile = (profile, navigate) => {
  return async (dispatch) => {
    try {
      //   since,  "api/profiles/me" -> PRIVATE url so, we need to verify / authenticate the user's before create profile
      //    for PRIVATE req. we've to attach the 'token' -> for authentication purpose
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: UPDATE_PROFILE_REQUEST });
        //    NOTE:- 💯💯💯  'api/profile/me' -> link is  PRIVATE request -> So, we've to attach the  Token  to verify the user's is  Authorized and create his profile
        let dataurl = "/api/profiles/"; // comes from 'profileRouter.js' -> to get my own profile
        let response = await axios.put(dataurl, profile);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data }); // 'payload: response.data' -> we get this data from  "profileRouter" -> {profile: profile}
        dispatch(
          alertActions.setAlert("Profile is updated successfully", "success")
        );
        navigate("/profiles/dashboard");
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: UPDATE_PROFILE_FAILURE, payload: { error: error } });
    }
  };
};

//  addExperience(experience, navigate) => accept 2-arguments coming from  'AddExperience.js' file
// action of "addExperience" -> AddExperience.js  'experience' -> add to the server, 'navigate' -> after adding experience redirect page to dashboard page
export const addExperience = (experience, navigate) => {
  return async (dispatch) => {
    try {
      //   since,  "api/profiles/experience/" -> PRIVATE url so, we need to verify / authenticate the user's before before adding experience
      //    for PRIVATE req. we've to attach the 'token' -> for authentication purpose
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: ADD_EXPERIENCE_REQUEST });
        //    NOTE:- 💯💯💯  api/profiles/experience/ -> link is  PRIVATE request -> So, we've to attach the  Token  to verify the user's is  Authorized and create his profile
        let dataurl = "/api/profiles/experience"; // comes from 'profileRouter.js' -> to get my own profile
        let response = await axios.put(dataurl, experience); // "experience" -> object coming from  'AddExperience' file
        dispatch({ type: ADD_EXPERIENCE_SUCCESS, payload: response.data }); // 'payload: response.data' -> we get this data from  "profileRouter" -> {profile: profile}
        dispatch(
          alertActions.setAlert("Experience Added successfully", "success")
        );
        navigate("/profiles/dashboard");
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: ADD_EXPERIENCE_FAILURE, payload: { error: error } });
    }
  };
};

//  addEducation(education, navigate) => accept 2-arguments coming from  'AddEducation.js' file
// action of "addEducation" -> AddEducation.js  'education' -> add to the server, 'navigate' -> after adding education redirect page to dashboard page
export const addEducation = (education, navigate) => {
  return async (dispatch) => {
    try {
      //   since,  "api/profiles/education/" -> PRIVATE url so, we need to verify / authenticate the user's before adding education
      //    for PRIVATE req. we've to attach the 'token' -> for authentication purpose
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: ADD_EDUCATION_REQUEST });
        //    NOTE:- 💯💯💯  api/profiles/education/ -> link is  PRIVATE request -> So, we've to attach the  Token  to verify the user's is  Authorized and adding his education
        let dataurl = "/api/profiles/education/"; // comes from 'profileRouter.js' -> to add education
        let response = await axios.put(dataurl, education); // "education" -> object coming from  'AddEducation' file
        dispatch({ type: ADD_EDUCATION_SUCCESS, payload: response.data }); // 'payload: response.data' -> we get this data from  "profileRouter" -> {profile: profile}
        dispatch(
          alertActions.setAlert("Education is Added successfully", "success")
        );
        navigate("/profiles/dashboard");
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: ADD_EDUCATION_FAILURE, payload: { error: error } });
    }
  };
};

// action of Create Profile -> createProfile.js  'profile' -> for create fields, 'navigate' -> redirect to dashboard page after profile creation
export const createProfile = (profile, navigate) => {
  return async (dispatch) => {
    try {
      //   since,  "api/profiles/me" -> PRIVATE url so, we need to verify / authenticate the user's before create profile
      //    for PRIVATE req. we've to attach the 'token' -> for authentication purpose
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: CREATE_PROFILE_REQUEST });
        //    NOTE:- 💯💯💯  '/api/profile' -> link is  PRIVATE request -> So, we've to attach the  Token  to verify the user's is  Authorized and create his profile
        let dataurl = "/api/profiles/"; // comes from 'profileRouter.js' -> to get my own profile
        let response = await axios.post(dataurl, profile);
        dispatch({ type: CREATE_PROFILE_SUCCESS, payload: response.data }); // 'payload: response.data' -> we get this data from  "profileRouter" -> {profile: profile}
        dispatch(
          alertActions.setAlert("Profile is Created successfully", "success")
        );
        navigate("/profiles/dashboard");
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: CREATE_PROFILE_FAILURE, payload: { error: error } });
    }
  };
};
