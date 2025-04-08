// src/components/layouts/Sidebar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Users, LogOut, ArchiveRestore } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/ScrollArea";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "../../store/slices/authSlice";
import { cn } from "./cn";

interface SidebarProps {
  onClose?: () => void;
}

const navItems = [
  {
    name: "Usuarios",
    href: "/usuarios",
    icon: Users,
    roles: ["ADMINISTRADOR"],
  },
  { name: "Cargar Archivos", href: "/archivos", icon: ArchiveRestore },
];

export function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = localStorage.getItem("rol") || (user?.rol as string);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    if (onClose) onClose();
  };

  const filteredNavItems = navItems.filter((item) => {
    if (item.roles && userRole) {
      return item.roles.includes(userRole);
    }
    return true;
  });

  const isActive = (href: string) => {
    return (
      location.pathname === href || location.pathname.startsWith(`${href}/`)
    );
  };

  const renderNavItems = () => (
    <>
      {filteredNavItems.map((item, index) => {
        const active = isActive(item.href);
        const Icon = item.icon;

        return (
          <div key={index}>
            <Link
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                active ? "bg-accent text-accent-foreground" : "transparent"
              )}
              onClick={() => {
                if (onClose) onClose();
              }}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          </div>
        );
      })}
    </>
  );

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="text-primary font-bold text-xl">VERTIEM</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">{renderNavItems()}</nav>
      </ScrollArea>
      <div className="mt-auto p-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
