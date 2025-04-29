// src/components/administrador/DialogUsuarios.tsx
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { FormEvent, useState, useEffect } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import useApi from "@/hooks/useApi";
import { Role } from "@/types/entities.types";

export const DialogUsuarios = () => {
  const today = new Date();
  const formattedDate = format(today, "EEEE, dd 'de' MMMM 'de' yyyy", {
    locale: es,
  });

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "",
  });
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Usamos el hook personalizado para las peticiones API
  const { get, post } = useApi();

  // Cargar los roles desde el backend cuando se monte el componente
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // La URL debe coincidir con la API del backend-plantilla
        const rolesData = await get<Role[]>("/roles");
        setRoles(rolesData);
        console.log("Roles cargados:", rolesData);
      } catch (error) {
        console.error("Error al cargar roles:", error);
        Notify.failure("No se pudieron cargar los roles disponibles");
      }
    };

    fetchRoles();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, rol: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.password ||
      !formData.rol
    ) {
      Notify.failure("Por favor complete todos los campos");
      return;
    }

    // Validar formato de email
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Notify.failure("Por favor ingrese un correo electrónico válido");
      return;
    }

    // Validar longitud de contraseña
    if (formData.password.length < 6) {
      Notify.failure("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      // Enviar datos al backend
      await post("/usuarios", formData);

      Notify.success("Usuario creado exitosamente");

      // Limpiar formulario y cerrar diálogo
      setFormData({
        nombre: "",
        email: "",
        password: "",
        rol: "",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      // El manejo de errores lo hace el hook useApi
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="flex justify-between items-center p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Creación de Usuarios
          </h1>
          <p className="text-muted-foreground flex items-center mt-1">
            <CalendarDays className="mr-1 h-4 w-4 text-foreground" />
            {formattedDate}
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Crear Usuario</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Usuario</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="py-4">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Nombre completo"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="usuario@ejemplo.com"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Mínimo 6 caracteres"
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="rol">Rol</Label>
                    <Select
                      onValueChange={handleSelectChange}
                      value={formData.rol}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.length > 0 ? (
                          roles.map((rol) => (
                            <SelectItem key={rol.id} value={rol.nombre}>
                              {rol.nombre} - {rol.descripcion}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="" disabled>
                            Cargando roles...
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Creando..." : "Crear Usuario"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};
