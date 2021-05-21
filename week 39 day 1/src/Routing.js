import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";

const Routing = () => {
  return (
    <BrowserRouter>
      <Route exact path="/products" component={App} />
    </BrowserRouter>
  );
};

export default Routing;
