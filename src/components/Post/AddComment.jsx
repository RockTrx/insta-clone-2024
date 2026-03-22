import React, { useContext, useState } from "react";
import UserContext from "../../context/user";
import { addUserComment } from "../../services/firebase";

function AddComment({ docid, setAllComments, comments, inputRef }) {
  const [comment, setComment] = useState("");
  const {
    user: { displayName: username },
  } = useContext(UserContext);

  async function handleSumbit(event) {
    event.preventDefault();

    setAllComments([
      {
        caption: comment,
        username: username,
      },
      ...comments,
    ]);

    setComment("");

    await addUserComment(docid, username, comment).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="input-parent">
      <form className="input-child">
        <input
          type="text"
          placeholder="Type your comment..."
          value={comment}
          onChange={({ target }) => {
            setComment(target.value);
          }}
          ref={inputRef}
        />
        <button
          type="submit"
          onClick={(e) => {
            handleSumbit(e);
          }}
          disabled={comment.length > 3 ? false : true}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default AddComment;
