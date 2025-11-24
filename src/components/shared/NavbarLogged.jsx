import { NavLink, Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import { useAuth } from "../../auth/useAuth";

export default function NavbarLogged() {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    sessionStorage.removeItem("at");
    setUser(null);
    window.location.href = "/usuarios/login";
  };

  const isAdmin = Number(user?.perfil) === 1;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Sweetiefy
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item dropdown">
              <NavLink
                to="#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Ingredientes
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to="/ingredientes"
                    end
                    className={({ isActive }) =>
                      "dropdown-item" + (isActive ? " active" : "")
                    }
                  >
                    Lista de Ingredientes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/ingredientes/create"
                    end
                    className={({ isActive }) =>
                      "dropdown-item" + (isActive ? " active" : "")
                    }
                  >
                    Criar Ingrediente
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <NavLink
                to="#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Receitas
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to="/receitas"
                    end
                    className={({ isActive }) =>
                      "dropdown-item" + (isActive ? " active" : "")
                    }
                  >
                    Lista de Receitas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/receitas/create"
                    end
                    className={({ isActive }) =>
                      "dropdown-item" + (isActive ? " active" : "")
                    }
                  >
                    Criar Receita
                  </NavLink>
                </li>
              </ul>
            </li>

            {isAdmin && (
              <li className="nav-item">
                <NavLink
                  to="/configuracoes"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Configurações
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center">
            <ThemeButton />

            <div className="dropdown ms-3">
              <button
                className="nav-link dropdown-toggle bg-transparent border-0"
                data-bs-toggle="dropdown"
              >
                {user?.nome ?? "Usuário"}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item text-center"
                    onClick={handleLogout}
                  >
                    Desconectar
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
