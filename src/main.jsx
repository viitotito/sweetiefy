import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    
    { path: "/chamados", element: <ChamadosIndex /> },
    { path: "/chamados/create", element: <ChamadosCreate /> },
    { path: "/chamados/:id", element: <ChamadosShow /> },
    { path: "/chamados/:id/edit", element: <ChamadosEdit /> },

    { path: "/usuarios/login", element: <UsuariosLogin /> },
    { path: "/usuarios/register", element: <UsuariosRegister /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
