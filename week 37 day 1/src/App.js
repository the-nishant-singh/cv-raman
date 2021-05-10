import React from "react";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      todo: ""
    };
  }

  handleAddtodo = (props) => {
    const { todoList, todo } = this.state;
    if (todo) {
      this.setState({
        todoList: [...todoList, { id: todoList.length + 1, todo }],
        todo: ""
      });
    }
  };

  renderList = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <>
            <li className="list-group-item">{item.todo}</li>
          </>
        );
      });
    }
  };

  render() {
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
              value={this.state.todo}
              onChange={(e) => {
                this.setState({ todo: e.target.value });
              }}
            />
            <button
              className="btn btn-primary"
              type="button"
              id="button-addon2"
              onClick={this.handleAddtodo}
            >
              Add-To-Do
            </button>
          </div>
          <div className="mt-3" style={{ background: "#ccc", padding: "10px" }}>
            <ul className="list-group">
              {this.renderList(this.state.todoList.reverse())}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default App;
