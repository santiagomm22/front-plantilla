import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuContent from "./MenuContent";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { logout } from "../../store/slices/authSlice"; // Asegúrate de importar la acción `logout`

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({
  open,
  toggleDrawer,
}: SideMenuMobileProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener usuario desde Redux
  const user = useSelector((state: RootState) => state.auth.user);

  // Si no hay usuario, mostramos "Invitado"
  const userName = user?.nombre || "Invitado";
  const userInitial = userName.charAt(0).toUpperCase();

  // Función para cerrar sesión
  const handleLogout = () => {
    dispatch(logout()); // Elimina los tokens del estado y localStorage
    navigate("/"); // Redirige a la página de inicio de sesión
  };

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >
        {/* Sección de avatar y nombre */}
        <Stack
          direction="row"
          sx={{ p: 2, pb: 0, gap: 1, alignItems: "center" }}
        >
          <Avatar sx={{ width: 40, height: 40, bgcolor: "primary.main" }}>
            {userInitial}
          </Avatar>
          <Typography component="p" variant="h6">
            {userName}
          </Typography>
        </Stack>

        <Divider style={{ marginTop: "10px" }} />

        {/* Contenido del menú */}
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>

        {/* Botón de cerrar sesión */}
        <Stack sx={{ p: 2 }}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
