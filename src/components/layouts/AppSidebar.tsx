import * as React from "react";
import { Users, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/layouts/nav-user";

// Definición de elementos de navegación con control de roles
const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    roles: ["ADMINISTRADOR", "USUARIO"],
  },
  {
    title: "Usuarios",
    url: "/usuarios",
    icon: Users,
    roles: ["ADMINISTRADOR"],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { setOpenMobile, state } = useSidebar();

  // Obtener información del usuario desde Redux
  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = localStorage.getItem("rol") || (user?.rol as string);

  // Filtrar elementos de navegación según el rol del usuario
  const filteredNavItems = navItems.filter((item) => {
    if (item.roles && userRole) {
      return item.roles.includes(userRole);
    }
    return false;
  });

  // Determinar si un elemento está activo
  const isActive = (url: string) => {
    return location.pathname === url || location.pathname.startsWith(`${url}/`);
  };

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex h-8 items-center justify-center">
                {state !== "collapsed" ? (
                  <>
                    <img
                      src="/images/logo-emcali.webp"
                      alt="EMCALI Logo"
                      className="h-auto w-38 dark:hidden"
                    />
                    <img
                      src="/images/logo-emcali-clear.webp"
                      alt="EMCALI Logo"
                      className="hidden h-auto w-42 dark:block"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src="/images/LOGOEMCALIICONO.webp"
                      alt="EMCALI Icon"
                      className="h-8 w-8 dark:hidden"
                    />
                    <img
                      src="/images/icono-emcali-clear.webp"
                      alt="EMCALI Icon"
                      className="hidden h-8 w-8 dark:block"
                    />
                  </>
                )}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {filteredNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive(item.url)}
                onClick={() => setOpenMobile(false)}
              >
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              name: user.nombre || "Usuario",
              email: user.email || "usuario@vertiem.com",
              avatar: "/avatars/default.png",
            }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
