//  //  //   How we display this Alert -> We need to make a component -> "Alert" and receive data in them (provide data from STORE to Alert) and display
//  //       through an Alert-message  with corresponding color combination

import { v4 } from "uuid";

//  Alert! action types
export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVEALERT";

//  alert! action method
export const setAlert = (message, color) => {
  // setAlert() -> takes 2-arg. -> 1. 'message'-what's message display,  2. 'colour'-in which colour
  return async (dispatch) => {
    try {
      //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
      // here we don't write any  request, success, and failure  b'z it's Local state management not server and all
      let id = v4(); // call v4() -> and store "uniqueId" in local variable 'id'
      dispatch({ type: SET_ALERT, payload: { message, color, id } }); // particular error message display with an id

      //   after display error message, after few seconds remove "id"
      setTimeout(() => {
        dispatch({ type: REMOVE_ALERT, payload: { id } }); // NOTE:- set alert and enternally 'removes' the alert
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };
};
