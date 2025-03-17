import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "../../components/PaginaPrincipal/AppNavBar";
import SideMenu from "../../components/PaginaPrincipal/SideMenu";
import { ReactNode } from "react";

interface PaginaPrincipalProps {
  children?: ReactNode;
}

export default function PaginaPrincipal({ children }: PaginaPrincipalProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu />
      <AppNavbar />

      {/* Contenedor principal que ahora acepta hijos */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          {children}
        </Stack>
      </Box>
    </Box>
  );
}
