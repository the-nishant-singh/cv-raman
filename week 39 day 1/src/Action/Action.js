const setData = (payload) => {
  return {
    type: "SETDATA",
    payload
  };
};

const fetchData = () => {
  return function (dispatch) {
    fetch("https://fakestoreapi.com/products", { method: "GET" })
      .then((res) => res.json())
      .then((data) => dispatch(setData(data)));
  };
};

export { fetchData };
