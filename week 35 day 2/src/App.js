import React from "react";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false
    };
  }

  render() {
    console.log(this.state);
    return (
      <>
        <center>
          <button onClick={() => this.setState({ running: true })}>
            Start
          </button>
          <button onClick={() => this.setState({ running: false })}>
            Stop
          </button>
          <h1>
            Timer is
            {this.state.running ? " running" : " not running"}
          </h1>
        </center>
      </>
    );
  }
}

export default App;
