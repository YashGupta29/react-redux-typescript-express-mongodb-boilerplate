import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

function WebProtectedRoute({
  children,
}: {
  children?: React.ReactElement | undefined;
}) {
  const location = useLocation();
  const { loggedIn } = useAppSelector((state) => state.auth);

  if (!loggedIn)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return children ? children : <Outlet />;
}

export default WebProtectedRoute;
