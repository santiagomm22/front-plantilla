import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"; // Ajusta la ruta según tu estructura

// Definir opciones del menú con permisos por rol
const menuItems = [
  {
    text: "Home",
    icon: <HomeRoundedIcon />,
    path: "/Pagina1",
    roles: ["ADMINISTRADOR"],
  },
  {
    text: "Analytics",
    icon: <AnalyticsRoundedIcon />,
    path: "/analytics",
    roles: ["ADMINISTRADOR"],
  },
  {
    text: "Clients",
    icon: <PeopleRoundedIcon />,
    path: "/clients",
    roles: ["USUARIO"],
  },
  {
    text: "Tasks",
    icon: <AssignmentRoundedIcon />,
    path: "/tasks",
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
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
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
