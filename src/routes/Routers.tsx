// import Login from "../pages/login/Login";
import { Routes, Route } from "react-router-dom";
import SignInSide from "../pages/LoginPrueba/SignInSide";
import Principal from "../pages/principal/Principal";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInSide />} />
      <Route path="/Principal" element={<Principal />} />
    </Routes>
  );
};

// const Routers = () => {
//   return (
//     <Routes>
//       {/* Rutas públicas */}
//       <Route path="/" element={<Login />} />

//       {/* Rutas protegidas */}
//       {/*<Route
//         path="/RgConductor"
//         element={
//           <ProtectedRoute allowedRoles={["COORDINADOR"]}>
//             <RgConductor />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/RgVactor"
//         element={
//           <ProtectedRoute allowedRoles={["COORDINADOR"]}>
//             <RgVactor />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/CrearS"
//         element={
//           <ProtectedRoute allowedRoles={["COORDINADOR"]}>
//             <CrearS />
//           </ProtectedRoute>
//         }
//       />
//       */}
//     </Routes>
//   );
// };

export default Routers;
