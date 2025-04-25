/**
 * @file Content
 * @description contenido informativo ubicado junto a la card del login
 *
 * @authors
 * - Nombre del Autor 1 <asmendoza@emcali.com.co>
 *
 * @copyright VERTIEM 2025
 */

import React from "react";
import { Settings, Construction, Car, Shield } from "lucide-react";

const items = [
  {
    icon: <Settings className="text-muted-foreground w-12 h-12" />,
    title: "Administrador",
    description:
      "Gestiona y organiza la información de las empresas registradas, ademas Administra los usuarios con permisos y roles asignados.",
  },
  {
    icon: <Construction className="text-muted-foreground w-12 h-12" />,
    title: "Coordinador de transporte",
    description:
      "Administra los vehiculos y conductores registrados en su empresa y crea los registros de recepcion para informar de un viaje a la PTAR.",
  },
  {
    icon: <Car className="text-muted-foreground w-7 h-7" />,
    title: "Operario",
    description: "Monitorea y controla el registro de los vehículos asociados.",
  },
  {
    icon: <Shield className="text-muted-foreground w-6 h-6" />,
    title: "Vigilancia",
    description: "Define y gestiona los roles y permisos dentro del sistema.",
  },
];

interface ContentProps extends React.ComponentProps<"div"> {}

export default function Content({ className, ...props }: ContentProps) {
  return (
    <div
      className={`flex flex-col self-center gap-4 max-w-[450px] ${
        className || ""
      }`}
      {...props}
    >
      <div className="hidden md:flex">
        <h1 className="w-full text-[clamp(2rem,10vw,2.15rem)] font-bold">
          <strong>Vertiem</strong>
        </h1>
      </div>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.icon}
          <div>
            <h2 className="font-medium mb-1">{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
