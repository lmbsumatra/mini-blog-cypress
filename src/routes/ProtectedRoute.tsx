import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store";

export default function ProtectedRoute() {
  const isLoggedIn = useAppSelector(
    (state) => state.login.status === "succeeded"
  );

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
