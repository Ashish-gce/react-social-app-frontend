import * as alertActions from "../alert/alert.action";

//  feature key
export const alertFeatureKey = "alert-info";

//  initial state
//  initialState is an object of array -> contains different alert messages
let initialState = {
  messages: [],
};

//  reducer function
export const reducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case alertActions.SET_ALERT:
      return {
        ...state,
        messages: [...state.messages, payload], //  payload -> { messages, colour, id } is a whole object that we substitute in 'array' as it is.
      };
    case alertActions.REMOVE_ALERT:
      return {
        ...state,
        //   here,  HOW we remove another alert messages
        messages: [...state.messages.filter((msg) => msg.id !== payload.id)],
      };
    //   ♟️ 🚗 🚌 Never forget to write default case oterwise we get an error
    default: // if no action performed then default case execute
      return state;
  }
};
