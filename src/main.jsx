import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import { ToastProvider } from './auth/ToastContext.jsx';

import UsuariosLogin from './pages/usuarios/UsuariosLogin.jsx';
import UsuariosRegister from './pages/usuarios/UsuariosRegister.jsx';
import UsuariosIndex from './pages/usuarios/UsuariosIndex.jsx';
import UsuariosEdit from './pages/usuarios/UsuariosEdit.jsx';

import IngredientesCreate from './pages/ingredientes/IngredientesCreate.jsx';
import IngredientesEdit from './pages/ingredientes/IngredientesEdit.jsx';
import IngredientesShow from './pages/ingredientes/IngredientesShow.jsx';
import IngredientesIndex from './pages/ingredientes/IngredientesIndex.jsx';

import ReceitasIndex from './pages/receitas/ReceitasIndex.jsx';
import ReceitasCreate from './pages/receitas/ReceitasCreate.jsx';
import ReceitasEdit from './pages/receitas/ReceitasEdit.jsx';
import ReceitasShow from './pages/receitas/ReceitasShow.jsx';

import Home from './pages/home/home.jsx';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import PrivateRoute from './auth/PrivateRoute.jsx';
import PrivateLayout from './layouts/PrivateLayout.jsx';

const router = createBrowserRouter([
    { path: "/usuarios/login", element: <UsuariosLogin /> },
    { path: "/usuarios/register", element: <UsuariosRegister /> },

    {
        path: "/usuarios", element: (
            <PrivateRoute>
                <PrivateLayout><UsuariosIndex /></PrivateLayout>
            </PrivateRoute>
        )
    },
    {
        path: "/usuarios/:id/edit", element: (
            <PrivateRoute>
                <PrivateLayout><UsuariosEdit /></PrivateLayout>
            </PrivateRoute>
        )
    },
    {
        path: "/", element: (
            <PrivateRoute>
                <PrivateLayout><Home /></PrivateLayout>
            </PrivateRoute>
        )
    },
    {
        path: "/home", element: (
            <PrivateRoute>
                <PrivateLayout><Home /></PrivateLayout>
            </PrivateRoute>
        )
    },

    {
        path: "/ingredientes", element: (
            <PrivateRoute>
                <PrivateLayout><IngredientesIndex /></PrivateLayout>
            </PrivateRoute>
        )
    },
    {
        path: "/ingredientes/create", element: (
            <PrivateRoute>
                <PrivateLayout><IngredientesCreate /></PrivateLayout>
            </PrivateRoute>
        )
    },
    {
        path: "/ingredientes/:id", element: (
            <PrivateRoute>
                <PrivateLayout><IngredientesShow /></PrivateLayout>
            </PrivateRoute>
        )
    },
    {
        path: "/ingredientes/:id/edit", element: (
            <PrivateRoute>
                <PrivateLayout><IngredientesEdit /></PrivateLayout>
            </PrivateRoute>
        )
    },

    {
        path: "/receitas", element: (
            <PrivateRoute>
                <PrivateLayout><ReceitasIndex /></PrivateLayout>
            </PrivateRoute>
        )
    },
    {
        path: "/receitas/create", element: (
            <PrivateRoute>
                <PrivateLayout><ReceitasCreate /></PrivateLayout>
            </PrivateRoute>
        )
    },
    {
        path: "/receitas/:id", element: (
            <PrivateRoute>
                <PrivateLayout><ReceitasShow /></PrivateLayout>
            </PrivateRoute>
        )
    },
    {
        path: "/receitas/:id/edit", element: (
            <PrivateRoute>
                <PrivateLayout><ReceitasEdit /></PrivateLayout>
            </PrivateRoute>
        )
    }
]);

createRoot(document.getElementById('root')).render(
    <ToastProvider>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </ToastProvider>
);
