// src/components/ProtectedAdminRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("admin_token");
  return token ? children : <Navigate to="/admin-login" />;
};

export default ProtectedAdminRoute;
