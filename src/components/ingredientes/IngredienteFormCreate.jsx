import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext"; // ✅ hook do toast global

const IngredienteFormCreate = () => {
  const authFetch = useAuthFetch();
  const navigate = useNavigate();
  const { setToast } = useToast(); // ✅ toast global

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [metrica, setMetrica] = useState("");
  const [loading, setLoading] = useState(false);

  const metricasEnum = ["Kg", "g", "L", "ml", "unidade", "mg"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim() || !preco || !metrica.trim()) {
      setToast({ message: "Todos os campos são obrigatórios!", type: "error", duration: 3000 });
      return;
    }

    setLoading(true);
    try {
      const res = await authFetch("http://localhost:3000/api/ingredientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, preco: Number(preco), metrica }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.erro || "Erro ao criar ingrediente.");
      }

      const created = await res.json();

      setToast({
        message: `Ingrediente "${created.nome}" criado com sucesso!`,
        type: "success",
        duration: 3000
      });

      setNome("");
      setPreco("");
      setMetrica("");

      setTimeout(() => navigate("/ingredientes"), 1500);
    } catch (err) {
      setToast({ message: err.message, type: "error", duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="card p-4 shadow-sm mx-auto"
      style={{ maxWidth: "600px" }}
      onSubmit={handleSubmit}
    >
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

      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/ingredientes")}
          disabled={loading}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className={`btn ${loading ? "btn-secondary" : "btn-success"}`}
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar Ingrediente"}
        </button>
      </div>
    </form>
  );
};

export default IngredienteFormCreate;
