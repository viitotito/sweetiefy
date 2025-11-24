import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  authLoading: true,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Função para validar token
  const validateToken = () => {
    const token = sessionStorage.getItem("at");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        setUser(null); // token expirado
      } else {
        setUser(decoded); // token válido
      }
    } catch (err) {
      console.error("Token inválido:", err);
      setUser(null);
    }
  };

  useEffect(() => {
    validateToken();
    setAuthLoading(false);

    // Evento para detectar token apagado em outra aba
    const handleStorage = () => validateToken();
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };