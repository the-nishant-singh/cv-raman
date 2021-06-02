import { combineReducers } from "redux";
import userAuth from "./authReducer";
import userData from "./userReducer";

const rootReducer = combineReducers({ userAuth, userData });

export default rootReducer;
