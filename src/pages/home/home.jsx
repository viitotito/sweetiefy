import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = Number(user?.perfil) === 1;

  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh", padding: "2rem" }}
    >
      <div className="card p-4 shadow-sm mb-3" style={{ maxWidth: "600px", width: "100%" }}>
        <h5 className="mb-3 text-center">Bem-vindo ao Sweetiefy 🎂</h5>
        <p className="text-center">
          Aqui você pode acessar ingredientes, receitas, configurações e muito mais.
        </p>
        <div className="mt-3 d-flex flex-column flex-sm-row justify-content-center">
          <button
            className="btn btn-primary mb-2 mb-sm-0 me-sm-2"
            onClick={() => navigate("/ingredientes")}
          >
            Meus Ingredientes
          </button>
          <button
            className="btn btn-primary mb-2 mb-sm-0 me-sm-2"
            onClick={() => navigate("/receitas")}
          >
            Minhas Receitas
          </button>
          {isAdmin && (
            <button
              className="btn btn-secondary mb-2 mb-sm-0 me-sm-2"
              onClick={() => navigate("/configuracoes")}
            >
              Configurações
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
