import { useAuth } from "../../auth/useAuth";
import IngredienteFormEdit from "../../components/ingredientes/IngredienteFormEdit";
import { Navigate, useParams } from "react-router-dom";

const IngredientesEdit = () => {
  const { user, authLoading } = useAuth();
  const { id } = useParams();

  if (authLoading) return <p>Carregando usuário...</p>;
  if (!user) return <Navigate to="/usuarios/login" replace />;

  return (
    <div>
      <IngredienteFormEdit ingredienteId={id} />
    </div>
  );
};

export default IngredientesEdit;
