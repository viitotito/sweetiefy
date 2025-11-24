import { useAuth } from "../../auth/useAuth";
import ReceitaFormCreate from "../../components/receitas/ReceitaFormCreate";
import { Navigate } from "react-router-dom";

const ReceitasCreate = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <p>Carregando usuário...</p>;
  if (!user) return <Navigate to="/usuarios/login" replace />;

  return (
    <div>
      <ReceitaFormCreate />
    </div>
  );
};

export default ReceitasCreate;
