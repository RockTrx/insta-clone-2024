import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";

function Header({ userName, profileUrl }) {
  return (
    <div className="post-header">
      <Link to={`/p/${userName}`}>
        <Avatar profileUrl={profileUrl} size="1.4em" />
      </Link>
      <Link to={`/p/${userName}`}>
        <p className="details">{userName}</p>
      </Link>
    </div>
  );
}

export default Header;
