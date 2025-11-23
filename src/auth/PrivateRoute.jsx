import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const PrivateRoute = ({ children }) => {
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

    if (!user) {
        return <Navigate to="/usuarios/login" replace />;
    }

    return children;
};

export default PrivateRoute;
