const setToken = (payload) => {
  return {
    type: "SETTOKEN",
    payload
  };
};

const removeToken = (payload) => {
  return {
    type: "REMOVETOKEN",
    payload
  };
};

export { setToken, removeToken };
