import "./styles.css";
import React from "react";
import NavBar from "./Navbar";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allposts: [],
      currentPost: {}
    };
  }

  moreDetailsHandler = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ currentPost: data });
        console.log(this.state.currentPost);
      });
  };

  renderPosts = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <>
            <div class="card w-100">
              <div class="card-body">
                <h5 class="card-title">{item.title}</h5>
                <button
                  class="btn btn-primary"
                  onClick={this.moreDetailsHandler.bind(this, item.id)}
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

  renderMoredetails = (data) => {
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

  render() {
    return (
      <>
        <NavBar />
        <div className="conatiner">
          <div className="row">
            <div className="col-md-6 all__posts">
              <h1 className="text-center">Posts List</h1>
              {this.renderPosts(this.state.allposts)}
            </div>
            <div className="col-md-6 post__details">
              <h1 className="text-center">Posts Details</h1>
              {this.renderMoredetails(this.state.currentPost)}
            </div>
          </div>
        </div>
      </>
    );
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ allposts: data });
      });
  }
}

export default App;
