// This custom hook is a listener stores or removes user from local storage.
// This hook is called in the app.js to create context around user and send it to
// the children components , basically the entire app

import FirebaseContext from "../context/firebase";
import { useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

//This is a custom hook wirtten to check if the user exists or not
export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (authUser) => {
      //we have a user
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        //if we dont have a user remove item and set state as null
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => {
      //cleanup, this is closing a listener. Done to prevent listner to get activated everytime it gets called
      listener();
    };
  }, [auth]);

  return { user };
}
