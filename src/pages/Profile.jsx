import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getUserByUserName } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import UserProfile from "../components/Profile";
import Header from "../components/Header";
import useUser from "../hooks/use-user";

function Profile() {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const nav = useNavigate();

  const {
    userInfo: {
      profileUrl: activeProfileUrl,
      username: activeUsername,
      uid: userId,
    },
  } = useUser();

  useEffect(() => {
    async function getUserDetails() {
      const [userInfo] = await getUserByUserName(username).catch((err) => {
        return console.log(err);
      });
      if (userInfo) setProfileUser(userInfo);
      if (!userInfo) nav(ROUTES.NOT_FOUND);
    }

    if (username) getUserDetails();
  }, [username, nav]);

  return (
    profileUser && (
      <div>
        <Header
          profileUrl={activeProfileUrl}
          username={activeUsername}
          userId={userId}
        />
        <div className="profile-section-wrapper">
          <UserProfile profileUser={profileUser} />
        </div>
      </div>
    )
  );
}

export default Profile;
