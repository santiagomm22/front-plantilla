import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import MenuContent from "./MenuContent";
import { Avatar, Typography } from "@mui/material";
import UserMenuButton from "./UserMenuButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export function EmcaliIcon() {
  return (
    <img
      src="/images/LOGO-EMCALI.png"
      alt="Emcali Icon"
      style={{
        height: 80,
        width: 200,
        margin: "0 auto",
        display: "block",
      }}
    />
  );
}

export default function SideMenu() {
  const user = useSelector((state: RootState) => state.auth.user);

  // Si no hay usuario, mostramos "Invitado"
  const userName = user?.nombre || "Invitado";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <EmcaliIcon />
      </Box>
      <Divider />

      {/* Contenido del menú */}
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuContent />
      </Box>

      {/* Sección de usuario con avatar y menú */}
      <Stack
        direction="row"
        sx={{
          p: 1,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar sx={{ width: 40, height: 40, bgcolor: "primary.main" }}>
          {userInitial}
        </Avatar>
        <Typography component="p" variant="body1" sx={{ flexGrow: 1 }}>
          {userName}
        </Typography>
        <UserMenuButton />
      </Stack>
    </Drawer>
  );
}
