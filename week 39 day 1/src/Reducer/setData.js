const initialState = {
  items: []
};

const updateData = (state = initialState, action) => {
  switch (action.type) {
    case "SETDATA":
      return {
        items: action.payload
      };
    default:
      return state;
  }
};

export default updateData;
