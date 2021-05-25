const initialState = {
  todos: []
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case "ADDTODO":
      return {
        todos: [action.payload, ...state.todos]
      };
    default:
      return state;
  }
};

export default todos;
