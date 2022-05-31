import * as developerActions from "./developer.actions";

//  //  reducer contains 3-things

//  1. featurekey
export const developerFeatureKey = "developer-info";

//  2. initial state
let initialState = {
  loading: false, // to display the spinners
  profiles: [],
  selectedProfile: {}, // display single particular developer profile
  errorMessage: "",
};

//  3. reducer () function  ->  it takes 2-arguments.  1. initialState  2.action

//  //  configure reducer() with  "root.reducer.js"  to make 'state' available for the whole application
export const reducer = (state = initialState, action) => {
  let { type, payload } = action; // object distructuring

  switch (type) {
    //  //  fetchig all developers
    case developerActions.FETCH_ALL_DEVELOPERS_REQUEST:
      return {
        ...state, // holds the existing data
        loading: true, // display the spinner
      };
    case developerActions.FETCH_ALL_DEVELOPERS_SUCCESS: // getting data from the server
      return {
        ...state, // holds the existing data
        loading: false, // off the spinner

        // now, coming data (profiles) we keep it in the  "STORE"  and then display it on the page
        profiles: payload.profiles, // adding data to our local 'profiles', by this  "payload.profiles" ->  comes from database (server)
      };
    case developerActions.FETCH_ALL_DEVELOPERS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error,
      };

    //  //  fetch single developer by that's developer_id
    case developerActions.FETCH_DEVELOPER_REQUEST:
      return {
        ...state, // holds the existing data
        loading: true, // display the spinner
      };
    case developerActions.FETCH_DEVELOPER_SUCCESS: // getting data from the server
      return {
        ...state,
        loading: false, // off the spinner

        // now, coming data (selectedProfile) we keep it in the  "STORE"  and then display it on the page
        selectedProfile: payload.profile, //  "selectedProfile" -> coming from server, by this  "payload.profile" ->  comes from database (server)
      };
    case developerActions.FETCH_DEVELOPER_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error,
      };
    //   default case return the state as it is
    default:
      return state;
  }
};
