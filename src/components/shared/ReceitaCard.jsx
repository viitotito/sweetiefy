import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";
import ReceitaImagem from "./ReceitaImagem";

const ReceitaCard = ({ receita, onDeleted }) => {
  const navigate = useNavigate();
  const authFetch = useAuthFetch();
  const { setToast } = useToast();
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleShow = () => navigate(`/receitas/${receita.id}`);
  const handleEdit = () => navigate(`/receitas/${receita.id}/edit`);

  const handleDelete = async () => {
    if (!window.confirm(`Deseja realmente deletar "${receita.nome}"?`)) return;

    setLoading(true);
    try {
      const res = await authFetch(`${API_URL}/api/receitas/${receita.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Não foi possível deletar a receita.");

      onDeleted && onDeleted(receita.id);

      setToast({
        message: `Receita "${receita.nome}" deletada com sucesso!`,
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

  return (
    <div
      className="card text-center p-3"
      style={{
        height: "320px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ReceitaImagem url={receita.imagem_url} nome={receita.nome} />

      <div className="card-body p-2 flex-grow-1 d-flex flex-column justify-content-between">
        <div>
          <h5
            className="card-title"
            style={{
              maxWidth: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={receita.nome}
          >
            {receita.nome}
          </h5>

          <p
            className="card-text"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "2.4em", 
            }}
            title={receita.descricao || "Sem descrição."}
          >
            {receita.descricao || "Sem descrição."}
          </p>
        </div>

        <div>
          <p className="fw-bold">Preço: R$ {Number(receita.preco).toFixed(2)}</p>

          <div className="d-flex justify-content-center gap-2 mt-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
              onClick={handleShow}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                padding: 0,
                fontSize: "1rem",
              }}
            >
              <i className="bi bi-eye"></i>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm d-flex align-items-center justify-content-center"
              onClick={handleEdit}
              disabled={loading}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                padding: 0,
                fontSize: "1rem",
              }}
            >
              <i className="bi bi-pencil-square"></i>
            </button>

            <button
              type="button"
              className="btn btn-danger btn-sm d-flex align-items-center justify-content-center"
              onClick={handleDelete}
              disabled={loading}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                padding: 0,
                fontSize: "1rem",
              }}
            >
              <i className="bi bi-trash"></i>
              {loading ? "..." : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceitaCard;
