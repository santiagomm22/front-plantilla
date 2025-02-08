import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "../../components/PaginaPrincipal/AppNavBar";
import SideMenu from "../../components/PaginaPrincipal/SideMenu";
import MediaControlCard from "../../components/PaginaPrincipal/Card";

export default function Principal() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu />
      <AppNavbar />
      {/* Main content */}
      <Box>
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          <MediaControlCard />
        </Stack>
      </Box>
    </Box>
  );
}
