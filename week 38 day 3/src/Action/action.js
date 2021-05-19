const getOlder = (payload) => {
  return {
    type: "GETOLDER",
    payload
  };
};

const getYounger = (payload) => {
  return {
    type: "GETYOUNGER",
    payload
  };
};

export { getOlder, getYounger };
