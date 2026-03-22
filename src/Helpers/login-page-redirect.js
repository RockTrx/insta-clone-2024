import { Navigate } from "react-router";
import * as ROUTES from "../constants/routes";

export default function LoginPageRedirect({ children, user, ...rest }) {
  if (user) return <Navigate to={ROUTES.DASH} />;

  return children;
}
