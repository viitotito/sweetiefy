import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";

const UsuarioFormEdit = () => {
  const { id } = useParams();
  const authFetch = useAuthFetch();
  const navigate = useNavigate();
  const { setToast } = useToast();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await authFetch(`http://localhost:3000/api/usuarios/${id}`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.erro || "Erro ao buscar usuário.");
        }
        const data = await res.json();
        setNome(data.nome || "");
        setEmail(data.email || "");
        setPerfil(data.perfil ?? 0);
      } catch (err) {
        setToast({ message: err.message, type: "error", duration: 3000 });
        navigate("/usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [authFetch, id, setToast, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) {
      setToast({ message: "Nome e email são obrigatórios.", type: "error", duration: 3000 });
      return;
    }

    setSaving(true);
    try {
      const res = await authFetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome.trim(), email: email.trim().toLowerCase(), perfil }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.erro || "Erro ao atualizar usuário.");
      }

      setToast({ message: "Usuário atualizado com sucesso!", type: "success", duration: 3000 });
      navigate("/usuarios");
    } catch (err) {
      setToast({ message: err.message, type: "error", duration: 3000 });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Carregando dados do usuário...</p>;

  return (
    <form className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>

      <div className="mb-3">
        <label className="form-label">Nome *</label>
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
        <label className="form-label">Email *</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={saving}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Perfil</label>
        <select
          className="form-select"
          value={perfil}
          onChange={(e) => setPerfil(Number(e.target.value))}
          disabled={saving}
        >
          <option value={0}>Usuário</option>
          <option value={1}>Admin</option>
        </select>
      </div>

      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/usuarios")}
          disabled={saving}
        >
          Cancelar
        </button>
        <button type="submit" className={`btn ${saving ? "btn-secondary" : "btn-primary"}`} disabled={saving}>
          {saving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </form>
  );
};

export default UsuarioFormEdit;
