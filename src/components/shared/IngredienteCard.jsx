import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";

const IngredienteCard = ({ ingrediente, onDeleted }) => {
  const navigate = useNavigate();
  const authFetch = useAuthFetch();
  const { setToast } = useToast();
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleShow = () => navigate(`/ingredientes/${ingrediente.id}`);
  const handleEdit = () => navigate(`/ingredientes/${ingrediente.id}/edit`);

  const handleDelete = async () => {
    if (!window.confirm(`Deseja realmente deletar "${ingrediente.nome}"?`)) return;

    setLoading(true);
    try {
      const res = await authFetch(`${API_URL}/api/ingredientes/${ingrediente.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Não foi possível deletar o ingrediente.");

      onDeleted && onDeleted(ingrediente.id);

      setToast({
        message: `Ingrediente "${ingrediente.nome}" deletado com sucesso!`,
        type: "success",
        duration: 3000,
      });
    } catch (err) {
      setToast({
        message: err.message,
        type: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const createdAt = ingrediente.data_criacao
    ? new Date(ingrediente.data_criacao).toLocaleDateString()
    : "Não disponível";

  const truncateText = (text, maxLength = 25) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className="d-flex justify-content-center mt-3">
      <div
        className="card shadow-sm p-3"
        style={{
          width: "20rem",       
          height: "260px",      
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: "12px" 
        }}
      >
        <div>
          <h5
            className="card-title"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={ingrediente.nome}
          >
            {truncateText(ingrediente.nome)}
          </h5>

          <p
            className="card-text mb-1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={`Preço: R$ ${ingrediente.preco.toFixed(2)}`}
          >
            <strong>Preço:</strong> R$ {ingrediente.preco.toFixed(2)}
          </p>

          <p
            className="card-text mb-1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={`Métrica: ${ingrediente.metrica}`}
          >
            <strong>Métrica:</strong> {truncateText(ingrediente.metrica, 20)}
          </p>

          <p className="card-text mb-3 text-muted">
            <small>Criado em: {createdAt}</small>
          </p>
        </div>

        <div className="d-flex flex-column gap-2 flex-shrink-0">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={handleShow}
          >
            <i className="bi bi-eye"></i> Ver detalhes
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={handleEdit}
            disabled={loading}
          >
            <i className="bi bi-pencil-square"></i> Editar
          </button>

          <button
            type="button"
            className="btn btn-danger btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={handleDelete}
            disabled={loading}
          >
            <i className="bi bi-trash"></i>
            {loading ? " Deletando..." : " Deletar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredienteCard;
