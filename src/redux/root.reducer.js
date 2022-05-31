//  root-Reducerv will holds all component specific reducer at one place
//  configure "rootReducer" -> in 'store.js'  &&  "store" -> in 'index.js'

import { combineReducers } from "redux";
import * as developerReducer from "./developers/developer.reducer";
import * as userreducer from "./users/userReducer";
import * as alertReducer from "./alert/alert.reducer";
import * as profileReducer from "./profiles/profile.reducer";
import * as postReducer from "./posts/post.reducer";

export const rootReducer = combineReducers({
  // configure 'reducer()' -> w/o ()  in this file (roo.reducer.js) to 👍 👍 'state available' 👍 👍 for my whole application
  [developerReducer.developerFeatureKey]: developerReducer.reducer,
  [userreducer.userFeatureKey]: userreducer.reducer,
  [alertReducer.alertFeatureKey]: alertReducer.reducer, // "alertReducer.reducer" -> insert alertreducer initial state in the  STORE
  [profileReducer.profileFeatureKey]: profileReducer.reducer, // "profileReducer.profileFeatureKey" -> profile-info  &&  "profileReducer.reducer" -> insert profileReducer initial-state
  [postReducer.postsFeatureKey]: postReducer.reducer,
});
