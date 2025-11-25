import { NavLink, Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import { useAuth } from "../../auth/useAuth";

export default function NavbarLogged() {
  const { setUser } = useAuth();

  const handleLogout = () => {
    sessionStorage.removeItem("at");
    setUser(null);
    window.location.href = "/usuarios/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
        {/* Marca */}
        <Link className="navbar-brand" to="/home">
          Sweetiefy
        </Link>

        {/* Botão colapsar para mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu colapsável */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Links principais */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Ingredientes */}
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

            {/* Receitas */}
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
          </ul>

          {/* Botões à direita: logout + tema */}
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-secondary d-flex align-items-center gap-1"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i> Sair
            </button>

            <ThemeButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
