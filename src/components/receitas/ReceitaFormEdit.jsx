import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";

const ReceitaFormEdit = () => {
  const { id } = useParams();
  const authFetch = useAuthFetch();
  const navigate = useNavigate();
  const { setToast } = useToast();

  const API_URL = import.meta.env.VITE_API_URL; 

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null);
  const [ingredientes, setIngredientes] = useState([]);
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar ingredientes
        const ingRes = await authFetch(`${API_URL}/api/ingredientes`);
        if (!ingRes.ok) throw new Error("Erro ao buscar ingredientes");
        const ingData = await ingRes.json();
        setIngredientes(ingData);

        // Buscar receita
        const recRes = await authFetch(`${API_URL}/api/receitas/${id}`);
        if (!recRes.ok) throw new Error("Erro ao buscar receita");
        const recData = await recRes.json();

        setNome(recData.nome);
        setDescricao(recData.descricao || "");
        setPreco(recData.preco);
        if (recData.imagem_url) setImagemPreview(recData.imagem_url);

        const selected = {};
        (recData.ingredientes || []).forEach((ing) => {
          selected[ing.ingrediente_id] = ing.quantidade;
        });
        setIngredientesSelecionados(selected);
      } catch (err) {
        setToast({ message: err.message, type: "error", duration: 3000 });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, authFetch, setToast, API_URL]);

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
      if (newState[id] !== undefined) delete newState[id];
      else newState[id] = 1;
      return newState;
    });
  };

  const handleQuantidadeChange = (id, quantidade) => {
    setIngredientesSelecionados((prev) => {
      if (quantidade <= 0) return prev;
      return { ...prev, [id]: quantidade };
    });
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

    setSaving(true);
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

      const res = await authFetch(`${API_URL}/api/receitas/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.erro || "Erro ao atualizar receita.");
      }

      const receitaAtualizada = await res.json();
      setToast({ message: `Receita "${receitaAtualizada.nome}" atualizada com sucesso!`, type: "success", duration: 3000 });
      setTimeout(() => navigate("/receitas"), 1500);
    } catch (err) {
      setToast({ message: err.message, type: "error", duration: 3000 });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Carregando receita...</p>;

  return (
    <form className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nome da Receita *</label>
        <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required disabled={saving} />
      </div>

      <div className="mb-3">
        <label className="form-label">Descrição</label>
        <textarea className="form-control" rows="3" value={descricao} onChange={(e) => setDescricao(e.target.value)} disabled={saving}></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Preço (R$) *</label>
        <input type="number" className="form-control" value={preco} onChange={(e) => setPreco(e.target.value)} min="0" step="0.01" required disabled={saving} />
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
                  <input type="checkbox" className="form-check-input me-2" checked={qtd !== null} onChange={() => handleCheckboxChange(ing.id)} disabled={saving} />
                  <label className="form-check-label me-2">{ing.nome} ({ing.preco} R$ / {ing.metrica})</label>
                  {qtd !== null && (
                    <input type="number" className="form-control form-control-sm" style={{ width: "60px" }} value={qtd} min="1" onChange={(e) => handleQuantidadeChange(ing.id, Number(e.target.value))} disabled={saving} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Imagem da Receita (opcional)</label>
        <input type="file" accept="image/*" className="form-control" onChange={handleImagemChange} disabled={saving} />
      </div>

      {imagemPreview && (
        <div className="mb-3 text-center">
          <img src={imagemPreview} alt="Pré-visualização" style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "50%", marginBottom: "10px", border: "2px solid #ccc" }} />
        </div>
      )}

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/receitas")} disabled={saving}>Cancelar</button>
        <button type="submit" className={`btn ${saving ? "btn-secondary" : "btn-primary"}`} disabled={saving}>{saving ? "Atualizando..." : "Atualizar Receita"}</button>
      </div>
    </form>
  );
};

export default ReceitaFormEdit;
