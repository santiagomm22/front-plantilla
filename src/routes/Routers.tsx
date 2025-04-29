// src/router.tsx
import { Routes, Route } from "react-router-dom";
import SignInSide from "@/pages/login/SignInSide";
import DashboardUsuarios from "@/pages/CrearUsuarios/DashboardUsuarios";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/components/layouts/MainLayout";
import DashboardPerfil from "@/pages/perfil/DashboardPerfil";

const Routers = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<SignInSide />} />

      {/* <Route path="/usuarios" element={<DashboardUsuarios />} />
      <Route path="/perfil" element={<DashboardPerfil />} /> */}

      {/* Rutas protegidas con AuthLayout */}
      <Route element={<MainLayout />}>
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
              <DashboardUsuarios />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute allowedRoles={["ADMINISTRADOR", "USUARIO"]}>
              <DashboardPerfil />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default Routers;
