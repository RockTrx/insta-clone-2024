import { useState } from "react";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";
import "./Style.scss";

//-> get comments from the props
//-> print 2 comments
//-> To view the rest of the comments , users need to click on View all {lenght} Comments
function Comments({ Comments, timePosted, docid, inputRef }) {
  const [comments, setComments] = useState(Comments);
  const [sliceValue, setSliceValue] = useState(2);

  const multipleRender = () => {
    //render all comments if length is less than 3
    if (comments?.length <= 2) {
      return comments.map((comment, index) => {
        return (
          <p className="comment-child" key={index}>
            <Link to={`/p/${comment.username}`}>{comment.username}:</Link>
            {comment.caption}
          </p>
        );
      });
    }
    //render last two elements if length is greater than 2
    //ideally you only want to fecth required comments from Firebase
    //but here are asking for all comments and only printing last two posted
    if (comments?.length > 2 && sliceValue === 2) {
      return comments.slice(0, sliceValue).map((comment, index) => {
        return (
          <p className="comment-child" key={index}>
            <Link to={`/p/${comment.username}`}>{comment.username}:</Link>
            {comment.caption}
          </p>
        );
      });
    }
    // if user click on view more
    if (comments?.length > 2 && sliceValue > 2) {
      return comments.slice(0, sliceValue).map((comment, index) => {
        return (
          <p className="comment-child" key={index}>
            <Link to={`/p/${comment.username}`}>{comment.username}:</Link>
            {comment.caption}
          </p>
        );
      });
    }
  };

  const viewMore = () => {
    setSliceValue(sliceValue + 2);
  };

  return (
    <div>
      <div className="comments">
        {multipleRender()}
        {comments?.length > 0 && comments.length >= sliceValue && (
          <p className="fake-link" onClick={viewMore}>
            View More Comments
          </p>
        )}
        <p className="date">{timePosted}</p>
      </div>
      <AddComment
        comments={comments}
        setAllComments={setComments}
        docid={docid}
        inputRef={inputRef}
      />
    </div>
  );
}

export default Comments;
