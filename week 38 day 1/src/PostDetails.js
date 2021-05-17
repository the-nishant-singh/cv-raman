import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostDetails = (props) => {
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${props.match.params.id}`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentPost(data);
      });
  }, []);

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
      <div>
        <h1 className="text-center">Posts Details</h1>
        {renderMoredetails(currentPost)}
        <Link class="navbar-brand" to="/">
          Go Back to Post List
        </Link>
      </div>
    </>
  );
};

export default PostDetails;
