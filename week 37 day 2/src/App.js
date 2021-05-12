import React, { useState } from "react";
import "./styles.css";

const NewAppComponent = (props) => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const renderList = (props) => {
    if (todoList) {
      return todoList.map((item) => {
        return (
          <>
            <li className="list-group-item">{item}</li>
          </>
        );
      });
    }
  };

  const handleAddtodo = () => {
    if (todo) {
      setTodoList([todo, ...todoList]);
      setTodo("");
    }
    console.log(todo);
    console.log(todoList);
  };

  return (
    <>
      <div className="container">
        <h1>Todo List</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Todo"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <button
            className="btn btn-primary"
            type="button"
            id="button-addon2"
            onClick={handleAddtodo}
          >
            Add-To-Do
          </button>
        </div>
        <div className="mt-3" style={{ background: "#ccc", padding: "10px" }}>
          <ul className="list-group">{renderList()}</ul>
        </div>
      </div>
    </>
  );
};

export default NewAppComponent;
