import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";

import App from './pages/App.jsx'
import Sobre from './pages/Sobre.jsx'

import IngredientesIndex from './pages/ingredientes/IngredientesIndex.jsx';
import IngredientesCreate from './pages/ingredientes/IngredientesCreate.jsx';
import IngredientesShow from './pages/ingredientes/IngredientesShow.jsx';
import IngredientesEdit from './pages/ingredientes/IngredientesEdit.jsx';

import ReceitasIndex from './pages/receitas/ReceitasIndex.jsx';
import ReceitasCreate from './pages/receitas/ReceitasCreate.jsx';
import ReceitasShow from './pages/receitas/ReceitasShow.jsx';
import ReceitasEdit from './pages/receitas/ReceitasEdit.jsx';

import UsuariosLogin from './pages/usuarios/UsuariosLogin.jsx';
import UsuariosRegister from './pages/usuarios/UsuariosRegister.jsx';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

const router = createBrowserRouter([
  { path: "/", element: <App /> },

  { path: "/ingredientes", element: <IngredientesIndex /> },
  { path: "/ingredientes/create", element: <IngredientesCreate /> },
  { path: "/ingredientes/:id", element: <IngredientesShow /> },
  { path: "/ingredientes/:id/edit", element: <IngredientesEdit /> },

  { path: "/receitas", element: <ReceitasIndex /> },
  { path: "/receitas/create", element: <ReceitasCreate /> },
  { path: "/receitas/:id", element: <ReceitasShow /> },
  { path: "/receitas/:id/edit", element: <ReceitasEdit /> },

  { path: "/usuarios/login", element: <UsuariosLogin /> },
  { path: "/usuarios/register", element: <UsuariosRegister /> },
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)