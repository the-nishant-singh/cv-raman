import "./styles.css";
import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";

const NewApp = () => {
  const [allposts, setAllPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data);
      });
  });

  const moreDetailsHandler = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setCurrentPost(data);
      });
  };

  const renderPosts = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <>
            <div class="card w-100">
              <div class="card-body">
                <h5 class="card-title">{item.title}</h5>
                <button
                  class="btn btn-primary"
                  onClick={moreDetailsHandler.bind(this, item.id)}
                >
                  Get More Details
                </button>
              </div>
            </div>
          </>
        );
      });
    }
  };

  const renderMoredetails = (data) => {
    if (data) {
      return (
        <>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{data.title}</h5>
              <p class="card-text">{data.body}</p>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <p>Select a post to see more details</p>
        </>
      );
    }
  };

  return (
    <>
      <NavBar />
      <div className="conatiner">
        <div className="row">
          <div className="col-md-6 all__posts">
            <h1 className="text-center">Posts List</h1>
            {renderPosts(allposts)}
          </div>
          <div className="col-md-6 post__details">
            <h1 className="text-center">Posts Details</h1>
            {renderMoredetails(currentPost)}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewApp;
