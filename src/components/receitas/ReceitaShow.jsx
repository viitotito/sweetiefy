import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";

const ReceitaShow = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const authFetch = useAuthFetch();
    const { setToast } = useToast();

    const [receita, setReceita] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReceita = async () => {
            try {
                const res = await authFetch(`http://localhost:3000/api/receitas/${id}`);
                if (!res.ok) throw new Error("Erro ao buscar receita.");
                const data = await res.json();

                if (data.ingredientes && data.ingredientes.length > 0) {
                    let custoTotal = 0;
                    const ingredientesComCusto = data.ingredientes.map(ing => {
                        const custo = Number(ing.preco) * Number(ing.quantidade);
                        custoTotal += custo;
                        return { ...ing, custo_total: custo };
                    });
                    data.ingredientes = ingredientesComCusto;
                    data.custo_total = custoTotal;
                } else {
                    data.custo_total = 0;
                }

                setReceita(data);
            } catch (err) {
                setToast({ message: err.message, type: "error", duration: 3000 });
            } finally {
                setLoading(false);
            }
        };

        fetchReceita();
    }, [id, authFetch, setToast]);

    if (loading) return <p className="text-center mt-4">Carregando receita...</p>;
    if (!receita) return <p className="text-center mt-4">Receita não encontrada.</p>;

    const createdAt = receita.data_criacao
        ? new Date(receita.data_criacao).toLocaleString()
        : "Não disponível";

    const updatedAt = receita.data_atualizacao
        ? new Date(receita.data_atualizacao).toLocaleString()
        : "Nunca atualizado";

    return (
        <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
            <div className="mb-3">
                <label className="form-label fw-bold">Nome</label>
                <input type="text" className="form-control" value={receita.nome} disabled />
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Descrição</label>
                <textarea className="form-control" value={receita.descricao || ""} disabled />
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Preço de Venda (R$)</label>
                <input type="text" className="form-control" value={Number(receita.preco).toFixed(2)} disabled />
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Ingredientes</label>
                {receita.ingredientes.length === 0 ? (
                    <p className="text-muted">Nenhum ingrediente cadastrado.</p>
                ) : (
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Qtd</th>
                                <th>Preço Unitário</th>
                                <th>Custo Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receita.ingredientes.map((ing) => (
                                <tr key={ing.ingrediente_id}>
                                    <td>{ing.nome}</td>
                                    <td>{ing.quantidade}</td>
                                    <td>{Number(ing.preco).toFixed(2)}</td>
                                    <td>{Number(ing.custo_total).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Custo Total da Receita</label>
                <input type="text" className="form-control" value={Number(receita.custo_total).toFixed(2)} disabled />
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
                <button className="btn btn-outline-secondary" onClick={() => navigate("/receitas")}>
                    Voltar
                </button>
            </div>
        </div>
    );
};

export default ReceitaShow;
