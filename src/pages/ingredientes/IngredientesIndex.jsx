import { useAuth } from "../../auth/useAuth";
import IngredientesList from "../../components/ingredientes/IngredientesList";
import { Navigate } from "react-router-dom";

const IngredientesIndex = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <p>Carregando usuário...</p>;
  if (!user) return <Navigate to="/usuarios/login" replace />;

  return (
    <div>
      <IngredientesList />
    </div>
  );
};

export default IngredientesIndex;
