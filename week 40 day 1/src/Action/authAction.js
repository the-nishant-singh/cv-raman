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

export { setUser, removeUser };
