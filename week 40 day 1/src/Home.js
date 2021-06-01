import "./styles.css";
import { GoogleLogin } from "react-google-login";
import { setUser, removeUser } from "./Action/authAction";
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

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userdata.user);
  const SuccessHandler = (response) => {
    dispatch(setUser(response.profileObj));
  };
  return (
    <>
      <div className="App">
        <h1>Hello And Welcome From React</h1>
        <h2>Login with google and then go to Profile Page</h2>
        {user.name ? (
          <button style={logout__style} onClick={() => dispatch(removeUser())}>
            Logout
          </button>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT}
            buttonText="Login With Google"
            onSuccess={SuccessHandler}
            onFailure={(err) => console.log(err)}
          />
        )}
        <Link style={link__style} to="/profile">
          {" "}
          Clik Here to go to Profile Page
        </Link>
      </div>
    </>
  );
}
