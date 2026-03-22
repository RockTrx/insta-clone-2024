import React, { useContext, useState } from "react";
import { toggleLikes } from "../../services/firebase";
import UserContext from "../../context/user";

function Actions({
  caption,
  likes,
  likedByActiveUser,
  docId,
  username,
  handleFocus,
}) {
  const [totalLikes, setTotalLikes] = useState(likes.length);
  const [likedStatus, setLikedStatus] = useState(likedByActiveUser);

  //-> Destructuring the user id from context
  const {
    user: { uid: userId },
  } = useContext(UserContext);

  async function handleLikes() {
    setLikedStatus((likedStatus) => !likedStatus);
    setTotalLikes((totalLikes) => {
      return !likedStatus ? totalLikes + 1 : totalLikes - 1;
    });

    await toggleLikes(docId, userId, likedStatus);
  }

  return (
    <div className="actions">
      <div>
        <svg
          onClick={handleLikes}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          tabIndex={0}
          className={likedStatus ? "action-icons red" : "action-icons"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <svg
          className="action-icons"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          tabIndex={0}
          onClick={handleFocus}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <p className="likes-info">
        {totalLikes === 1 ? "1 like" : `${totalLikes} likes`}
      </p>
      <p>
        <span className="likes-info">{`#${username}:`}</span>
        {caption}
      </p>
    </div>
  );
}

export default Actions;
