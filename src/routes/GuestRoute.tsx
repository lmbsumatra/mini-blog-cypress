import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/store";

interface GuestRouteProps {
  children: React.ReactElement;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const isLoggedIn = useAppSelector(
    (state) => state.login.status === "succeeded"
  );

  return isLoggedIn ? <Navigate to="/home" replace /> : children;
};

export default GuestRoute;
