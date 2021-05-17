import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav class="navbar navbar-dark bg-dark mb-5">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Blog App
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
