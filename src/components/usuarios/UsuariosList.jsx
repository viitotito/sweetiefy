import { useEffect, useState } from "react";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";
import { useNavigate } from "react-router-dom";

const UsuariosList = () => {
  const authFetch = useAuthFetch();
  const { setToast } = useToast();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`${API_URL}/api/usuarios`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.erro || "Erro ao buscar usuários.");
      }
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      setToast({ message: err.message, type: "error", duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDelete = async (id, nome) => {
    if (!window.confirm(`Deseja realmente deletar o usuário "${nome}"?`)) return;

    try {
      const res = await authFetch(`${API_URL}/api/usuarios/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.erro || "Erro ao deletar usuário.");
      }
      setToast({ message: `Usuário "${nome}" deletado com sucesso!`, type: "success", duration: 3000 });
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setToast({ message: err.message, type: "error", duration: 3000 });
    }
  };

  if (loading) return <p className="text-center mt-4">Carregando usuários...</p>;
  if (usuarios.length === 0) return <p className="text-center mt-4">Nenhum usuário encontrado.</p>;

  return (
    <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "900px" }}>
      <h4 className="mb-4">Lista de Usuários</h4>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Perfil</th>
            <th>Criado em</th>
            <th>Última atualização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => {
            const perfilTexto = user.perfil === 1 ? "Admin" : "Usuário";
            const criado = user.data_criacao ? new Date(user.data_criacao).toLocaleString() : "Não disponível";
            const atualizado = user.data_atualizacao ? new Date(user.data_atualizacao).toLocaleString() : "Nunca atualizado";
            return (
              <tr key={user.id}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{perfilTexto}</td>
                <td>{criado}</td>
                <td>{atualizado}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => navigate(`/usuarios/${user.id}/edit`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(user.id, user.nome)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosList;
