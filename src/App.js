import "./Styleguide.scss";
import { lazy, Suspense } from "react";
import * as PATH from "./constants/routes";
import UserContext from "./context/user";

//importing router services which helps us to navigate through our app.Bascially jump from one page to another
import { BrowserRouter, Routes, Route } from "react-router-dom";

//calling in custom hook useAuthListener
import useAuthListener from "./hooks/user-auth-listner";

//calling in helper to check if user exists and protect the route
import ProtectedRoute from "./Helpers/protected-route";
import LoginPageRedirect from "./Helpers/login-page-redirect";

//importing pages with Lazy Loading.
//Lazy is basically a code-splitting  with dynamically importing
const Login = lazy(() => import("./pages/Login.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));

//Wrapping the app in Fireabase context and User context.
//context have a provider and consumers
//These components are providers and they need a value prop

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <Suspense fallback={<p>Loading</p>}>
          <Routes>
            <Route
              path={PATH.LOGIN}
              element={
                <LoginPageRedirect user={user}>
                  <Login />
                </LoginPageRedirect>
              }
            />

            <Route
              path={PATH.DASH}
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path={PATH.SIGN}
              element={
                <LoginPageRedirect user={user}>
                  <Signup />
                </LoginPageRedirect>
              }
            />

            <Route path="*" element={<NotFound />} />

            <Route path={PATH.PROFILE} element={<Profile />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
