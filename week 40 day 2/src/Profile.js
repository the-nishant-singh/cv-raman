import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "./Action/userAction";

const link__style = {
  display: "block",
  margin: "20px 0"
};

const Profile = (props) => {
  const auth = useSelector((state) => state.userAuth);
  const user = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <div className="App">
        {auth.status ? (
          <div>
            <h1>Your Profile</h1>
            <h2>Name: {user.name}</h2>
            <h2>Email: {user.email}</h2>
          </div>
        ) : (
          <div>
            <h3>You are not authorized to access this route</h3>
            <h4>First login with google and come back here</h4>
          </div>
        )}
        <Link style={link__style} to="/">
          {" "}
          Clik Here to go to Home Page
        </Link>
      </div>
    </>
  );
};

export default Profile;
