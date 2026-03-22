import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { getPosts, getUserObjByID } from "../services/firebase";
import { useNavigate } from "react-router";

export default function usePosts() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState(null);
  const nav = useNavigate();

  // -> get user information like Following using getUserById
  // -> create a service call to get posts of following accounts
  // -> Send userID and following as arguments
  // -> Make posts Collection to recieve fake posts until proper posts can be created

  async function getFollowingUsersPosts() {
    let [{ following }] = await getUserObjByID(user.uid);

    if (!following.length) return setPosts([]);

    const response = await getPosts(user.uid, following).catch((err) => {
      console.error(err);
    });

    setPosts(response);
  }

  useEffect(() => {
    if (!user) return nav("/login");
    getFollowingUsersPosts();
  }, [user, nav]);

  return posts;
}
