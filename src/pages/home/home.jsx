import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = Number(user?.perfil) === 1;

  return (
    <>
      <div className="container py-4 py-md-5">

        <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
          <h5 className="mb-3 text-center text-md-start">Bem-vindo ao Sweetiefy 🎂</h5>
          <p className="text-center text-md-start">
            Aqui você pode acessar ingredientes, receitas, configurações e muito mais.
          </p>
          <div className="mt-3 d-flex flex-column flex-sm-row justify-content-center justify-content-md-start">
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
    </>
  );
};

export default Home;
