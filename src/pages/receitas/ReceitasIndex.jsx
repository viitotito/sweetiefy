import { useAuth } from "../../auth/useAuth";
import ReceitasList from "../../components/receitas/ReceitasList";
import { Navigate } from "react-router-dom";

const ReceitasIndex = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <p>Carregando usuário...</p>;
  if (!user) return <Navigate to="/usuarios/login" replace />;

  return (
    <div>
      <ReceitasList />
    </div>
  );
};

export default ReceitasIndex;
