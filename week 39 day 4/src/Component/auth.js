import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { setToken, removeToken } from "../Action/authAction";
import { getVideos } from "../Action/videoAction";
import { useEffect } from "react";
import VideoComponent from "./video";

const logout__style = {
  height: "30px",
  width: "100px",
  color: "white",
  background: "red",
  border: "2px solid red",
  borderRadius: "4px",
  cursor: "pointer"
};

const Auth = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const videos = useSelector((state) => state.video.videos);

  useEffect(() => {
    dispatch(getVideos(token));
  }, [token]);

  return (
    <>
      {!token ? (
        <GoogleLogin
          clientId={process.env.REACT_APP_SECRET}
          buttonText="Login With Google"
          onSuccess={(res) => dispatch(setToken(res.accessToken))}
          onFailure={(error) => alert(error.error)}
          cookiePolicy={"single_host_origin"}
          scope="https://www.googleapis.com/auth/youtube.force-ssl"
        />
      ) : (
        <div>
          <button style={logout__style} onClick={() => dispatch(removeToken())}>
            Logout
          </button>
          <hr />
          <VideoComponent videos={videos} />
        </div>
      )}
    </>
  );
};

export default Auth;
