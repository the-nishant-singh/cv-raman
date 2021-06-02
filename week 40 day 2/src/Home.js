import "./styles.css";
import { useState } from "react";
import { loginuser, removeUsertoken } from "./Action/authAction";
import { removeUser } from "./Action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const logout__style = {
  height: "30px",
  width: "100px",
  color: "white",
  background: "red",
  border: "2px solid red",
  borderRadius: "4px",
  cursor: "pointer"
};

const link__style = {
  display: "block",
  margin: "20px 0"
};

const input__Style = {
  height: "30px",
  padding: "0 10px",
  margin: "0 10px"
};

const btn__style = {
  height: "35px",
  background: "green",
  color: "white",
  border: "2px solid green",
  cursor: "pointer"
};

export default function Home() {
  const [email, setemail] = useState("nishantsingh@gmail.com");
  const [password, setPassword] = useState("123456789");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.userAuth);

  const loginHandler = () => {
    const user = { email, password };
    dispatch(loginuser(user));
  };

  return (
    <>
      <div className="App">
        <h1>Hello And Welcome From React</h1>
        <h2>Login with google and then go to Profile Page</h2>
        <p style={{ color: "red" }}>{auth.status ? "" : auth.error}</p>
        {auth.status ? (
          <button
            style={logout__style}
            onClick={() => {
              dispatch(removeUsertoken());
              dispatch(removeUser());
            }}
          >
            Logout
          </button>
        ) : (
          <div>
            <input
              style={input__Style}
              placeholder="enter email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              style={input__Style}
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <button style={btn__style} onClick={loginHandler}>
              LOGIN
            </button>
          </div>
        )}
        <Link style={link__style} to="/profile">
          {" "}
          Clik Here to go to Profile Page
        </Link>
      </div>
    </>
  );
}
