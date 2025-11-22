import { Link, NavLink } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import NavbarLoggedUser from "./NavbarLoggedUser";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Sweetiefy
                </Link>

                <div className="d-flex align-items-center ms-auto order-lg-3">
                    <ThemeButton />
                    <NavbarLoggedUser />

                    <button
                        className="navbar-toggler ms-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div
                    className="collapse navbar-collapse order-lg-2"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Ingredientes
                            </Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/ingredientes">
                                        Lista de Ingredientes
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/ingredientes/create">
                                        Criar Ingrediente
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/ingrediente" className="nav-link">
                                Ingrediente
                            </NavLink>
                        </li>

                        
                        <li className="nav-item">
                            <NavLink to="/receita" className="nav-link">
                                Receita
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}