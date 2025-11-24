import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";

const IngredienteShow = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const authFetch = useAuthFetch();
    const { setToast } = useToast();

    const [ingrediente, setIngrediente] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIngrediente = async () => {
            try {
                const res = await authFetch(`http://localhost:3000/api/ingredientes/${id}`);

                if (!res.ok) throw new Error("Erro ao buscar ingrediente.");

                const data = await res.json();
                setIngrediente(data);
            } catch (err) {
                setToast({ message: err.message, type: "error", duration: 3000 });
            } finally {
                setLoading(false);
            }
        };

        fetchIngrediente();
    }, [id, authFetch, setToast]);

    if (loading) return <p className="text-center mt-4">Carregando ingrediente...</p>;
    if (!ingrediente) return <p className="text-center mt-4">Ingrediente não encontrado.</p>;

    const createdAt = ingrediente.data_criacao
        ? new Date(ingrediente.data_criacao).toLocaleString()
        : "Não disponível";

    const updatedAt = ingrediente.data_atualizacao
        ? new Date(ingrediente.data_atualizacao).toLocaleString()
        : "Nunca atualizado";

    return (
        <div
            className="card p-4 shadow-sm mx-auto"
            style={{ maxWidth: "600px" }}
        >
            <h4 className="text-center mb-3">Detalhes do Ingrediente</h4>

            <div className="mb-3">
                <label className="form-label fw-bold">Nome</label>
                <input
                    type="text"
                    className="form-control"
                    value={ingrediente.nome}
                    disabled
                />
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Preço (R$)</label>
                <input
                    type="text"
                    className="form-control"
                    value={Number(ingrediente.preco || 0).toFixed(2)}
                    disabled
                />
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Métrica</label>
                <input
                    type="text"
                    className="form-control"
                    value={ingrediente.metrica}
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
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/ingredientes")}
                >
                    Voltar
                </button>
            </div>
        </div>
    );
};

export default IngredienteShow;
