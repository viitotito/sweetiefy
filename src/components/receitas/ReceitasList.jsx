import { useEffect, useState } from "react";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";
import ReceitaCard from "../shared/ReceitaCard";

const ReceitasList = () => {
  const authFetch = useAuthFetch();
  const { setToast } = useToast();

  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const API_URL = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await authFetch(`${API_URL}/api/receitas`);
        if (!res.ok) {
          const msg = (await res.json().catch(() => null))?.erro;
          throw new Error(msg || "Erro ao carregar receitas.");
        }
        const dados = await res.json();
        setReceitas(dados);
      } catch (err) {
        console.error(err);
        setToast({ message: err.message, type: "error", duration: 3000 });
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, [authFetch, setToast, API_URL]);

  if (loading) return <p className="text-center mt-4">Carregando receitas...</p>;

  const handleDeleted = (id) => {
    setReceitas((prev) => prev.filter((r) => r.id !== id));
  };

  const filteredReceitas = receitas.filter((r) =>
    r.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="mb-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar receita..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredReceitas.length === 0 ? (
        <p className="text-center">Nenhuma receita encontrada.</p>
      ) : (
        <div className="row">
          {filteredReceitas.map((r) => (
            <div className="col-md-4 mb-4" key={r.id}>
              <ReceitaCard receita={r} onDeleted={handleDeleted} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceitasList;
