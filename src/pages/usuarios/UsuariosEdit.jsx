import { useAuth } from "../../auth/useAuth";
import UsuarioFormEdit from "../../components/usuarios/UsuarioFormEdit";
import { Navigate, useParams } from "react-router-dom";

const UsuariosEdit = () => {
  const { user, authLoading } = useAuth();
  const { id } = useParams();

  if (authLoading) return <p>Carregando usuário...</p>;
  if (!user) return <Navigate to="/usuarios/login" replace />;

  return (
    <div>
      <UsuarioFormEdit usuarioId={id} />
    </div>
  );
};

export default UsuariosEdit;
