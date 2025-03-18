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
            mt: { xs: 6, md: 0 },
            alignItems: "flex-start", // Evita que todos los elementos ocupen el mismo ancho
            width: "auto", // Permite que cada hijo mantenga su propio tamaño
          }}
        >
          {children}
        </Stack>
      </Box>
    </Box>
  );
}
