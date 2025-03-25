import PaginaPrincipal from "../../components/PaginaPrincipal/PaginaPrincipal";
import TablaUsuarios from "../../components/CrearUsuario/TablaUsuarios";
import ImgMediaCard from "../../components/CrearUsuario/ImgMediaCard";

export default function CrearUsuario() {
  return (
    <PaginaPrincipal>
      <TablaUsuarios />
      <ImgMediaCard />
    </PaginaPrincipal>
  );
}
