const signUp = (user) => {
  return (dispatch) => {
    fetch("http://localhost:3650/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((data) => {
        data.error ? dispatch(userError(data)) : dispatch(userMessage(data));
      });
  };
};

const userError = (payload) => {
  return { type: "USERERROR", payload };
};

const userMessage = (payload) => {
  return { type: "USERMESSAGE", payload };
};

export { signUp };
