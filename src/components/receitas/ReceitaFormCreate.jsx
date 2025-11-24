import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";

const ReceitaFormCreate = () => {
  const navigate = useNavigate();
  const authFetch = useAuthFetch();
  const { setToast } = useToast();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim() || preco === "") {
      return setToast({
        message: "Nome e preço são obrigatórios.",
        type: "error",
        duration: 3000,
      });
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("descricao", descricao);
      formData.append("preco", preco);

      if (imagem) {
        formData.append("imagem", imagem);
      }

      const res = await authFetch("http://localhost:3000/api/receitas", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.erro || "Erro ao criar receita.");
      }

      const receitaCriada = await res.json();

      setToast({
        message: `Receita "${receitaCriada.nome}" criada com sucesso!`,
        type: "success",
        duration: 3000,
      });

      navigate("/receitas");

    } catch (err) {
      console.error(err);
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
    <div className="container mt-4" style={{ maxWidth: "550px" }}>
      <h2 className="mb-4">Criar Receita</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        {/* Nome */}
        <div className="mb-3">
          <label className="form-label">Nome da Receita *</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        {/* Descrição */}
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            rows="3"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>
        </div>

        {/* Preço */}
        <div className="mb-3">
          <label className="form-label">Preço *</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>

        {/* Imagem */}
        <div className="mb-3">
          <label className="form-label">Imagem da Receita</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => setImagem(e.target.files[0])}
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Criar Receita"}
        </button>

      </form>
    </div>
  );
};

export default ReceitaFormCreate;
