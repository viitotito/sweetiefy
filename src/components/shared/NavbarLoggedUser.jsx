import { useAuthFetch } from "../../auth/useAuthFetch";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const NavbarLoggedUser = () => {
    const navigate = useNavigate();
    const authFetch = useAuthFetch();
    const { user, authLoading, setUser } = useAuth(); 

    const handleLogoutClick = async (e) => {
        e.preventDefault();
        try {
            await authFetch("http://localhost:3000/api/usuarios/logout", {
                method: 'POST',
                credentials: "include"
            });
            sessionStorage.removeItem("at");
            setUser(null);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    if (authLoading) {
        return null;
    }

    if (!user) {
        return (
            <ul className="nav-item dropdown m-0 p-0">
                <button
                    className="nav-link dropdown-toggle bg-transparent border-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Usuário Desconectado
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <Link className="dropdown-item text-center" type="button" to="/usuarios/login">
                            Entrar
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item text-center" type="button" to="/usuarios/register">
                            Registrar
                        </Link>
                    </li>
                </ul>
            </ul>
        );
    }

    return (
        <ul className="nav-item dropdown m-0 p-0">
            <button
                className="nav-link dropdown-toggle bg-transparent border-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {user.nome}
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
                <li>
                    <button className="dropdown-item text-center" type="button" onClick={handleLogoutClick}>
                        Sair
                    </button>
                </li>
            </ul>
        </ul>
    );
};

export default NavbarLoggedUser;