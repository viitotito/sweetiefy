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

    if (res.status === 401) {
      sessionStorage.removeItem("at"); 
      setUser(null); 
      navigate("/usuarios/login", { replace: true }); 
      return res; 
    }

    return res;
  }, [navigate, setUser]);

  return authFetch;
};

export { useAuthFetch };
