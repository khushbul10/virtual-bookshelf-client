import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../pages/LoadingPage";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <LoadingPage></LoadingPage>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
