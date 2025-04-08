import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { loginSuccess } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function EmcaliIcon() {
  return (
    <img
      src="/images/LOGO-EMCALI.png"
      alt="Emcali Icon"
      className="h-20 w-auto mx-auto"
    />
  );
}

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateInputs = () => {
    const correo = document.getElementById("correo") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!correo.value || !/\S+@\S+\.\S+/.test(correo.value)) {
      setEmailError(true);
      setEmailErrorMessage("Ingrese un correo válido.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "La contraseña debe tener al menos 6 caracteres."
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!validateInputs()) {
      setIsSubmitting(false);
      return;
    }

    const correo = (document.getElementById("correo") as HTMLInputElement)
      .value;
    const data = {
      correo,
      password: (document.getElementById("password") as HTMLInputElement).value,
    };

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token, user } = response.data;

      dispatch(
        loginSuccess({
          token,
          user,
        })
      );

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("rol", user.role);

      const targetRoute = (() => {
        switch (user.rol) {
          case "ADMINISTRADOR":
            return "/usuarios";
          case "USUARIO":
            return "/RgVactor";
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
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail || !/\S+@\S+\.\S+/.test(resetEmail)) {
      Notify.failure("Por favor, ingrese un correo electrónico válido");
      return;
    }

    try {
      // Aquí implementarías la lógica para solicitar restablecer contraseña
      // await axios.post(`${baseUrl}/auth/reset-password`, { email: resetEmail });
      Notify.success("Se ha enviado un correo para restablecer su contraseña");
      setResetEmail("");
    } catch (error) {
      Notify.failure("No se pudo procesar su solicitud. Intente nuevamente.");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-12"
      style={{
        backgroundImage: "url('/images/FondoEmcali.png')",
        backgroundSize: "cover",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Fallback color
        backgroundBlendMode: "overlay", // Oscurece ligeramente la imagen
      }}
    >
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <EmcaliIcon />
          <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="correo">Correo Electrónico</Label>
              <Input
                id="correo"
                type="email"
                placeholder="usuario@correo.com"
                className={emailError ? "border-red-500" : ""}
              />
              {emailError && (
                <p className="text-sm text-red-500">{emailErrorMessage}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 h-auto text-sm">
                      ¿Olvidó su contraseña?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Recuperar Contraseña</DialogTitle>
                      <DialogDescription>
                        Ingrese su correo electrónico y le enviaremos
                        instrucciones para recuperar su contraseña.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="reset-email">Correo Electrónico</Label>
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="usuario@correo.com"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" onClick={handleResetPassword}>
                        Enviar Instrucciones
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••"
                className={passwordError ? "border-red-500" : ""}
              />
              {passwordError && (
                <p className="text-sm text-red-500">{passwordErrorMessage}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Iniciando sesión..." : "Ingresar"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center text-sm text-gray-500">
          Sistema de Gestión - EMCALI
        </CardFooter>
      </Card>
    </div>
  );
}
