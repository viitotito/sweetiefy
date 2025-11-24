import { useAuth } from "../../auth/useAuth";
import IngredienteShow from "../../components/ingredientes/IngredienteShow";
import { Navigate } from "react-router-dom";

const IngredientesShow= () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <p>Carregando usuário...</p>;
  if (!user) return <Navigate to="/usuarios/login" replace />;

  return (
    <div>
      <IngredienteShow />
    </div>
  );
};

export default IngredientesShow;
