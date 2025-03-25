import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"; // Ajusta la ruta según tu estructura

// Definir opciones del menú con permisos por rol
const menuItems = [
  {
    text: "Crear Usuario",
    icon: <PersonAddAlt1Icon />,
    path: "/CrearUsuario",
    roles: ["ADMINISTRADOR"],
  },
  {
    text: "Crear Usuario",
    icon: <PersonAddAlt1Icon />,
    path: "/CrearUsuario",
    roles: ["ADMINISTRADOR"],
  },
  {
    text: "Crear Usuario",
    icon: <PersonAddAlt1Icon />,
    path: "/CrearUsuario",
    roles: ["ADMINISTRADOR"],
  },
  {
    text: "Crear Usuario",
    icon: <PersonAddAlt1Icon />,
    path: "/CrearUsuario",
    roles: ["ADMINISTRADOR"],
  },
  {
    text: "Tabla Informativa",
    icon: <FormatListBulletedIcon />,
    path: "/TablaInformativa",
    roles: ["USUARIO"],
  },
];

export default function MenuContent() {
  const navigate = useNavigate();
  const userRole =
    useSelector((state: RootState) => state.auth.user?.rol) || "guest"; // Obtener rol del usuario

  // Filtrar opciones según el rol del usuario
  const filteredItems = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <Stack
      sx={{
        flexGrow: 1,
        p: 1,
        justifyContent: "space-between",
        backgroundColor: "#d9fac9",
      }}
    >
      <List dense>
        {filteredItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
