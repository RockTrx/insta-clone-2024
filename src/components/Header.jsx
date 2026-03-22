import { useContext, useState } from "react";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/firebase";
import "../pages/styles/Dashboard.scss";
import { Link, useNavigate } from "react-router-dom";
import * as PATH from "../constants/routes";
import { signOut } from "firebase/auth";
import Avatar from "./Avatar";
import CreatePost from "./create-post";

export default function Header({ profileUrl, username, userId }) {
  const { auth } = useContext(FirebaseContext);
  const nav = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal((showModal) => !showModal);

    !showModal
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "auto");
  }

  return (
    <header className="header">
      {showModal && (
        <CreatePost
          toggleModal={toggleModal}
          userName={username}
          userId={userId}
        />
      )}
      <div className="container">
        <div className="flex">
          <Link to={PATH.DASH}>
            <img
              src="/images/logo.png"
              alt="instagram logo"
              className="header-logo"
            />
          </Link>

          <div className="header-actions">
            <Link to={PATH.DASH} className="header-icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="header-icons home"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>

            <button
              className="header-icon-wrapper"
              onClick={() => {
                toggleModal();
              }}
            >
              <svg
                className="header-icons"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            <button
              className="header-icon-wrapper"
              onClick={(e) => {
                signOut(auth);
                nav("/login");
              }}
            >
              <svg
                className="header-icons"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
            <Link to={`/p/${username}`}>
              <Avatar size="1.5em" profileUrl={profileUrl} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
