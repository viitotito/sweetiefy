import { Link } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import { useAuth } from "../auth/useAuth";

const App = () => {
    const { user, authLoading } = useAuth();

    if (authLoading) {
        return <p>Carregando usuário...</p>;
    }

    return (
        <div>
            <Navbar />
            <h1 className="mx-2">App.jsx</h1>
            <div className="d-flex flex-wrap gap-2 mx-2">
                {!user && <Link to="/usuarios/login" className="btn btn-primary d-inline">Entrar com Usuários</Link>}
                {!user && <Link to="/usuarios/register" className="btn btn-primary d-inline">Registrar Usuários</Link>}
                {user && <Link to="/ingredientes" className="btn btn-primary d-inline">Ingredientes</Link>}
                {user && <Link to="/ingredientes/create" className="btn btn-primary d-inline">Criar Ingrediente</Link>}
            </div>
        </div>
    )
}
export default App