const initialState = {
  name: "",
  email: ""
};

const userData = (state = initialState, action) => {
  switch (action.type) {
    case "SETUSER":
      return {
        name: action.payload.name,
        email: action.payload.email
      };
    case "REMOVEUSER":
      return {
        name: "",
        email: ""
      };
    default:
      return state;
  }
};

export default userData;
