import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useToast } from "../auth/ToastContext";

export const useAuthFetch = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { setToast } = useToast();

  return useCallback(
    async (url, options = {}) => {
      const token = sessionStorage.getItem("at");

      const headers = {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      const res = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
      });

      if (res.status === 401) {
        sessionStorage.removeItem("at");
        setUser(null);

        setToast({
          message: "Sessão expirada. Faça login novamente.",
          type: "error"
        });

        navigate("/usuarios/login", { replace: true });
      }

      return res;
    },
    [navigate, setUser, setToast]
  );
};
