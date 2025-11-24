import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const PrivateRoute = ({ children }) => {
  const { user, authLoading, setUser } = useAuth();

  useEffect(() => {
    const token = sessionStorage.getItem("at");
    if (!token) setUser(null); 
  }, [setUser]);

  if (authLoading) return <p>Carregando...</p>;
  if (!user) return <Navigate to="/usuarios/login" replace />;

  return children;
};

export default PrivateRoute;
