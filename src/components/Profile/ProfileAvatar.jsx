import { useEffect, useState } from "react";
import { uploadProfilePic } from "../../services/firebase";
import Avatar from "../Avatar";

function ProfileAvatar({
  profileUrl,
  activeUserId,
  profileUserId,
  activeUserDocId,
}) {
  const [selectedFile, setSelectedFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    if (!selectedFile) return setPreviewUrl(profileUrl);

    const objectURl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectURl);

    return () => URL.revokeObjectURL(objectURl);
  }, [selectedFile, profileUrl]);

  async function selectProfileImage(e) {
    //
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(profileUrl);
      return;
    }

    await uploadProfilePic(e.target.files[0], activeUserDocId, activeUserDocId);
    //setting the state to first file selected by input
    setSelectedFile(e.target.files[0]);
  }

  return (
    <div className="profile-avatar-wrapper">
      <label>
        {profileUserId === activeUserId && (
          <input type="file" accept="image/*" onChange={selectProfileImage} />
        )}
        <figure className="figure">
          <Avatar size="8em" profileUrl={previewUrl} />
          {profileUserId === activeUserId && (
            <figcaption className="figcaption">
              <img src="/images/camera-white.png" aria-label="camera icons" />
            </figcaption>
          )}
        </figure>
      </label>
    </div>
  );
}

export default ProfileAvatar;
