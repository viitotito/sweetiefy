import UsuarioFormRegister from "../../components/usuarios/UsuarioFormRegister";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const UsuariosRegister = () => {
    const { user, authLoading } = useAuth();

    if (authLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
            </div>
        );
    }

    if (user) return <Navigate to="/" replace />;

    return (
        <div className="min-vh-100 w-100 overflow-hidden">
            <div className="row g-0" style={{ height: "100vh" }}>

                <div className="col-12 col-md-6 p-0 d-none d-md-block">
                    <img
                        src="/img/sweetiefy-home.png"
                        alt="Sweetiefy home"
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                    />
                </div>

                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-5">
                    <h1 className="fw-bold mb-4 text-center">Sweetiefy</h1>

                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <UsuarioFormRegister />
                    </div>

                    <div className="mt-3 text-center">
                        <span>Já tem uma conta? </span>
                        <Link to="/usuarios/login">Entrar</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UsuariosRegister;
