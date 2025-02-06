import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "../../components/ForgotPassword";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../../store/slices/authSlice";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  backgroundImage: "url('/imgfondo.png')", // Cambia esto con la ruta de tu imagen
  backgroundSize: "cover", // Ajusta la imagen para cubrir todo el fondo
  backgroundPosition: "center", // Centra la imagen
  backgroundRepeat: "no-repeat", // Evita que la imagen se repita
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Agrega una capa oscura
  backgroundBlendMode: "overlay", // Mezcla el color con la imagen
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export default function Login() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita el envío automático del formulario

    if (!validateInputs()) {
      return; // Detiene el proceso si hay errores
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

      // Obtén el token y los datos del usuario
      const { token, user } = response.data;

      // Despacha la acción de loginSuccess
      dispatch(
        loginSuccess({
          token,
          user,
        })
      );

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("rol", user.role);

      console.log("Contenido de localStorage (user):", user);

      const targetRoute = (() => {
        switch (user.rol) {
          case "ADMINISTRADOR":
            return "/Administrar";
          case "usuario":
            return "/Usuario";
          default:
            Notify.warning(
              "Rol no reconocido, redirigiendo a página por defecto."
            );
            return "/"; // Ruta por defecto
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

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Por favor ingrese un correo electronico valido.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "La contraseña debe tener por lo menos 6 digitos."
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
    console.log("Validación completada:", isValid);
    return isValid;
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <CssBaseline enableColorScheme />
      <Card variant="outlined">
        {/*aqui se puede agregar un icono o imagen*/}
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
          }}
        >
          <strong>Iniciar Sesión</strong>
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Correo</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>

          <ForgotPassword open={open} handleClose={handleClose} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Iniciar Sesión
          </Button>
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Olvidó su contraseña?
          </Link>
        </Box>
      </Card>
    </SignInContainer>
  );
}
