import { useContext } from "react";
import Post from "./Post";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import UserContext from "../context/user";
import usePosts from "../hooks/use-posts";

function Timeline() {
  const { user } = useContext(UserContext);
  const posts = usePosts();

  return (
    <div>
      {!posts ? (
        <Skeleton count={2} width={640} height={600} />
      ) : !posts.length ? (
        <p>Follow others to see their Posts</p>
      ) : (
        posts.map((post) => {
          return <Post key={post.docid} content={post} />;
        })
      )}
    </div>
  );
}

export default Timeline;
