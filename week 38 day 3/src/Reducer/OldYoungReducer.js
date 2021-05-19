const initialState = {
  age: 18
};

const updateAge = (state = initialState, action) => {
  switch (action.type) {
    case "GETOLDER":
      return {
        age: state.age + action.payload
      };
    case "GETYOUNGER":
      return {
        age: state.age - action.payload
      };
    default:
      return state;
  }
};

export default updateAge;
