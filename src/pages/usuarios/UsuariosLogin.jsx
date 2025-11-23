import { Link } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import UsuariosFormLogin from "../../components/usuarios/UsuarioFormLogin";
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../auth/useAuth";

const UsuariosLogin = () => {
    const { user, authLoading } = useAuth();

    if (authLoading) {
        return <p>Carregando usuário...</p>; 
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <Navbar />
            <h1 className="mx-2">UsuariosLogin.jsx</h1>
            <Link to="/" className="btn btn-primary mx-2">Voltar</Link>
            <UsuariosFormLogin />
        </div>
    );
};

export default UsuariosLogin;