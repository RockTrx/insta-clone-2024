import { Navigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function ProtectedRoute({ children, user, ...rest }) {
  console.log(user);
  if (!user) return <Navigate to={ROUTES.LOGIN} />;

  return children;
}
