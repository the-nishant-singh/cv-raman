import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducer/rootReducer";

import thunk from "redux-thunk";

let Store = createStore(rootReducer, applyMiddleware(thunk));
export default Store;
