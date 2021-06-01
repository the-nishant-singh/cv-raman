import { combineReducers } from "redux";
import userdata from "./authReducer";

const rootReducer = combineReducers({ userdata });

export default rootReducer;
