import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext"; // ✅ toast global

const IngredienteCard = ({ ingrediente, onDeleted }) => {
  const navigate = useNavigate();
  const authFetch = useAuthFetch();
  const { setToast } = useToast(); // ✅ hook do toast global

  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    navigate(`/ingredientes/${ingrediente.id}/edit`);
  };

  const handleDelete = async () => {
    const confirm = window.confirm(`Deseja realmente deletar "${ingrediente.nome}"?`);
    if (!confirm) return;

    setLoading(true);
    try {
      const res = await authFetch(
        `http://localhost:3000/api/ingredientes/${ingrediente.id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Não foi possível deletar o ingrediente.");

      // Atualiza a lista no componente pai
      onDeleted(ingrediente.id);

      // ✅ dispara toast global
      setToast({
        message: `Ingrediente "${ingrediente.nome}" deletado com sucesso!`,
        type: "success",
        duration: 3000
      });

    } catch (err) {
      console.error(err);
      setToast({
        message: err.message,
        type: "error",
        duration: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const createdAt = ingrediente.data_criacao
    ? new Date(ingrediente.data_criacao).toLocaleDateString()
    : "Não disponível";

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="card shadow-sm p-3" style={{ width: "18rem" }}>
        <h5 className="card-title">{ingrediente.nome}</h5>
        <p className="card-text mb-1"><strong>Preço:</strong> R$ {ingrediente.preco.toFixed(2)}</p>
        <p className="card-text mb-1"><strong>Métrica:</strong> {ingrediente.metrica}</p>
        <p className="card-text mb-3 text-muted"><small>Criado em: {createdAt}</small></p>

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
  );
};

export default IngredienteCard;
