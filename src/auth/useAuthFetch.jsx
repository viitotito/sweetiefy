import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useAuthFetch = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL; 

    const authFetch = useCallback(
        /**
         * authFetch(url, fetchOptions)
         * @param {string} url                
         * @param {RequestInit} fetchOptions  
         * @returns {Promise<Response>}       
         */
        async (url, fetchOptions = {}) => {
            const { signal, headers: originalHeaders, ...restOptions } = fetchOptions;

            const headers = new Headers(originalHeaders || {});
            const accessToken = sessionStorage.getItem("at");
            if (accessToken) {
                headers.set("Authorization", `Bearer ${accessToken}`);
            }

            const baseOptions = {
                ...restOptions,
                signal,
                credentials: "include",
            };

            const fullUrl = url.startsWith("http") ? url : `${API_URL}${url}`;

            let res = await fetch(fullUrl, { ...baseOptions, headers });

            if (res.status !== 401) {
                return res;
            }

            const refreshRes = await fetch(`${API_URL}/api/usuarios/refresh`, {
                method: "POST",
                credentials: "include", 
                signal,
            });

            if (!refreshRes.ok) {
                sessionStorage.removeItem("at");
                navigate("/usuarios/login", { replace: true });
                return res;
            }

            const data = await refreshRes.json().catch(() => ({}));
            const newAccessToken = data?.access_token;

            if (!newAccessToken) {
                sessionStorage.removeItem("at");
                navigate("/usuarios/login", { replace: true });
                return res;
            }

            sessionStorage.setItem("at", newAccessToken);
            headers.set("Authorization", `Bearer ${newAccessToken}`);

            res = await fetch(fullUrl, { ...baseOptions, headers });

            return res;
        },
        [navigate, API_URL]
    );

    return authFetch;
};

export { useAuthFetch };
