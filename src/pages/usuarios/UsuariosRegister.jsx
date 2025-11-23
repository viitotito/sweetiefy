// src/pages/usuarios/UsuariosRegister.jsx
import { Link } from 'react-router-dom'
import Navbar from "../../components/shared/Navbar"
import UsuariosFormRegister from '../../components/usuarios/UsuarioFormRegister'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

const UsuariosRegister = () => {
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
            <h1 className='mx-2'>UsuariosRegister.jsx</h1>
            <Link to="/" className="btn btn-primary mx-2">Voltar</Link>
            <UsuariosFormRegister />
        </div>
    )
}

export default UsuariosRegister