const initialState = {
  status: false,
  error: ""
};

const userAuth = (state = initialState, action) => {
  switch (action.type) {
    case "SETAUTH":
      return {
        status: true,
        error: ""
      };
    case "SETERROR":
      return {
        status: false,
        error: action.payload.error
      };
    case "REMOVEUSER":
      return {
        status: false,
        error: ""
      };
    default:
      return state;
  }
};

export default userAuth;
