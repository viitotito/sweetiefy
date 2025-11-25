import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../auth/useAuth";
import { useToast } from "../../auth/ToastContext"; 
import ThemeButton from "../shared/ThemeButton";

const UsuarioFormLogin = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setUser } = useAuth();
    const { setToast } = useToast(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, senha }),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data?.erro || "Falha no login");

            const at = data?.access_token;
            if (!at) throw new Error("Resposta sem access_token");

            sessionStorage.setItem("at", at);

            try {
                const decoded = jwtDecode(at);
                setUser(decoded);
            } catch {
                setUser(null);
            }

            setSenha("");
            navigate("/");
        } catch (error) {
            setToast({
                message: error.message || "Erro inesperado",
                type: "error",
                duration: 3000 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
                <ThemeButton />
            </div>

            <form onSubmit={handleSubmit} className="w-100">
                <div className="mb-3">
                    <label htmlFor="id-input-email" className="form-label fw-semibold">
                        E-mail
                    </label>
                    <input
                        id="id-input-email"
                        type="email"
                        className="form-control w-100"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Digite seu e-mail"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="id-input-senha" className="form-label fw-semibold">
                        Senha
                    </label>
                    <input
                        id="id-input-senha"
                        type="password"
                        className="form-control w-100"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        placeholder="Digite sua senha"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 mt-2"
                    disabled={loading}
                >
                    {loading ? "Entrando…" : "Entrar"}
                </button>

                <div className="mt-3">
                    <span>Ainda não tem uma conta? </span>
                    <Link to="/usuarios/register">Registre-se</Link>
                </div>
            </form>
        </div>
    );
};

export default UsuarioFormLogin;
