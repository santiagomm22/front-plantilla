import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
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
