import { useAuth } from "../../auth/useAuth";
import ReceitaFormEdit from "../../components/receitas/ReceitaFormEdit";
import { Navigate, useParams } from "react-router-dom";

const ReceitasEdit = () => {
  const { user, authLoading } = useAuth();
  const { id } = useParams();

  if (authLoading) return <p>Carregando usuário...</p>;
  if (!user) return <Navigate to="/usuarios/login" replace />;

  return (
    <div>
      <ReceitaFormEdit receitaId={id} />
    </div>
  );
};

export default ReceitasEdit;
