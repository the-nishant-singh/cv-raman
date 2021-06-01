const initialState = {
  user: {}
};

const userdata = (state = initialState, action) => {
  switch (action.type) {
    case "SETUSER":
      return {
        user: action.payload
      };
    case "REMOVEUSER":
      return {
        user: {}
      };
    default:
      return state;
  }
};

export default userdata;
