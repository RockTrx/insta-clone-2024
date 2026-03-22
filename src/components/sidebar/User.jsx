import React from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";

const User = ({ fullname, username, profileUrl }) =>
  !username || !fullname ? (
    // Displaying the skeleton until the username and fullname are with us.
    // Note :skeleton needs the css import to display.
    <Skeleton count={1} height={60} />
  ) : (
    <div className="sidebar__user-parent">
      <Link to={`/p/${username}`}>
          {console.log(""+ profileUrl)}
        <Avatar profileUrl={profileUrl} size="3em"  />
      </Link>
      <div className="user-info">
        <Link to={`/p/${username}`}>
          <p>{username}</p>
        </Link>
        <Link to={`/p/${username}`}>
          <p>{fullname}</p>
        </Link>
      </div>
    </div>
  );

export default User;

//  using prop-type dependency to type check. We can use proptype and heavy teting to type
//  our app. Do not make the keyword mistake. Check docs for syntax.

User.propTypes = {
  fullname: PropTypes.string,
  username: PropTypes.string,
};
