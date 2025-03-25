import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import AppNavbar from "../../components/PaginaPrincipal/AppNavBar";
import SideMenu from "../../components/PaginaPrincipal/SideMenu";
import { ReactNode } from "react";

interface PaginaPrincipalProps {
  children?: ReactNode;
}

export default function PaginaPrincipal({ children }: PaginaPrincipalProps) {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, 0.08)", // Color oscuro para toda la página
        minHeight: "100vh", // Asegura que el fondo oscuro cubra toda la altura
        width: "100%",
      }}
    >
      <SideMenu />
      <AppNavbar />

      {/* Contenedor principal que ahora acepta hijos */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Stack
          spacing={2}
          sx={{
            mt: { xs: 6, md: 0 },
            alignItems: "flex-start",
            width: "auto",
          }}
        >
          {/* Envolver cada hijo en un Paper (card-like) component */}
          {children &&
            React.Children.map(children, (child) => (
              <Paper
                elevation={3}
                sx={{
                  width: "fit-content", // Cambia esto
                  alignSelf: "flex-start", // Agrega esto
                  backgroundColor: "background.paper",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    p: 2, // Padding interno
                  }}
                >
                  {child}
                </Box>
              </Paper>
            ))}
        </Stack>
      </Box>
    </Box>
  );
}
