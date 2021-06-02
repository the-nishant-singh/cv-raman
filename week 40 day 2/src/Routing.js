import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";

const Routing = (props) => {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
      </BrowserRouter>
    </>
  );
};

export default Routing;
