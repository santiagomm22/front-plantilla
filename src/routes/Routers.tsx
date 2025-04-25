// src/router.tsx
import { Routes, Route } from "react-router-dom";
import SignInSide from "@/pages/login/SignInSide";
import DashboardUsuarios from "@/pages/CrearUsuarios/DashboardUsuarios";
// import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/components/layouts/MainLayout";

const Routers = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<SignInSide />} />
      <Route element={<MainLayout />}>
        <Route path="/usuarios" element={<DashboardUsuarios />} />

        {/* Rutas protegidas con AuthLayout */}
        {/* <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        /> */}
        {/* Agrega más rutas protegidas aquí según necesites */}
        {/* Ejemplo: Ruta para Empresas */}
        {/* <Route
          path="/empresas"
          element={
            <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
              <EmpresasPage />
            </ProtectedRoute>
          }
        /> */}
        {/* Ejemplo: Ruta para Conductores */}
        {/* <Route
          path="/conductores"
          element={
            <ProtectedRoute allowedRoles={["ADMINISTRADOR", "COORDINADOR"]}>
              <ConductoresPage />
            </ProtectedRoute>
          }
        /> */}
      </Route>
    </Routes>
  );
};

export default Routers;
