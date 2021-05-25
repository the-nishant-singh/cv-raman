import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "./Action/action";
import "./styles.css";

const NewAppComponent = (props) => {
  const [todo, setTodo] = useState("");
  let state = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const renderList = (data) => {
    if (data && Array.isArray(data)) {
      return data.map((item, key) => {
        return (
          <li key={key} className="list-group-item">
            {item}
          </li>
        );
      });
    }
  };

  const handleAddtodo = () => {
    dispatch(addTodo(todo));
    setTodo("");
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
          <ul className="list-group">{renderList(state.todos)}</ul>
        </div>
      </div>
    </>
  );
};

export default NewAppComponent;
