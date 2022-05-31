import axios from "axios";

//  action types  ->  it deals with server side  "API"  calls

//  fetch all developer's request
export const FETCH_ALL_DEVELOPERS_REQUEST = "FETCH_ALL_DEVELOPERS_REQUEST";
export const FETCH_ALL_DEVELOPERS_SUCCESS = "FETCH_ALL_DEVELOPERS_SUCCESS";
export const FETCH_ALL_DEVELOPERS_FAILURE = "FETCH_ALL_DEVELOPERS_FAILURE";

//  fetch single developer request
export const FETCH_DEVELOPER_REQUEST = "FETCH_DEVELOPER_REQUEST";
export const FETCH_DEVELOPER_SUCCESS = "FETCH_DEVELOPER_SUCCESS";
export const FETCH_DEVELOPER_FAILURE = "FETCH_DEVELOPER_FAILURE";

//  fetch all developers   "fetchAllDevelopers()"   -> this method we call as a  dispatch(fetchAllDevelopers()) -> from developerList.js file
export const fetchAllDevelopers = () => {
  //  'fetchAllDevelopers' return another async function
  return async (dispatch) => {
    try {
      //   dispatching an action for request
      dispatch({ type: FETCH_ALL_DEVELOPERS_REQUEST });
      let dataurl = "/api/profiles/all"; // "dataurl" -> partial b'z already we configured "proxy" in package.json file (http://127.0.0.1:5000)
      let response = await axios.get(dataurl); // "await" -> it should wait for the response

      // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      // console.log(response);

      //   dispatching an action if request got successful
      dispatch({ type: FETCH_ALL_DEVELOPERS_SUCCESS, payload: response.data }); // "response.data" -> returns  "profiles" object from database (server)  and it is accessed by  ->  'payload.profiles'
    } catch (error) {
      console.error(error);
      //   dispatching an action when something happens wrong
      dispatch({
        type: FETCH_ALL_DEVELOPERS_FAILURE,
        payload: { error: error },
      });
    }
  };
};

// fetchDeveloper() -> function get a parameter i.e. -> specific / particular developerId / developerId to fetch that's profile
export const fetchDeveloper = (developerId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_DEVELOPER_REQUEST });
      let dataurl = `/api/profiles/${developerId}`; //  fetching particular developer url  "developerId" -> developer-id
      let response = await axios.get(dataurl); // we simply fetch this req. b'z request is  PUBLIC

      // console.log("============== Developer Action ==================");
      // console.log(response);

      dispatch({ type: FETCH_DEVELOPER_SUCCESS, payload: response.data }); // dispatching an action for successful response  "response.data" -> 'data' is an object with profile
    } catch (error) {
      console.error(error);
      dispatch({ type: FETCH_DEVELOPER_FAILURE, payload: { error: error } });
    }
  };
};
