// import Login from "../pages/login/Login";
import { Routes, Route } from "react-router-dom";
import SignInSide from "../pages/LoginPrueba/SignInSide";
import Principal from "../pages/principal/Principal";
import ProtectedRoute from "./ProtectedRoute";
import Pagina1 from "../pages/pagina1/Pagina1";

// const Routers = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<SignInSide />} />
//       <Route path="/Principal" element={<Principal />} />
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
        path="/RgVactor"
        element={
          <ProtectedRoute allowedRoles={["USUARIO"]}>
            <Principal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AdministrarEmpresa"
        element={
          <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
            <Principal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Pagina1"
        element={
          <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
            <Pagina1 />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
