// src/components/AdminLayout.jsx
// Estructura del panel de administracion (barra lateral + area de contenido).
import { NavLink } from 'react-router-dom'

const ENLACES = [
  { to: '/admin', texto: 'Dashboard', end: true },
  { to: '/admin/productos', texto: 'Productos' },
  { to: '/admin/usuarios', texto: 'Usuarios' },
]

/**
 * @param {object} props
 * @param {string} props.titulo
 * @param {React.ReactNode} props.children
 */
export default function AdminLayout({ titulo, children }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__marca">
          <img src="/img/general/logo.png" alt="Logo Level-Up Gamer" />
          <span>Admin Panel</span>
        </div>

        <nav aria-label="Navegacion del administrador">
          <ul className="admin-menu list-unstyled">
            {ENLACES.map((enlace) => (
              <li key={enlace.to}>
                <NavLink
                  to={enlace.to}
                  end={enlace.end}
                  className={({ isActive }) => `admin-menu__enlace ${isActive ? 'activo' : ''}`}
                >
                  {enlace.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="admin-sidebar__pie">
          <NavLink to="/">← Volver a la tienda</NavLink>
        </div>
      </aside>

      <div className="admin-contenido">
        <header className="admin-topbar">
          <h1 className="h4 mb-0">{titulo}</h1>
        </header>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  )
}
