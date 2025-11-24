import { useEffect, useState } from "react";
import { useAuthFetch } from "../../auth/useAuthFetch";
import { useToast } from "../../auth/ToastContext";
import { Link } from "react-router-dom";

const ReceitaImagem = ({ url, nome }) => {
  const [imagemValida, setImagemValida] = useState(true);

  return (
    <div
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        margin: "0 auto 10px",
        overflow: "hidden",
        backgroundColor: "#e0e0e0",
      }}
    >
      {url && imagemValida && (
        <img
          src={url}
          alt={nome}
          onError={() => setImagemValida(false)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
    </div>
  );
};

const ReceitasList = () => {
  const authFetch = useAuthFetch();
  const { setToast } = useToast();

  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await authFetch("http://localhost:3000/api/receitas");

        if (!res.ok) {
          const msg = (await res.json().catch(() => null))?.erro;
          throw new Error(msg || "Erro ao carregar receitas.");
        }

        const dados = await res.json();
        setReceitas(dados);
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

    carregar();
  }, [authFetch, setToast]);

  if (loading) {
    return <p className="text-center mt-4">Carregando receitas...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Receitas</h2>
        <Link to="/receitas/create" className="btn btn-success">
          Nova Receita
        </Link>
      </div>

      {receitas.length === 0 && <p>Nenhuma receita cadastrada.</p>}

      <div className="row">
        {receitas.map((r) => (
          <div className="col-md-4 mb-4" key={r.id}>
            <div
              className="card text-center p-3"
              style={{
                height: "300px", // altura fixa para padronizar todos os cards
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Imagem circular apenas se válida */}
              <ReceitaImagem url={r.imagem_url} nome={r.nome} />

              <div className="card-body p-2 flex-grow-1 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{r.nome}</h5>
                  <p className="card-text">{r.descricao || "Sem descrição."}</p>
                </div>

                <div>
                  <p className="fw-bold">Preço: R$ {r.preco}</p>
                  <Link
                    to={`/receitas/${r.id}/edit`}
                    className="btn btn-primary w-100"
                  >
                    Editar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceitasList;
