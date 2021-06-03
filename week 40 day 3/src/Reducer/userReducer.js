const initialState = {
  error: "",
  message: ""
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "USERERROR":
      return {
        error: action.payload.error,
        message: ""
      };
    case "USERMESSAGE":
      return {
        error: "",
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default user;
