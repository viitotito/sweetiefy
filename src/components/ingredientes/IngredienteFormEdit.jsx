import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../../auth/useAuthFetch";
import Toast from "../shared/Toast";

const IngredienteFormEdit = ({ ingredienteId }) => {
  const authFetch = useAuthFetch();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [metrica, setMetrica] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const metricasEnum = ["Kg", "g", "L", "ml", "unidade", "mg"];

  // Busca o ingrediente pelo ID
  useEffect(() => {
    const fetchIngrediente = async () => {
      try {
        const res = await authFetch(`http://localhost:3000/api/ingredientes/${ingredienteId}`);
        if (!res.ok) throw new Error("Erro ao buscar ingrediente");

        const data = await res.json();
        setNome(data.nome);
        setPreco(data.preco);
        setMetrica(data.metrica);
      } catch (err) {
        setToast({ message: err.message, type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchIngrediente();
  }, [ingredienteId, authFetch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim() || !preco || !metrica.trim()) {
      setToast({ message: "Todos os campos são obrigatórios!", type: "error" });
      return;
    }

    setSaving(true);

    try {
      const res = await authFetch(`http://localhost:3000/api/ingredientes/${ingredienteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, preco: Number(preco), metrica }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.erro || "Erro ao atualizar ingrediente.");
      }

      const updated = await res.json();

      setToast({ message: `Ingrediente "${updated.nome}" atualizado com sucesso!`, type: "success" });

      setTimeout(() => navigate("/ingredientes"), 1500);

    } catch (err) {
      setToast({ message: err.message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Carregando ingrediente...</p>;

  return (
    <form
      className="card p-4 shadow-sm mx-auto"
      style={{ maxWidth: "600px" }}
      onSubmit={handleSubmit}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
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
          disabled={saving}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Preço (R$)</label>
        <input
          type="number"
          className="form-control"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          min="0"
          step="0.01"
          disabled={saving}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Métrica</label>
        <select
          className="form-select"
          value={metrica}
          onChange={(e) => setMetrica(e.target.value)}
          disabled={saving}
          required
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
          disabled={saving}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={saving}
        >
          {saving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </form>
  );
};

export default IngredienteFormEdit;
