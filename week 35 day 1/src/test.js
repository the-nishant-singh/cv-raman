import React from "react";

const Test = (props) => {
  console.log(props);
  return (
    <>
      <center>
        <h1>{props.message}</h1>
      </center>
    </>
  );
};

export default Test;
