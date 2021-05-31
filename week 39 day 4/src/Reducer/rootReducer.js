import { combineReducers } from "redux";
import auth from "./authReducer";
import video from "./videoReducer";

const rootReducer = combineReducers({
  auth,
  video
});

export default rootReducer;
