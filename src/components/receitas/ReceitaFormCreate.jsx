import { useState, useEffect } from "react";
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
  const [ingredientes, setIngredientes] = useState([]);
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIngredientes = async () => {
      try {
        const res = await authFetch("http://localhost:3000/api/ingredientes");
        if (!res.ok) throw new Error("Erro ao buscar ingredientes");
        const data = await res.json();
        setIngredientes(data);
      } catch (err) {
        setToast({ message: err.message, type: "error", duration: 3000 });
      }
    };
    fetchIngredientes();
  }, [authFetch, setToast]);

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

  const handleCheckboxChange = (id) => {
    setIngredientesSelecionados((prev) => {
      const newState = { ...prev };
      if (newState[id] !== undefined) {
        delete newState[id];
      } else {
        newState[id] = 1; 
      }
      return newState;
    });
  };

  const handleQuantidadeChange = (id, quantidade) => {
    setIngredientesSelecionados((prev) => ({
      ...prev,
      [id]: quantidade,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim() || !preco) {
      setToast({ message: "Nome e preço são obrigatórios.", type: "error", duration: 3000 });
      return;
    }

    if (Object.keys(ingredientesSelecionados).length === 0) {
      setToast({ message: "Selecione pelo menos um ingrediente.", type: "error", duration: 3000 });
      return;
    }

    const invalidQtd = Object.values(ingredientesSelecionados).some((q) => q <= 0);
    if (invalidQtd) {
      setToast({ message: "Todas as quantidades devem ser maiores que 0.", type: "error", duration: 3000 });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("descricao", descricao);
      formData.append("preco", preco);
      if (imagem) formData.append("imagem", imagem);

      const ingredientesArray = Object.entries(ingredientesSelecionados).map(([id, quantidade]) => ({
        id: Number(id),
        quantidade,
      }));

      formData.append("ingredientes", JSON.stringify(ingredientesArray));

      const res = await authFetch("http://localhost:3000/api/receitas", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.erro || "Erro ao criar receita.");
      }

      const receitaCriada = await res.json();
      setToast({ message: `Receita "${receitaCriada.nome}" criada com sucesso!`, type: "success", duration: 3000 });

      setNome("");
      setDescricao("");
      setPreco("");
      setImagem(null);
      setImagemPreview(null);
      setIngredientesSelecionados({});

      setTimeout(() => navigate("/receitas"), 1500);
    } catch (err) {
      setToast({ message: err.message, type: "error", duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nome da Receita *</label>
        <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Bolo de Chocolate" required disabled={loading} />
      </div>

      <div className="mb-3">
        <label className="form-label">Descrição</label>
        <textarea className="form-control" rows="3" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: Receita deliciosa..." disabled={loading}></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Preço (R$) *</label>
        <input type="number" className="form-control" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Ex: 25.50" min="0" step="0.01" required disabled={loading} />
      </div>

      <div className="mb-3">
        <label className="form-label">Ingredientes *</label>
        <div className="p-3" style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #c9c9c99a", borderRadius: ".25rem" }}>
          {ingredientes.length === 0 && <p className="text-muted">Nenhum ingrediente disponível.</p>}
          <div className="d-flex flex-column">
            {ingredientes.map((ing) => {
              const qtd = ingredientesSelecionados[ing.id] ?? null;
              return (
                <div className="d-flex align-items-center mb-2" key={ing.id}>
                  <input type="checkbox" className="form-check-input me-2" checked={qtd !== null} onChange={() => handleCheckboxChange(ing.id)} disabled={loading} />
                  <label className="form-check-label me-2">{ing.nome} ({ing.preco} R$ / {ing.metrica})</label>
                  {qtd !== null && (
                    <input type="number" className="form-control form-control-sm" style={{ width: "60px" }} value={qtd} min="1" onChange={(e) => handleQuantidadeChange(ing.id, Number(e.target.value))} disabled={loading} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Imagem da Receita (opcional)</label>
        <input type="file" accept="image/*" className="form-control" onChange={handleImagemChange} disabled={loading} />
      </div>

      {imagemPreview && (
        <div className="mb-3 text-center">
          <img src={imagemPreview} alt="Pré-visualização" style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "50%", marginBottom: "10px", border: "2px solid #ccc" }} />
        </div>
      )}

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/receitas")} disabled={loading}>Cancelar</button>
        <button type="submit" className={`btn ${loading ? "btn-secondary" : "btn-success"}`} disabled={loading}>{loading ? "Criando..." : "Criar Receita"}</button>
      </div>
    </form>
  );
};

export default ReceitaFormCreate;
