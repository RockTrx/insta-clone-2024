import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/Timeline";
import LoggedInUserContext from "../context/loggedUser";
import UserContext from "../context/user";
import useUser from "../hooks/use-user";
import "./styles/Dashboard.scss";

function Dashboard() {
  const { user } = useContext(UserContext);

  const { userInfo } = useUser(user.uid);

  //check if usr exists else return to Login page
  useEffect(() => {
    document.title = "Insta - Dashboard";
  }, [user]);

  return (
    <LoggedInUserContext.Provider value={{ userInfo }}>
      <div>
        <Header
          profileUrl={userInfo.profileUrl}
          username={userInfo.username}
          userId={userInfo.uid}
        />
        <div className="container grid-parent">
          <div className="grid-child grid-col-span-2">
            <Timeline />
          </div>
          <div className="grid-child">
            <Sidebar />
          </div>
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}

export default Dashboard;
