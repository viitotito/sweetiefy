import { useAuth } from "../../auth/useAuth";
import UsuarioShow from "../../components/usuarios/UsuarioShow";
import { Navigate } from "react-router-dom";

const UsuariosShow = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <p>Carregando usuário...</p>;
  if (!user) return <Navigate to="/usuarios/login" replace />;

  return (
    <div>
      <UsuarioShow />
    </div>
  );
};

export default UsuariosShow;
