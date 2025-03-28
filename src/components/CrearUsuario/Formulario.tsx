import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const validationSchema = Yup.object({
  Nombre: Yup.string().required("El nombre del usuario es obligatorio"),
  Email: Yup.string().required("El email del usuario es obligatorio"),
  Rol: Yup.string().required("El rol es obligatorio"),
});

interface FormularioProps {
  usuarioAgregado: () => void;
}

export const Formulario: React.FC<FormularioProps> = ({ usuarioAgregado }) => {
  const [open, setOpen] = React.useState(false);
  const [roles, setRoles] = React.useState<string[]>([]);

  const handleClickOpen = async () => {
    setOpen(true);
    try {
      const response = await axios.get(`${baseUrl}/roles`);
      const rolesNombres = response.data.map((rol: any) => rol.nombre); // Solo extrae el nombre de cada rol
      setRoles(rolesNombres);
    } catch (error) {
      console.error("Error al obtener roles:", error);
      Notify.failure("No se pudieron cargar los roles");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      Nombre: "",
      Email: "",
      Rol: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await axios.post(
          `${baseUrl}/auth/register`,
          {
            nombre: values.Nombre,
            email: values.Email,
            rol: values.Rol,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Usuario registrado:", response.data);

        handleClose();
        resetForm();
        Notify.success("Se registró el usuario exitosamente");

        usuarioAgregado();
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Ocurrió un error inesperado";
        console.error("Detalles del error:", error.response?.data);
        Notify.failure(errorMessage);
      }
    },
  });

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} color="success">
        Crear Nuevo Usuario
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"Crear Nuevo Usuario"}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            id="formulario-usuario"
            onSubmit={formik.handleSubmit}
            sx={{ "& > :not(style)": { m: 1, width: "30ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="Nombre"
              label="Nombre completo"
              variant="outlined"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Nombre}
              helperText={
                formik.touched.Nombre && formik.errors.Nombre
                  ? formik.errors.Nombre
                  : ""
              }
              error={formik.touched.Nombre && Boolean(formik.errors.Nombre)}
            />

            <TextField
              id="Email"
              label="Email"
              type="email"
              variant="outlined"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Email}
              helperText={
                formik.touched.Email && formik.errors.Email
                  ? formik.errors.Email
                  : ""
              }
              error={formik.touched.Email && Boolean(formik.errors.Email)}
            />

            {/* Select para roles */}
            <FormControl
              sx={{ width: "30ch" }}
              error={formik.touched.Rol && Boolean(formik.errors.Rol)}
            >
              <InputLabel id="rol-label">Rol</InputLabel>
              <Select
                labelId="rol-label"
                id="Rol"
                value={formik.values.Rol}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="Rol"
              >
                {roles.map((rol) => (
                  <MenuItem key={rol} value={rol}>
                    {rol}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formik.touched.Rol && formik.errors.Rol
                  ? formik.errors.Rol
                  : ""}
              </FormHelperText>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cerrar
          </Button>
          <Button variant="contained" onClick={() => formik.handleSubmit()}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
