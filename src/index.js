import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//importing context and services used by firebase
import FirebaseContext from "./context/firebase";
import { firebase, db, storage, auth } from "./lib/firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseContext.Provider value={{ firebase, db, storage, auth }}>
    <App />
  </FirebaseContext.Provider>
);

//about the app
  // -> Client Side React
  // -> Backend Fierbase
  // -> SaSS for styling
  // -> React Skeleton Loading

//architecture of app
  // -> components
  // -> hooks(custom hooks used as helpers)
  // -> lib(firebase home)
  // -> services(function calls )
  // -> pages(differnetiate between Pages that render and components)
  // -> context (to manage global states)
  // -> constants
  // -> helpers (function to take care of date posted distance)

