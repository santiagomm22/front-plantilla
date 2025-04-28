/**
 * @file PerfilUsuario.tsx
 * @description card de perfil del usuario con diseño mejorado
 */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User as UserIcon,
  Mail,
  Shield,
  BadgeCheck,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useApi } from "@/hooks/useApi";
import { User } from "@/types/entities.types";

const CardPerfil: React.FC = () => {
  // Obtener los datos del usuario del estado de Redux
  const userFromRedux = useSelector((state: RootState) => state.auth.user);
  const [userData, setUserData] = useState<User | null>(
    userFromRedux as User | null
  );
  const { get } = useApi();

  // Cargar datos completos del usuario
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userFromRedux) return;

      try {
        // Obtener datos completos del usuario
        const user = await get<User>(`api/usuarios/${userFromRedux.id}`);
        setUserData(user);
      } catch (error) {
        console.error("Error al cargar datos del perfil:", error);
      }
    };

    fetchUserDetails();
  }, [userFromRedux]);

  // Formatear fecha
  const formatearFecha = (fechaStr: string | null | undefined) => {
    if (!fechaStr) return "Nunca";
    try {
      const fecha = new Date(fechaStr);
      return format(fecha, "dd/MM/yyyy HH:mm", { locale: es });
    } catch (error) {
      return "Fecha inválida";
    }
  };

  // Obtener iniciales para el avatar
  const getInitials = () => {
    if (!userData?.nombre) return "N";
    const names = userData.nombre.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  // Función para determinar el color de fondo del avatar basado en el rol
  const getAvatarColor = () => {
    if (!userData?.rol) return "bg-slate-600";

    switch (userData.rol.toUpperCase()) {
      case "ADMINISTRADOR":
        return "bg-amber-600";
      case "EMPRESA":
        return "bg-emerald-600";
      case "OPERARIO":
        return "bg-blue-600";
      case "VIGILANCIA":
        return "bg-purple-600";
      case "USUARIO":
        return "bg-red-600";
      default:
        return "bg-slate-600";
    }
  };

  // Obtener una descripción del rol
  const getRolDescription = () => {
    if (!userData?.rol) return "";

    switch (userData.rol.toUpperCase()) {
      case "ADMINISTRADOR":
        return "Acceso completo al sistema, gestión de usuarios y configuraciones";
      case "EMPRESA":
        return "Gestión de conductores, vehículos y solicitudes de su empresa";
      case "OPERARIO":
        return "Medición y control de descargas en la PTAR";
      case "VIGILANCIA":
        return "Control de ingreso y salida de vehículos";
      case "USUARIO":
        return "Control de ingreso y salida de vehículos";
      default:
        return "Usuario del sistema VERTIEM";
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-muted/30 border-b">
        <CardTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <BadgeCheck className="text-primary h-6 w-6" />
          Mi Perfil
        </CardTitle>
        <CardDescription className="text-base">
          Información de tu cuenta en el sistema VERTIEM
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna de avatar y detalles básicos */}
          <div className="lg:w-1/3 flex flex-col items-center space-y-4">
            {/* Avatar con iniciales */}
            <div
              className={`${getAvatarColor()} text-white rounded-full w-32 h-32 flex items-center justify-center text-4xl font-bold shadow-lg transition-transform hover:scale-105`}
            >
              {getInitials()}
            </div>

            {/* Nombre y rol destacados */}
            <div className="text-center space-y-1 w-full">
              <h3 className="text-2xl font-semibold">
                {userData?.nombre.toLocaleUpperCase() || "N/A"}
              </h3>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
                {userData?.rol || "Rol no definido"}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {getRolDescription()}
              </p>
            </div>

            {/* Último acceso */}
            <div className="w-full bg-muted/30 rounded-lg p-4 mt-4 text-center space-y-1">
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Último acceso</span>
              </div>
              <p className="font-medium">
                {formatearFecha(userData?.ultimo_acceso)}
              </p>
              <p className="text-xs text-muted-foreground">
                Última vez que inició sesión en el sistema
              </p>
            </div>
          </div>

          {/* Detalles del usuario */}
          <div className="lg:w-2/3 space-y-6 bg-card rounded-lg">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b pb-2">
                Información personal
              </h3>

              {/* Nombre */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserIcon className="h-4 w-4" />
                  <span>Nombre completo</span>
                </div>
                <p className="font-medium text-lg">
                  {userData?.nombre.toLocaleUpperCase() || "No disponible"}
                </p>
              </div>

              {/* Correo */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>Correo electrónico</span>
                </div>
                <p className="font-medium text-lg break-all">
                  {userData?.correo || "No disponible"}
                </p>
              </div>

              {/* Rol */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Rol asignado</span>
                </div>
                <p className="font-medium text-lg">
                  {userData?.rol || "No disponible"}
                </p>
              </div>
            </div>

            {/* Sección de ayuda */}
            <div className="mt-6 pt-6 border-t">
              <div className="bg-muted/20 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="font-medium">
                    ¿Necesitas ayuda con tu cuenta?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Contacta al administrador del sistema para actualizar tu
                    información o recuperar tu contraseña.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPerfil;
