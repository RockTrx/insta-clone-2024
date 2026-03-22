// we need this hook to utilize firestore information about the user. We will need
// to know user followers, following, name and posts.

import UserContext from "../context/user";
import { useEffect, useState, useContext } from "react";
import { getUserObjByID } from "../services/firebase";

export default function useUser() {
  const { user } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});

  async function getUserByID(userID) {
    //we are calling a service function to get user by their id
    const [response] = await getUserObjByID(userID);
    setUserInfo(response || {});
  }

  useEffect(() => {
    if (!user) return setUserInfo(null);
    if (user?.uid) {
      getUserByID(user.uid);
    }
  }, [user]);

  return { userInfo };
}
