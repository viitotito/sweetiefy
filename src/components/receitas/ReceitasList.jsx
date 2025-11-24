import { useEffect, useState } from "react";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";
import ReceitaCard from "../shared/ReceitaCard";

const ReceitasList = () => {
  const authFetch = useAuthFetch();
  const { setToast } = useToast();

  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await authFetch("http://localhost:3000/api/receitas");
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
  }, [authFetch, setToast]);

  if (loading) return <p className="text-center mt-4">Carregando receitas...</p>;

  return (
    <div className="container mt-4">
      {receitas.length === 0 && <p>Nenhuma receita cadastrada.</p>}

      <div className="row">
        {receitas.map((r) => (
          <div className="col-md-4 mb-4" key={r.id}>
            <ReceitaCard receita={r} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceitasList;
