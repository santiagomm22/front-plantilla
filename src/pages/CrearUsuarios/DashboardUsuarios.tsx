// src/pages/CrearUsuarios/DashboardUsuarios.tsx
import React from "react";
import { DialogUsuarios } from "@/components/administrador/DialogUsuarios";
import UserDataTable from "@/components/administrador/UserDataTable";

const DashboardUsuarios: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Cabecera con título y botón para crear usuario */}
      <DialogUsuarios />

      {/* DataTable de usuarios (ya contiene su propia Card) */}
      <UserDataTable />
    </div>
  );
};

export default DashboardUsuarios;
