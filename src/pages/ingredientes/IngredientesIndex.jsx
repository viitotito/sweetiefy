import { useState, useEffect } from "react";
import Toast from "../../components/shared/Toast";
import IngredienteCard from "../../components/shared/IngredienteCard";
import { useAuthFetch } from "../../auth/useAuthFetch";

export default function IngredientesIndex() {
  const authFetch = useAuthFetch();
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchIngredientes = async () => {
      setLoading(true);
      try {
        const res = await authFetch("http://localhost:3000/api/ingredientes");
        if (!res.ok) throw new Error("Erro ao buscar ingredientes");
        const data = await res.json();
        setIngredientes(data.map(ing => ({ ...ing, preco: Number(ing.preco ?? 0) })));
      } catch (err) {
        console.error(err);
        setToast({ message: err.message, type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchIngredientes();
  }, [authFetch]);

  const handleDeleted = (id) => {
    setIngredientes(prev => prev.filter(ing => ing.id !== id));
    setToast({ message: "Ingrediente deletado com sucesso!", type: "success" });
  };

  return (
    <div className="container py-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          setMessage={() => setToast(null)}
          duration={3000}
        />
      )}

      {loading && <p className="text-center">Carregando ingredientes...</p>}

      {!loading && ingredientes.length === 0 && (
        <p className="text-center">Nenhum ingrediente encontrado.</p>
      )}

      <div className="d-flex justify-content-center flex-wrap gap-3">
        {ingredientes.map(ing => (
          <IngredienteCard key={ing.id} ingrediente={ing} onDeleted={handleDeleted} />
        ))}
      </div>
    </div>
  );
}
