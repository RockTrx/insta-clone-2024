import { useRef } from "react";
import Header from "./Header";
import "./Style.scss";
import Actions from "./Actions";
import Comments from "./Comments";
import dateConverter from "../../Helpers/date";

function Post({ content }) {
  const timePosted = dateConverter(content.date);
  const inputRef = useRef(null);

  const handleFocus = () => inputRef.current.focus();

  return (
    <div className="post-parent">
      <Header userName={content.username} profileUrl={content.profileUrl} />
      <div className="main">
        <img src={content.imageSrc} alt="post" />
      </div>
      <Actions
        caption={content.caption}
        username={content.username}
        likes={content.likes}
        likedByActiveUser={content.likedByActiveUser}
        docId={content.docid}
        handleFocus={handleFocus}
      />
      <Comments
        Comments={content.comments}
        timePosted={timePosted}
        docid={content.docid}
        inputRef={inputRef}
      />
    </div>
  );
}

export default Post;
