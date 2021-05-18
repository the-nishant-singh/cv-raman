const redux = require("redux");
const axios = require("axios");
const createStore = redux.createStore;

const initialState = {
  posts: [],
  counter: 0,
  userInfo: {},
};

const reducer = (state, action) => {
  state = state || initialState;
  if (action.type === "INCREMENT") {
    return {
      posts: state.posts,
      counter: state.counter + action.payload,
      userInfo: state.userInfo,
    };
  }
  if (action.type === "DECREMENT") {
    return {
      posts: state.posts,
      counter: state.counter - action.payload,
      userInfo: state.userInfo,
    };
  }
  if (action.type === "ADDPOSTS") {
    return {
      posts: action.payload,
      counter: state.counter,
      userInfo: state.userInfo,
    };
  }
  if (action.type === "ADDUSERINFO") {
    return {
      posts: state.posts,
      counter: state.counter,
      userInfo: action.payload,
    };
  }
};

const incrementCounter = (payload) => ({
  type: "INCREMENT",
  payload,
});

const decrementAction = (payload) => ({
  type: "DECREMENT",
  payload,
});

const addPosts = (payload) => ({
  type: "ADDPOSTS",
  payload,
});

const fetchPosts = (payload) => {
  axios
    .get("http://jsonplaceholder.typicode.com/posts")
    .then((response) => store.dispatch(addPosts(response.data)));
};

const addUserInfo = (payload) => ({
  type: "ADDUSERINFO",
  payload,
});

const fetchUserInfo = (payload) => {
  axios
    .get("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => store.dispatch(addUserInfo(response.data)));
};

const store = createStore(reducer);
store.subscribe(() => {
  console.log("LISTENING TO THE CHANGES ==> ", store.getState());
});

store.dispatch(incrementCounter(1));
store.dispatch(incrementCounter(2));
store.dispatch(incrementCounter(1));
store.dispatch(decrementAction(1));
store.dispatch(decrementAction(1));
fetchPosts();
fetchUserInfo();
