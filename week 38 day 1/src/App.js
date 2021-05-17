import "./styles.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewApp = () => {
  const [allposts, setAllPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data);
      });
  });

  const renderPosts = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <>
            <div class="card w-100">
              <div class="card-body">
                <h5 class="card-title">{item.title}</h5>
                <Link to={`/postDetails/${item.id}`}>Get More Details</Link>
              </div>
            </div>
          </>
        );
      });
    }
  };

  return (
    <>
      <div className="conatiner">
        <h1 className="text-center">Posts List</h1>
        {renderPosts(allposts)}
      </div>
      <div className="col-md-6 post__details"></div>
    </>
  );
};

export default NewApp;
