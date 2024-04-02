/* eslint-disable react/prop-types */
import React from "react";
import useAuth from "../../Hooks/useAuth/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loding } = useAuth();
  if (loding) {
    return (
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/" />;
};

export default PrivateRoute;
