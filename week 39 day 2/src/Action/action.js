const addTodo = (payload) => {
  return{
    type:"ADDTODO",
    payload
  }
}

export {addTodo}