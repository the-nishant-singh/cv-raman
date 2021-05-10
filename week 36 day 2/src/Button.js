import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <button>{this.props.name}</button>
      </>
    );
  }
}

export default Button;
