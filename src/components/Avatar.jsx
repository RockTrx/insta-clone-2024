import React, { useEffect, useState } from "react";
import "../Styleguide.scss";

// Resuable avatar component that takes a size value(default is 2em) and profile url as props
export default function Avatar({ size, profileUrl }) {
  
  const style = {
    width: size || "2em",
    height: size || "2em",
  };

  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!profileUrl || profileUrl?.length <= 0)
      return setUrl("/images/avatars/user.png");

    return setUrl(profileUrl);
  }, [profileUrl]);

  const bg = {
    background: `url(${url}) center center / cover no-repeat`,
  };

  return (
    <div className="avatar-parent" style={style}>
      <div className="avatar-child" style={bg}></div>
    </div>
  );
}
