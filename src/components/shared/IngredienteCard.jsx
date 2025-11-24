import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../../auth/useAuthFetch";
import Toast from "./Toast";

const IngredienteCard = ({ ingrediente, onDeleted }) => {
  const navigate = useNavigate();
  const authFetch = useAuthFetch();

  const [toast, setToast] = useState(null); // { message, type: "success"|"error" }
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    navigate(`/ingredientes/${ingrediente.id}/edit`);
  };

  const handleDelete = async () => {
    // Pergunta de confirmação
    const confirm = window.confirm(`Deseja realmente deletar "${ingrediente.nome}"?`);
    if (!confirm) return;

    setLoading(true);
    try {
      const res = await authFetch(
        `http://localhost:3000/api/ingredientes/${ingrediente.id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Não foi possível deletar o ingrediente.");

      // Se deletou com sucesso
      setToast({ message: `Ingrediente "${ingrediente.nome}" deletado com sucesso!`, type: "success" });
      onDeleted(ingrediente.id); // Atualiza a lista no componente pai
    } catch (err) {
      console.error(err);
      setToast({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Formata apenas a data de criação (dd/mm/aaaa)
  const createdAt = ingrediente.data_criacao
    ? new Date(ingrediente.data_criacao).toLocaleDateString()
    : "Não disponível";

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          setMessage={() => setToast(null)}
          duration={3000}
        />
      )}

      <div className="d-flex justify-content-center mt-3">
        <div className="card shadow-sm p-3" style={{ width: "18rem" }}>
          <h5 className="card-title">{ingrediente.nome}</h5>
          <p className="card-text mb-1">
            <strong>Preço:</strong> R$ {ingrediente.preco.toFixed(2)}
          </p>
          <p className="card-text mb-1">
            <strong>Métrica:</strong> {ingrediente.metrica}
          </p>
          <p className="card-text mb-3 text-muted">
            <small>Criado em: {createdAt}</small>
          </p>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEdit}
              disabled={loading}
            >
              Editar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deletando..." : "Deletar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredienteCard;
