import { Link } from "react-router-dom";
import ReceitaImagem from "./ReceitaImagem";

const ReceitaCard = ({ receita }) => {
  return (
    <div
      className="card text-center p-3"
      style={{
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ReceitaImagem url={receita.imagem_url} nome={receita.nome} />

      <div className="card-body p-2 flex-grow-1 d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{receita.nome}</h5>
          <p className="card-text">{receita.descricao || "Sem descrição."}</p>
        </div>

        <div>
          <p className="fw-bold">Preço: R$ {receita.preco}</p>
          <Link
            to={`/receitas/${receita.id}/edit`}
            className="btn btn-primary w-100"
          >
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReceitaCard;
