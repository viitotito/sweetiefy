import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";

import UsuariosLogin from './pages/usuarios/UsuariosLogin.jsx';
import UsuariosRegister from './pages/usuarios/UsuariosRegister.jsx';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap-icons/font/bootstrap-icons.css";

const router = createBrowserRouter([
    { path: "/", element: <UsuariosLogin /> },

    { path: "/usuarios/login", element: <UsuariosLogin /> },
    { path: "/usuarios/register", element: <UsuariosRegister /> },
]);

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
)