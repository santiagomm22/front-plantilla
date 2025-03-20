import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface EliminarUsuarioProps {
  usuarioId: number; // ID del usuario que se va a eliminar
  usuarioEliminado: () => void; // Función para actualizar la tabla
}

export const EliminarUsuario: React.FC<EliminarUsuarioProps> = ({
  usuarioId,
  usuarioEliminado,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEliminar = async () => {
    try {
      // Envía la solicitud de eliminación al backend
      const response = await axios.put(
        `${baseUrl}/usuario/desactivar/${usuarioId}`
      );
      console.log("Usuario eliminado:", response.data);

      // Cierra el diálogo
      handleClose();

      // Muestra una notificación de éxito
      Notify.success("Usuario eliminado exitosamente");

      // Ejecuta la función para actualizar la tabla
      usuarioEliminado();
    } catch (error: any) {
      console.error("Error al eliminar el usuario:", error);
      Notify.failure("Ocurrió un error al eliminar el usuario");
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Eliminar usuario"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Al dar click en el botón eliminar, borrará toda la información de
            este usuario.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">
            Cerrar
          </Button>
          <Button onClick={handleEliminar} autoFocus variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
