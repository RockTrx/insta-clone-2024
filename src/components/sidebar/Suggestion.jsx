import { useEffect, useState } from "react";
import { getSuggestedUsers } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./SuggestedProfile";
import "react-loading-skeleton/dist/skeleton.css";
import "./Sidebar.scss";

export default function Suggestion({ uid, following, activeUserDocID }) {
  const [profiles, setProfiles] = useState(null);

  async function getProfiles(uid, following) {
    const response = await getSuggestedUsers(uid, following);
    setProfiles(response);
  }

  useEffect(() => {
    if (uid) getProfiles(uid, following);
  }, [uid, following]);

  return (
    <div className="profile-parent">
      {profiles?.length > 0 && <p className="p">Suggestions for you</p>}
      {!profiles ? (
        <Skeleton count={5} height={30} />
      ) : (
        profiles.map((profile) => {
          return (
            <SuggestedProfile
              profile={profile}
              key={profile.uid}
              activeUserDocID={activeUserDocID}
              userId={uid}
            />
          );
        })
      )}
    </div>
  );
}

// Need to get other users from firestore (firebase service call)
// Then check if any of those users are followed by the active user
// 5 out of the Remaining ones will be displayed as suggestions
