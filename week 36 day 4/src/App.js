import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: ""
    };
  }

  submitHandler = () => {
    console.log(this.state);
  };

  render() {
    return (
      <>
        <div>
          <input
            placeholder="enter name"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />

          <input
            placeholder="enter email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />

          <input
            placeholder="enter phone"
            value={this.state.phone}
            onChange={(e) => this.setState({ phone: e.target.value })}
          />

          <input
            placeholder="enter address"
            value={this.state.address}
            onChange={(e) => this.setState({ address: e.target.value })}
          />

          <input
            placeholder="enter password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button onClick={this.submitHandler}>Submit</button>
        </div>
      </>
    );
  }
}

export default App;
