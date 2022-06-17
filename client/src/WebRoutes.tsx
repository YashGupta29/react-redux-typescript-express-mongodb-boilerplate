import React, { useLayoutEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LazyLoadComponent from "./hoc/LazyLoadComponent";
import WebProtectedRoute from "./hoc/WebProtectedRoute";

// pages
const Login = React.lazy(() => import("./pages/Login.page"));
const Register = React.lazy(() => import("./pages/Register.page"));
const Home = React.lazy(() => import("./pages/Home.page"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword.page"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword.page"));

const WebRoutes = () => {
  const location = useLocation();
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/login" element={<LazyLoadComponent Component={Login} />} />
      <Route
        path="/register"
        element={<LazyLoadComponent Component={Register} />}
      />
      <Route
        path="/forgot-password"
        element={<LazyLoadComponent Component={ForgotPassword} />}
      />
      <Route
        path="/reset-password"
        element={<LazyLoadComponent Component={ResetPassword} />}
      />
      {/* all auth protected routes will nest inside this route */}
      <Route element={<WebProtectedRoute />}>
        <Route path="/" element={<LazyLoadComponent Component={Home} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default WebRoutes;
