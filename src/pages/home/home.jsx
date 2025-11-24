import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = Number(user?.perfil) === 1;

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", 
        margin: 0,
        padding: 0,
      }}
    >
      <div
        className="card p-4 shadow-sm text-center"
        style={{
          maxWidth: "600px",
          width: "100%",
          boxSizing: "border-box", // importante para que padding não aumente tamanho
        }}
      >
        <h5 className="mb-3">Bem-vindo ao Sweetiefy 🎂</h5>
        <p>Aqui você pode acessar ingredientes, receitas, configurações e muito mais.</p>
        <div className="mt-3 d-flex flex-column flex-sm-row justify-content-center gap-2">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/ingredientes")}
          >
            Meus Ingredientes
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/receitas")}
          >
            Minhas Receitas
          </button>
          {isAdmin && (
            <button
              className="btn btn-secondary"
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
