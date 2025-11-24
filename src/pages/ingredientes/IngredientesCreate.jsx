import { useAuth } from "../../auth/useAuth";
import IngredienteFormCreate from "../../components/ingredientes/IngredienteFormCreate";
import { Navigate } from "react-router-dom";

const IngredientesCreate = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <p>Carregando usuário...</p>;
  if (!user) return <Navigate to="/usuarios/login" replace />;

  return (
    <div>
      <IngredienteFormCreate />
    </div>
  );
};

export default IngredientesCreate;
