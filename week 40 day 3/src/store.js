import { createStore, applyMiddleware } from "redux";
import user from "./Reducer/userReducer";
import thunk from "redux-thunk";

const store = createStore(user, applyMiddleware(thunk));

export default store;
