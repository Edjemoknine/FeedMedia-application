import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-900">
      {children}
    </div>
  );
};

export default AuthLayout;
