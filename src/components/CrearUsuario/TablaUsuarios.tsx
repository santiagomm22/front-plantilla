import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useEffect, useState } from "react";
import axios from "axios";
import { Formulario } from "./Formulario";
import { Box } from "@mui/material";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function TablaUsuarios() {
  const [usuarios, setUsuarios] = useState<
    { id: number; nombre: string; email: string; rol: string }[]
  >([]);
  const [refreshKey, setRefreshKey] = useState(0); // Clave para refrescar la tabla

  const BuscarUsuarios = async () => {
    try {
      Loading.dots("Cargando usuarios...");
      const response = await axios.get(`${baseUrl}/usuario/obtenerUsuario`);
      const usuariosData = response.data.map((usuario: any) => ({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol.nombre, // Asumiendo que el rol viene anidado en "usuario.rol"
      }));
      setUsuarios(usuariosData);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      Notify.failure("No se pudieron cargar los usuarios");
    } finally {
      Loading.remove();
    }
  };

  // Llamar a la API cuando el componente se monte
  useEffect(() => {
    BuscarUsuarios();
  }, [refreshKey]);
  return (
    <>
      <Formulario usuarioAgregado={() => setRefreshKey((prev) => prev + 1)} />
      <Paper elevation={16} sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ overflowX: "auto", maxWidth: "100%" }}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#2e6e2a" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }}>
                    <strong>Nombre</strong>
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    <strong>Rol</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.nombre}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.rol}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </>
  );
}
