const card_style = {
  width: "350px",
  border: "2px solid #ccc",
  padding: "10px",
  marginBottom: "20px",
  boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
};

const parent_style = {
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap"
};
const renderVideos = (data) => {
  if (data) {
    return data.map((item) => {
      return (
        <div style={card_style} key={item.id}>
          <img
            style={{ width: "100%", height: "auto" }}
            src={item.snippet.thumbnails.high.url}
            alt="thumbnail"
          />
          <h2>{item.snippet.title}</h2>
          <p>{item.snippet.description.slice(0, 100)}...</p>
        </div>
      );
    });
  }
};

const videoComponent = (props) => {
  return (
    <>
      <div style={parent_style}>{renderVideos(props.videos)}</div>
    </>
  );
};

export default videoComponent;
