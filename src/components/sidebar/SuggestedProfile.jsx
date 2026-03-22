import React, { useState } from "react";
import {
  updateActiveUserFollowing,
  updateSuggestedUserFollowers,
} from "../../services/firebase";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";

function SuggestedProfile({ profile, activeUserDocID, userId }) {
  //State storing active users following status.
  //once set to true, profile will dissappear
  const [hasfollowed, setHasFollowed] = useState(false);

  async function handleFollowClick(profileUid, profileUserDocID) {
    setHasFollowed(true);
    // update active users following. This will also help remove them from suggested List;
    await updateActiveUserFollowing(profileUid, false, activeUserDocID);
    //--> false beacuse users does not follow .Hence in suggestions
    await updateSuggestedUserFollowers(userId, false, profileUserDocID);
  }

  return (
    !hasfollowed && (
      <div>
        <div className="profile-child" key={profile.uid}>
          <Link to={`/p/${profile.username}`}>
            <Avatar profileUrl={profile.profileUrl} size="2em" />
          </Link>

          <div className="user-info">
            <Link to={`/p/${profile.username}`}>
              <p>{profile.username}</p>
            </Link>
            <button
              onClick={() => {
                handleFollowClick(profile.uid, profile.docID);
              }}
            >
              Follow
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default SuggestedProfile;
