import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user?.rol;

  if (!userRole) {
    // Si el usuario no está autenticado, redirigir al login
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Si el usuario no tiene permiso, mostrar un mensaje de error o redirigir
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
