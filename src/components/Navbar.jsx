// src/components/Navbar.jsx
// Barra de navegacion principal, responsiva Bootstrap navbar + colapso
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { useSesion } from '../context/SesionContext'

const ENLACES = [
  { to: '/', texto: 'Home', end: true },
  { to: '/productos', texto: 'Productos' },
  { to: '/nosotros', texto: 'Nosotros' },
  { to: '/blogs', texto: 'Blogs' },
  { to: '/contacto', texto: 'Contacto' },
  { to: '/carrito', texto: 'Carrito' },
]

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const { totalUnidades } = useCarrito()
  const { sesion, autenticado, cerrarSesion } = useSesion()
  const navigate = useNavigate()
  const esAdmin = autenticado && sesion?.tipoUsuario === 'Administrador'

  const cerrarMenu = () => setAbierto(false)

  const manejarCerrarSesion = () => {
    if (window.confirm('¿Deseas cerrar tu sesion?')) {
      cerrarSesion()
      cerrarMenu()
      navigate('/')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-nivelup sticky-top" aria-label="Navegacion principal">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={cerrarMenu}>
          <img src="/img/general/logo.png" alt="Logo Level-Up Gamer" height="40" />
          <span className="marca-texto">LEVEL-UP GAMER</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="menu-principal"
          aria-expanded={abierto}
          aria-label="Abrir menu de navegacion"
          onClick={() => setAbierto((valor) => !valor)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${abierto ? 'show' : ''}`} id="menu-principal">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {ENLACES.map((enlace) => (
              <li className="nav-item" key={enlace.to}>
                <NavLink
                  to={enlace.to}
                  end={enlace.end}
                  className={({ isActive }) => `nav-link ${isActive ? 'activo' : ''}`}
                  onClick={cerrarMenu}
                >
                  {enlace.texto}
                </NavLink>
              </li>
            ))}
            <li className="nav-item">
              {esAdmin && (
                <NavLink to="/admin" className="nav-link" onClick={cerrarMenu}>
                  Admin
                </NavLink>
              )}
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link to="/carrito" className="btn btn-marca-outline btn-sm" onClick={cerrarMenu}>
              🛒 Carrito
              <span className="badge text-bg-info ms-2" data-testid="badge-carrito">
                {totalUnidades}
              </span>
            </Link>

            {autenticado ? (
              <div className="d-flex align-items-center gap-2">
                <Link to="/perfil" className="nav-link" onClick={cerrarMenu}>
                  Conectado: {sesion.nombre}
                </Link>
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={manejarCerrarSesion}>
                  Cerrar sesion
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-marca-outline btn-sm" onClick={cerrarMenu}>
                  Iniciar sesion
                </Link>
                <Link to="/registro" className="btn btn-marca btn-sm" onClick={cerrarMenu}>
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
