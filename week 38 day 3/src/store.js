import { createStore } from "redux";
import rootReducer from "./Reducer/rootReducer";

const store = createStore(rootReducer);
export default store;
