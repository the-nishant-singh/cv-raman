import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Routing from "./Routing";
import store from "./store";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>,
  rootElement
);
