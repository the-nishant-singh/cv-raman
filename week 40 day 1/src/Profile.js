import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const link__style = {
  display: "block",
  margin: "20px 0"
};

const Profile = (props) => {
  const user = useSelector((state) => state.userdata.user);
  console.log(user);
  return (
    <>
      <div className="App">
        {user.name ? (
          <div>
            <h1>Your Google Profile</h1>
            <img src={user.imageUrl} alt="profileimg" />
            <br />
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
