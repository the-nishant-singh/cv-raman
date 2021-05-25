import "./styles.css";
import { Component } from "react";

const p_styles = {
  color: "red",
  margin: 0,
  padding: 0
};

const inp_style = {
  height: "30px",
  width: "300px",
  padding: "0 5px",
  marginBottom: "10px",
  display: "block"
};

const btn_style = {
  height: "30px",
  width: "70px",
  backgroundColor: "skyblue",
  border: "3px solid skyblue",
  cursor: "pointer"
};

const MyInput = (props) => {
  const onChangeHandler = (e) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };
  return (
    <>
      <p style={p_styles}>{props.label} :</p>
      <input
        style={inp_style}
        placeholder={props.name}
        value={props.value}
        onChange={(e) => onChangeHandler(e)}
        type={props.type}
      />
    </>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      age: ""
    };
  }

  submitHandler = () => {
    const { name, email, age } = this.state;
    if (!name || !email || !age) {
      alert("Error : All input feilds are required");
    } else {
      alert("OK");
      this.setState({
        name: "",
        email: "",
        age: ""
      });
    }
  };

  render() {
    return (
      <>
        <MyInput
          label="Name"
          name="Enter Name"
          value={this.state.name}
          onChange={(e) => {
            this.setState({ name: e.target.value });
          }}
        />

        <MyInput
          label="Email"
          name="Enter Email"
          value={this.state.email}
          onChange={(e) => {
            this.setState({ email: e.target.value });
          }}
        />

        <MyInput
          label="Age"
          name="Enter Age"
          type="number"
          value={this.state.age}
          onChange={(e) => {
            this.setState({ age: e.target.value });
          }}
        />

        <button style={btn_style} onClick={this.submitHandler}>
          SUBMIT
        </button>
      </>
    );
  }
}

export default App;
