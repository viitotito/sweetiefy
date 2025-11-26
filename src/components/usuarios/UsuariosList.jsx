import { useEffect, useState } from "react";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";
import UsuarioCard from "../shared/UsuarioCard";
import { Container, Row, Col } from "react-bootstrap";

const UsuariosList = () => {
  const authFetch = useAuthFetch();
  const { setToast } = useToast();

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const handleDelete = (id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  const filteredUsuarios = usuarios.filter((user) =>
    user.nome.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center mt-4">Carregando usuários...</p>;
  if (usuarios.length === 0) return <p className="text-center mt-4">Nenhum usuário encontrado.</p>;

  return (
    <div className="p-4">
      {/* Barra de pesquisa */}
      <div className="mb-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar usuário..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid de cards */}
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {filteredUsuarios.length > 0 ? (
          filteredUsuarios.map((usuario) => (
            <UsuarioCard
              key={usuario.id}
              usuario={usuario}
              onDeleted={handleDelete}
            />
          ))
        ) : (
          <p className="text-center w-100">Nenhum usuário encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default UsuariosList;
