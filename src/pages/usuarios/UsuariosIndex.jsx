import { useAuth } from "../../auth/useAuth";
import UsuariosList from "../../components/usuarios/UsuariosList";
import { Navigate } from "react-router-dom";

const ReceitasIndex = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <p>Carregando usuário...</p>;
  if (!user) return <Navigate to="/usuarios/login" replace />;

  return (
    <div>
      <UsuariosList />
    </div>
  );
};

export default ReceitasIndex;
