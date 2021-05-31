const getVideos = (token) => {
  return function (dispatch) {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=${process.env.REACT_APP_API_KEY}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      }
    )
      .then((res) => res.json())
      .then((data) => dispatch(setVideos(data.items)));
  };
};

const setVideos = (payload) => {
  return {
    type: "SETVIDEOS",
    payload
  };
};

export { getVideos };
