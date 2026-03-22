import React from "react";

function Preview({ previewUrl }) {
  const bg = {
    background: `url(${previewUrl}) center center / contain no-repeat`,
  };

  return <div className="preview" style={bg}></div>;
}

export default Preview;
