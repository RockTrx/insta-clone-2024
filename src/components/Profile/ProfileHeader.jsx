import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user";
import useUser from "../../hooks/use-user";
import {
  hasUserFollowedProfile,
  updateActiveUserFollowing,
  updateSuggestedUserFollowers,
} from "../../services/firebase";
import ProfileAvatar from "./ProfileAvatar";

function ProfileHeader({
  updateProfile,
  postsCount,
  followerCount,
  profile: {
    username: profileUserName,
    docid: docId,
    followers,
    following,
    uid: profileUserId,
    profileUrl,
    fullname,
  },
}) {
  //get active user from firestore , we get profile user info from props
  const {
    user: { uid: activeUserId },
  } = useContext(UserContext);

  //get active user docid using hook so that it can be used in useEffect
  // use cannot use a hook inside a hook
  const {
    userInfo: { docID: activeUserDocId },
  } = useUser(activeUserId);

  const [hasFollowed, setHasFollowed] = useState(null);

  useEffect(() => {
    async function hasUserFollowed() {
      const response = await hasUserFollowedProfile(activeUserId, docId);
      setHasFollowed(response);
    }

    if (activeUserId && docId) hasUserFollowed();
  }, [activeUserId, docId]);

  async function updateFollowStatus() {
    await updateSuggestedUserFollowers(activeUserId, hasFollowed, docId);
    await updateActiveUserFollowing(
      profileUserId,
      hasFollowed,
      activeUserDocId
    );
    updateProfile({
      followerCount: hasFollowed ? followerCount - 1 : followerCount + 1,
    });
    setHasFollowed((hasFollowed) => !hasFollowed);
  }

  return (
    <div className="profile-header-wrapper">
      <div className="header-parent">
        <ProfileAvatar
          profileUrl={profileUrl}
          activeUserId={activeUserId}
          profileUserId={profileUserId}
          activeUserDocId={activeUserDocId}
        />

        <div className="profile-header-info-wrapper">
          <div className="username-wrapper">
            <h1 className="username">{profileUserName}</h1>

            {activeUserId !== profileUserId && (
              <button onClick={updateFollowStatus}>
                {hasFollowed ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>

          <div className="account-info">
            <p>
              {postsCount}
              <span className="no-weight">posts</span>
            </p>
            <p>
              {followerCount}
              <span className="no-weight">followers</span>
            </p>
            <p>
              {following?.length}
              <span className="no-weight">following</span>
            </p>
          </div>

          <div>
            <p>{fullname}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
