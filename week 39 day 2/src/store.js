import { createStore } from "redux";
import rootReducer from "./Reducers/rootReducer";
// import todos from './Reducers/todoReducer'

const store = createStore(rootReducer);
export default store;
