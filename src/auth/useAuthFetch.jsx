import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const useAuthFetch = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const authFetch = useCallback(async (url, fetchOptions = {}) => {
    const { signal, headers: originalHeaders, ...restOptions } = fetchOptions;
    const headers = new Headers(originalHeaders || {});
    const accessToken = sessionStorage.getItem("at");
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

    const baseOptions = { ...restOptions, signal, credentials: "include" };

    let res = await fetch(url, { ...baseOptions, headers });

    // ✅ Aqui é onde você coloca o bloco
    if (res.status === 401) {
      // token inválido ou expirado
      sessionStorage.removeItem("at"); // remove token
      setUser(null); // limpa usuário no contexto
      navigate("/usuarios/login", { replace: true }); // redireciona forçosamente
      return res; // retorna a resposta para não quebrar a execução
    }

    return res;
  }, [navigate, setUser]);

  return authFetch;
};

export { useAuthFetch };
