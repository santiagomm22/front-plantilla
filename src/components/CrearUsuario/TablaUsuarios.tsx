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
import { ActualizarUsuario } from "./ActualizarUsuario";

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

  // Función para actualizar la lista de usuarios
  const actualizarListaUsuarios = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <Formulario usuarioAgregado={actualizarListaUsuarios} />
      <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
        <Box sx={{ overflowX: "auto", maxWidth: "100%" }}>
          <TableContainer
            sx={{
              maxWidth: "100%",
              overflowX: "auto", // Permite scroll horizontal solo en la tabla
              "&::-webkit-scrollbar": {
                height: "8px", // Personaliza el scrollbar si lo deseas
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "4px",
              },
            }}
          >
            <Table
              aria-label="simple table"
              sx={{
                minWidth: 650, // Establece un ancho mínimo para forzar scroll en pantallas pequeñas
              }}
            >
              <TableHead style={{ backgroundColor: "#2f6d2b" }}>
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
                  <TableCell style={{ color: "white" }}>
                    <strong>Acciones</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.nombre}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.rol}</TableCell>
                    <TableCell>
                      <ActualizarUsuario
                        usuario={{
                          id: usuario.id.toString(), // Convertir a string si es necesario
                          Nombre: usuario.nombre,
                          Email: usuario.email,
                          Rol: usuario.rol,
                        }}
                        usuarioActualizado={actualizarListaUsuarios}
                        usuarioEliminado={actualizarListaUsuarios} // Pasa la misma función
                      />
                    </TableCell>
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
