import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";

const UsuarioShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const authFetch = useAuthFetch();
  const { setToast } = useToast();

  const API_URL = import.meta.env.VITE_API_URL;

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await authFetch(`${API_URL}/api/usuarios/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar usuário.");
        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        setToast({ message: err.message, type: "error", duration: 3000 });
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id, authFetch, setToast, API_URL]);

  if (loading) return <p className="text-center mt-4">Carregando usuário...</p>;
  if (!usuario) return <p className="text-center mt-4">Usuário não encontrado.</p>;

  const createdAt = usuario.data_criacao
    ? new Date(usuario.data_criacao).toLocaleString()
    : "Não disponível";

  const updatedAt = usuario.data_atualizacao
    ? new Date(usuario.data_atualizacao).toLocaleString()
    : "Nunca atualizado";

  return (
    <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
      <div className="mb-3">
        <label className="form-label fw-bold">Nome</label>
        <input type="text" className="form-control" value={usuario.nome} disabled />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Email</label>
        <input type="text" className="form-control" value={usuario.email} disabled />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Perfil</label>
        <input
          type="text"
          className="form-control"
          value={usuario.perfil === 1 ? "Admin" : "Usuário"}
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Criado em</label>
        <input type="text" className="form-control" value={createdAt} disabled />
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Última atualização</label>
        <input type="text" className="form-control" value={updatedAt} disabled />
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-outline-secondary" onClick={() => navigate("/usuarios")}>
          Voltar
        </button>
      </div>
    </div>
  );
};

export default UsuarioShow;
