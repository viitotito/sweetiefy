import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";

import UsuariosLogin from './pages/usuarios/UsuariosLogin.jsx';
import UsuariosRegister from './pages/usuarios/UsuariosRegister.jsx';

import IngredientesIndex from './pages/ingredientes/IngredientesIndex.jsx';
import IngredientesCreate from './pages/ingredientes/IngredientesCreate.jsx';
import IngredientesEdit from './pages/ingredientes/IngredientesEdit.jsx';
import IngredientesShow from './pages/ingredientes/IngredientesShow.jsx';

import ReceitasIndex from './pages/receitas/ReceitasIndex.jsx';
import ReceitasCreate from './pages/receitas/ReceitasCreate.jsx';
import ReceitasEdit from './pages/receitas/ReceitasEdit.jsx';
import ReceitasShow from './pages/receitas/ReceitasShow.jsx';

import Home from './pages/home/home.jsx';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap-icons/font/bootstrap-icons.css";
import PrivateRoute from './auth/PrivateRoute.jsx';

const router = createBrowserRouter([
    { path: "/usuarios/login", element: <UsuariosLogin /> },
    { path: "/usuarios/register", element: <UsuariosRegister /> },

    { path: "/", element: (<PrivateRoute><Home /></PrivateRoute>) },
    { path: "/home", element: (<PrivateRoute><Home /></PrivateRoute>) },

    { path: "/ingredientes", element: (<PrivateRoute><IngredientesIndex /></PrivateRoute>) },
    { path: "/ingredientes/create", element: (<PrivateRoute><IngredientesCreate /></PrivateRoute>) },
    { path: "/ingredientes/:id", element: (<PrivateRoute><IngredientesShow /></PrivateRoute>) },
    { path: "/ingredientes/:id/edit", element: (<PrivateRoute><IngredientesEdit /></PrivateRoute>) },

    { path: "/receitas", element: (<PrivateRoute><ReceitasIndex /></PrivateRoute>) },
    { path: "/receitas/create", element: (<PrivateRoute><ReceitasCreate /></PrivateRoute>) },
    { path: "/receitas/:id", element: (<PrivateRoute><ReceitasShow /></PrivateRoute>) },
    { path: "/receitas/:id/edit", element: (<PrivateRoute><ReceitasEdit /></PrivateRoute>) }
]);

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
)