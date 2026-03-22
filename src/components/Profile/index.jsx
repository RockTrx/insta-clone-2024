import { useReducer, useEffect } from "react";
import { getPostsByUserId } from "../../services/firebase";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";
import "./Styles.scss";

function UserProfile({ profileUser }) {
  //setting up Profile Reducer State
  const initialaState = {
    profileInfo: {},
    posts: [],
    followerCount: 0,
  };
  //using reducer funtion to return state and new state values after using spread opertaion
  const reducer = (state, newState) => ({ ...state, ...newState });

  const [{ profileInfo, posts, followerCount }, dispatch] = useReducer(
    reducer,
    initialaState
  );

  //function to get posts made by the User(user in the profile / not active one )
  async function getUsersPosts(profileUserId) {
    const response = await getPostsByUserId(profileUserId).catch((err) =>
      console.log(err)
    );

    dispatch({
      profileInfo: profileUser,
      posts: response,
      followerCount: profileUser.followers.length,
    });
  }

  useEffect(() => {
    if (profileUser) getUsersPosts(profileUser.uid);
  }, [profileUser]);

  return (
    <div>
      <div className="profile-section">
        <ProfileHeader
          profile={profileInfo}
          followerCount={followerCount}
          postsCount={posts?.length}
          updateProfile={dispatch}
        />
        <ProfilePosts posts={posts} />
      </div>
    </div>
  );
}

export default UserProfile;
