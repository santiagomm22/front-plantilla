import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuContent from "./MenuContent";

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export function EmcaliIcon() {
  return (
    <img
      src="/images/LOGO-EMCALI.png"
      alt="Emcali Icon"
      style={{
        height: 75,
        width: 190,
        margin: "0 auto",
        display: "block",
      }}
    />
  );
}

export default function SideMenuMobile({
  open,
  toggleDrawer,
}: SideMenuMobileProps) {
  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >
        <EmcaliIcon />
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
          >
            Cerrar sesion
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
