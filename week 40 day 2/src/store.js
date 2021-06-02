import rootReducer from "./Reducer/rootReducer";
import thunk from "redux-thunk";
const { createStore, applyMiddleware } = require("redux");

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
