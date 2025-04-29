import { AppSidebar } from "@/components/layouts/AppSidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Button } from "../ui/button";
import { Bell, BellOff, User } from "lucide-react";
import { logout } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

export default function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="top-2">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1 hover:bg-accent hover:cursor-pointer transition-colors" />
          </div>

          <div className="flex items-center gap-2">
            {/* Selector de tema */}
            <ThemeToggle />

            {/* Botón de notificaciones */}
            <DropdownMenu
              open={notificationsOpen}
              onOpenChange={setNotificationsOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-accent hover:cursor-pointer transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-96 max-h-[70vh] overflow-y-auto"
              >
                <DropdownMenuLabel className="flex justify-between items-center p-3">
                  <span className="font-semibold">Notificaciones</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Estado vacío de notificaciones */}
                <div className="py-12 text-center">
                  <div className="bg-muted/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <BellOff className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">No hay notificaciones</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Las notificaciones aparecerán aquí
                  </p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Menú de usuario */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-8 w-8 rounded-full hover:bg-accent hover:cursor-pointer transition-colors"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.nombre || "Usuario"}</span>
                    <span className="text-xs text-muted-foreground">
                      {user?.rol || "Rol"}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/perfil">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Configuración</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-auto bg-background p-6">
            {/* Mensaje de bienvenida usando la constante user */}
            {user && (
              <div className="mb-4">
                <h1 className="text-xl font-semibold">
                  ¡Bienvenido, {user.nombre.toUpperCase()}!
                </h1>
              </div>
            )}
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
