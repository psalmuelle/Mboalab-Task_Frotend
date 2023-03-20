import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const rootReducers = combineReducers({
    user: userReducer,

})



export default configureStore(
  {reducer:rootReducers}
)