/**
 * @file SignInCard
 * @description Esta página está encargada de hacer la validación y autenticación del login, además de la petición POST al backend
 */

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { loginSuccess } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react"; // Importamos íconos de lucide-react

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function EmcaliIcon() {
  return (
    <img
      src="/images/logo-emcali.webp"
      alt="Emcali Icon"
      className="h-[100px] w-[250px] mx-auto block"
    />
  );
}

interface SignInCardProps extends React.ComponentProps<typeof Card> {}

export default function SignInCard({ className, ...props }: SignInCardProps) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false); // Estado para mostrar/ocultar contraseña
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Ingrese un correo válido.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("La password debe tener al menos 6 caracteres.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
    console.log("Validación completada:", isValid);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const data = {
      email,
      password: (document.getElementById("password") as HTMLInputElement).value,
    };

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const token = response.data.token || response.data.access_token;
      const user = response.data.user;

      if (!token || !user) {
        console.error("Formato de respuesta inválido:", response.data);
        Notify.failure("Error: Formato de respuesta del servidor inválido");
        return;
      }

      // Guardamos en Redux
      dispatch(
        loginSuccess({
          token,
          user,
        })
      );

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("rol", user.rol);

      console.log("Contenido de localStorage (user):", user);

      const targetRoute = (() => {
        switch (user.rol) {
          case "ADMINISTRADOR":
            return "/dashboard";
          case "EMPRESA":
            return "/solicitudes";
          case "OPERARIO":
            return "/medicion";
          case "VIGILANCIA":
            return "/vigilantes";
          case "USUARIO":
            return "/usuarios";
          default:
            Notify.warning(
              "Rol no reconocido, redirigiendo a página por defecto."
            );
            return "/";
        }
      })();

      navigate(targetRoute);
    } catch (error: any) {
      console.error("Detalles del error:", error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Ocurrió un error inesperado. Por favor, intente nuevamente.";

      Notify.failure(errorMessage);
    }
  };

  return (
    <Card
      className={`flex flex-col self-center w-full p-6 gap-4 sm:w-[450px] 
      shadow-[hsla(220,30%,5%,0.05)_0px_5px_15px_0px,hsla(220,25%,10%,0.05)_0px_15px_35px_-5px]
      dark:shadow-[hsla(220,30%,5%,0.5)_0px_5px_15px_0px,hsla(220,25%,10%,0.08)_0px_15px_35px_-5px]
      ${className || ""}`}
      {...props}
    >
      <EmcaliIcon />

      <h1 className="w-full text-center text-[clamp(2rem,10vw,2.15rem)] font-bold">
        Iniciar Sesión
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Correo</Label>
          <Input
            id="email"
            type="email"
            placeholder="usuario@correo.com"
            className={emailError ? "border-red-500" : ""}
          />
          {emailError && (
            <p className="text-sm text-red-500">{emailErrorMessage}</p>
          )}
        </div>

        <div className="grid gap-2">
          {/* Contenedor flex para la etiqueta y el enlace de recuperación */}
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"} // Alterna entre text y password
              placeholder="••••••"
              className={passwordError ? "border-red-500" : ""}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {passwordError && (
            <p className="text-sm text-red-500">{passwordErrorMessage}</p>
          )}
        </div>
        <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700">
          Ingresar
        </Button>
      </form>
    </Card>
  );
}
