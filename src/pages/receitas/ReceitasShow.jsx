import { useAuth } from "../../auth/useAuth";
import ReceitaShow from "../../components/receitas/ReceitaShow";
import { Navigate } from "react-router-dom";

const ReceitasShow = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <p>Carregando usuário...</p>;
  if (!user) return <Navigate to="/usuarios/login" replace />;

  return (
    <div>
      <ReceitaShow />
    </div>
  );
};

export default ReceitasShow;
