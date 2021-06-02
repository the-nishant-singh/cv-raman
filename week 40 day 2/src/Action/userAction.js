const getUser = () => {
  return (dispatch) => {
    if (localStorage.getItem("ltk")) {
      fetch("http://localhost:3650/user", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("ltk")
        }
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setUser(data));
        });
    }
  };
};

const setUser = (payload) => {
  return {
    type: "SETUSER",
    payload
  };
};

const removeUser = (payload) => {
  return {
    type: "REMOVEUSER",
    payload
  };
};

export { getUser, removeUser };
