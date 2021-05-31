const initialState = {
  videos: []
};

const video = (state = initialState, action) => {
  switch (action.type) {
    case "SETVIDEOS":
      return {
        videos: action.payload
      };

    default:
      return state;
  }
};

export default video;
