import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";

const UsuarioCard = ({ usuario, onDeleted }) => {
  const navigate = useNavigate();
  const authFetch = useAuthFetch();
  const { setToast } = useToast();
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleShow = () => navigate(`/usuarios/${usuario.id}`);
  const handleEdit = () => navigate(`/usuarios/${usuario.id}/edit`);

  const handleDelete = async () => {
    const confirm = window.confirm(`Deseja realmente deletar "${usuario.nome}"?`);
    if (!confirm) return;

    setLoading(true);
    try {
      const res = await authFetch(`${API_URL}/api/usuarios/${usuario.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Não foi possível deletar o usuário.");

      onDeleted(usuario.id);

      setToast({
        message: `Usuário "${usuario.nome}" deletado com sucesso!`,
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

  const createdAt = usuario.data_criacao
    ? new Date(usuario.data_criacao).toLocaleDateString()
    : "Não disponível";

  const updatedAt = usuario.data_atualizacao
    ? new Date(usuario.data_atualizacao).toLocaleDateString()
    : "Nunca atualizado";

  const buttonStyle = {
    flex: 1,
    fontSize: "0.85rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.3rem",
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="card shadow-sm p-3" style={{ width: "16rem" }}>
        <h5 className="card-title text-truncate" title={usuario.nome}>{usuario.nome}</h5>
        <p className="card-text mb-1 text-muted"><small>Criado em: {createdAt}</small></p>
        <p className="card-text mb-3 text-muted"><small>Última atualização: {updatedAt}</small></p>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            style={buttonStyle}
            onClick={handleShow}
          >
            <i className="bi bi-eye"></i> 
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={buttonStyle}
            onClick={handleEdit}
            disabled={loading}
          >
            <i className="bi bi-pencil-square"></i> 
          </button>

          <button
            type="button"
            className="btn btn-danger btn-sm"
            style={buttonStyle}
            onClick={handleDelete}
            disabled={loading}
          >
            <i className="bi bi-trash"></i> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsuarioCard;
