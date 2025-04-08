// src/components/layouts/MainLayout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user); // Mantenemos la constante

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar para móviles (visible solo cuando sidebarOpen es true) */}
      <div
        className={`md:hidden fixed inset-0 z-40 ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        {/* Overlay oscuro detrás del sidebar */}
        <div
          className="fixed inset-0 bg-black/50"
          onClick={toggleSidebar}
        ></div>

        {/* Contenedor del sidebar */}
        <div className="relative w-64 h-full bg-background">
          <Sidebar onClose={toggleSidebar} />
        </div>
      </div>

      {/* Sidebar para desktop (siempre visible en md y superiores) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-auto bg-background p-6">
          {/* Mensaje de bienvenida usando la constante user */}
          {user && (
            <div className="mb-4">
              <h1 className="text-xl font-semibold">
                ¡Bienvenido, {user.nombre}!
              </h1>
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
