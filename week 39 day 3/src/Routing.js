import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Profile from "./Profile";
import Videos from "./Videos";

const Routing = (props) => {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={App} />
      <Route path="/profile" component={Profile} />
      <Route path="/videos" component={Videos} />
      <Footer />
    </BrowserRouter>
  );
};

export default Routing;
