const loginuser = (user) => {
  return function (dispatch) {
    fetch("http://localhost:3650/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.auth) {
          localStorage.setItem("ltk", data.Accesstoken);
          dispatch(setAuth(data));
        } else {
          dispatch(setError(data));
        }
      });
  };
};

const setAuth = (payload) => {
  return {
    type: "SETAUTH",
    payload
  };
};

const setError = (payload) => {
  return {
    type: "SETERROR",
    payload
  };
};

const removeUsertoken = () => {
  return (dispatch) => {
    localStorage.removeItem("ltk");
    dispatch(removeAuth());
  };
};

const removeAuth = (payload) => {
  return {
    type: "REMOVEUSER",
    payload
  };
};

export { loginuser, removeUsertoken };
