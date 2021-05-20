import ReactDOM from "react-dom";

import Routing from "./Routing";
import Store from "./Store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={Store}>
    <Routing />
  </Provider>,
  rootElement
);
