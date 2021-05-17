import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./Navbar";
import App from "./App";
import PostDetails from "./PostDetails";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Route exact path="/" component={App} />
        <Route path="/postDetails/:id" component={PostDetails} />
      </BrowserRouter>
    </>
  );
};

export default Routing;
