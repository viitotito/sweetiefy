import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useAuthFetch } from "../../auth/useAuthFetch";
import Toast from "../../components/shared/Toast";

const IngredientesCreate = () => {
  const { user } = useAuth();
  const authFetch = useAuthFetch();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [metrica, setMetrica] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const metricasEnum = ["Kg", "g", "L", "ml", "unidade", "mg"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim() || !preco || !metrica.trim()) {
      setToast({ message: "Todos os campos são obrigatórios!", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const res = await authFetch("http://localhost:3000/api/ingredientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, preco: Number(preco), metrica })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.erro || "Erro ao criar ingrediente.");
      }

      const created = await res.json();
      setToast({
        message: `Ingrediente "${created.nome}" criado com sucesso!`,
        type: "success"
      });

      setNome("");
      setPreco("");
      setMetrica("");

      setTimeout(() => navigate("/ingredientes"), 1500);

    } catch (err) {
      console.error(err);
      setToast({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container py-4 py-md-5">
        <form
          className="card p-4 shadow-sm mx-auto"
          style={{ maxWidth: "600px" }}
          onSubmit={handleSubmit}
        >
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              setMessage={() => setToast(null)}
              duration={3000}
            />
          )}

          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Açúcar"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Preço (R$)</label>
            <input
              type="number"
              className="form-control"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="Ex: 5.50"
              min="0"
              step="0.01"
              required
              disabled={loading}
            />
          </div>

          {/* 🔥 SELECT de MÉTRICAS */}
          <div className="mb-3">
            <label className="form-label">Métrica</label>
            <select
              className="form-select"
              value={metrica}
              onChange={(e) => setMetrica(e.target.value)}
              required
              disabled={loading}
            >
              <option value="">Selecione uma métrica</option>
              {metricasEnum.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className={`btn ${loading ? "btn-secondary" : "btn-success"}`}
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar Ingrediente"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default IngredientesCreate;
