// import Login from "../pages/login/Login";
import { Routes, Route } from "react-router-dom";
import SignInSide from "../pages/LoginPrueba/SignInSide";
import TablaInformativa from "../pages/USUARIO/TablaInformativa";
import ProtectedRoute from "./ProtectedRoute";
import CrearUsuario from "../pages/ADMINISTRADOR/CrearUsuario";

// const Routers = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<SignInSide />} />
//       <Route path="/CrearUsuario" element={<CrearUsuario />} />
//       <Route path="/TablaInformativa" element={<TablaInformativa />} />
//     </Routes>
//   );
// };

const Routers = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<SignInSide />} />

      {/* Rutas protegidas */}
      <Route
        path="/CrearUsuario"
        element={
          <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
            <CrearUsuario />
          </ProtectedRoute>
        }
      />
      <Route
        path="/TablaInformativa"
        element={
          <ProtectedRoute allowedRoles={["USUARIO"]}>
            <TablaInformativa />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
