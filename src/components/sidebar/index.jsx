import useUser from "../../hooks/use-user";
import User from "./User";
import Suggestion from "./Suggestion";
import "./Sidebar.scss";

function Sidebar() {
  const {
    userInfo: { fullname, username, uid, following, docID, profileUrl },
  } = useUser();

  return (
    <div className="sidebar-parent">
      <User fullname={fullname} username={username} profileUrl={profileUrl} />
      <Suggestion uid={uid} following={following} activeUserDocID={docID} />
    </div>
  );
}

export default Sidebar;
