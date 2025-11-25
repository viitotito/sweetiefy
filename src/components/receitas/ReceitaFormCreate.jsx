import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";

const ReceitaFormCreate = () => {
  const authFetch = useAuthFetch();
  const navigate = useNavigate();
  const { setToast } = useToast();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagemPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagemPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim() || !preco) {
      setToast({ message: "Nome e preço são obrigatórios.", type: "error", duration: 3000 });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("descricao", descricao);
      formData.append("preco", preco);
      if (imagem) formData.append("imagem", imagem);

      const res = await authFetch("http://localhost:3000/api/receitas", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.erro || "Erro ao criar receita.");
      }

      const receitaCriada = await res.json();

      setToast({
        message: `Receita "${receitaCriada.nome}" criada com sucesso!`,
        type: "success",
        duration: 3000,
      });

      setNome("");
      setDescricao("");
      setPreco("");
      setImagem(null);
      setImagemPreview(null);

      setTimeout(() => navigate("/receitas"), 1500);
    } catch (err) {
      setToast({ message: err.message, type: "error", duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="card p-4 shadow-sm mx-auto"
      style={{ maxWidth: "600px" }}
      onSubmit={handleSubmit}
    >
      <div className="mb-3">
        <label className="form-label">Nome da Receita *</label>
        <input
          type="text"
          className="form-control"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Bolo de Chocolate"
          required
          disabled={loading}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descrição</label>
        <textarea
          className="form-control"
          rows="3"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex: Receita deliciosa de bolo..."
          disabled={loading}
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Preço (R$) *</label>
        <input
          type="number"
          className="form-control"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="Ex: 25.50"
          min="0"
          step="0.01"
          required
          disabled={loading}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Imagem da Receita (opcional)</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleImagemChange}
          disabled={loading}
        />
      </div>

      {imagemPreview && (
        <div className="mb-3 text-center">
          <img
            src={imagemPreview}
            alt="Pré-visualização"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "50%",
              marginBottom: "10px",
              border: "2px solid #ccc",
            }}
          />
        </div>
      )}

      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/receitas")}
          disabled={loading}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className={`btn ${loading ? "btn-secondary" : "btn-success"}`}
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar Receita"}
        </button>
      </div>
    </form>
  );
};

export default ReceitaFormCreate;
