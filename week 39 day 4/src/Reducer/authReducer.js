const initialState = {
  token: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "SETTOKEN":
      return { token: action.payload };
    case "REMOVETOKEN":
      return { token: null };
    default:
      return state;
  }
};

export default auth;
