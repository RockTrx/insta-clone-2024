import { useState } from "react";

function Caption({ previewUrl, updateStep, userName, caption }) {
  let timer;

  // Debouncing
  function handleChange(e) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      updateStep({ caption: e.target.value, showSubmit: true });
    }, 200);
  }

  const bg = {
    background: `url(${previewUrl}) center center / cover no-repeat`,
  };

  return (
    <div className="caption">
      <div className="left" style={bg}></div>
      <div className="right">
        <p className="user-name">{userName}</p>
        <textarea
          placeholder="Write Caption...."
          type="text"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Caption;
