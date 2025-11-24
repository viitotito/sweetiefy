import { useEffect, useState } from "react";
import { useAuthFetch } from "../../auth/useAuthFetch";
import IngredienteCard from "../../components/shared/IngredienteCard";

const IngredientesIndex = () => {
  const authFetch = useAuthFetch();
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngredientes = async () => {
      try {
        const res = await authFetch("http://localhost:3000/api/ingredientes");
        if (!res.ok) throw new Error("Erro ao buscar ingredientes");
        const data = await res.json();
        setIngredientes(data.map(ing => ({ ...ing, preco: Number(ing.preco ?? 0) })));
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os ingredientes.");
      } finally {
        setLoading(false);
      }
    };

    fetchIngredientes();
  }, [authFetch]);

  return (
    <div className="container py-4 py-md-5">
      <h1 className="fw-bold mb-4 text-center text-md-start">Meus Ingredientes</h1>

      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {loading && <p>Carregando ingredientes...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && ingredientes.length === 0 && <p>Nenhum ingrediente encontrado.</p>}
        {!loading && !error && ingredientes.map(ing => (
          <IngredienteCard key={ing.id} ingrediente={ing} />
        ))}
      </div>
    </div>
  );
};

export default IngredientesIndex;
