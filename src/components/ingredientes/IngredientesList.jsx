import { useEffect, useState } from "react";
import IngredienteCard from "../shared/IngredienteCard";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";

const IngredienteList = () => {
  const authFetch = useAuthFetch();
  const { setToast } = useToast();
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    const fetchIngredientes = async () => {
      setLoading(true);
      try {
        const res = await authFetch(`${API_URL}/api/ingredientes`);
        if (!res.ok) throw new Error("Erro ao buscar ingredientes");
        const data = await res.json();
        setIngredientes(data.map(ing => ({ ...ing, preco: Number(ing.preco ?? 0) })));
      } catch (err) {
        console.error(err);
        setToast({ message: err.message, type: "error", duration: 3000 });
      } finally {
        setLoading(false);
      }
    };
    fetchIngredientes();
  }, [authFetch, setToast, API_URL]);

  const handleDeleted = (id) => {
    setIngredientes(prev => prev.filter(ing => ing.id !== id));
    setToast({ message: "Ingrediente deletado com sucesso!", type: "success", duration: 3000 });
  };

  return (
    <div className="container py-4">
      {loading && <p className="text-center">Carregando ingredientes...</p>}
      {!loading && ingredientes.length === 0 && <p className="text-center">Nenhum ingrediente encontrado.</p>}

      <div className="d-flex justify-content-center flex-wrap gap-3">
        {ingredientes.map(ing => (
          <IngredienteCard key={ing.id} ingrediente={ing} onDeleted={handleDeleted} />
        ))}
      </div>
    </div>
  );
};

export default IngredienteList;
