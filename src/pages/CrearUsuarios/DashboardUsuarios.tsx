// src/pages/Dashboard/DashboardPage.tsx
import React from "react";
import { DialogUsuarios } from "@/components/administrador/DialogUsuarios";

const DashboardUsuarios: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 p-4">
      <DialogUsuarios />
    </div>
  );
};

export default DashboardUsuarios;
