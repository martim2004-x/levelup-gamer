// src/components/RutaAdmin.jsx
// Guardia de acceso al panel de administracion.
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useSesion } from '../context/SesionContext'

export default function RutaAdmin({ children }) {
  const { sesion, autenticado } = useSesion()
  const location = useLocation()
  const esAdmin = autenticado && sesion?.tipoUsuario === 'Administrador'

  if (!autenticado) {
    return <Navigate to="/login" replace state={{ motivo: 'admin', desde: location.pathname }} />
  }

  if (!esAdmin) {
    return (
      <section className="my-5 text-center" data-testid="acceso-restringido">
        <h1 className="display-6">Acceso restringido</h1>
        <p className="text-secondary">
          Esta seccion es solo para administradores. Tu cuenta actual es
          {' '}
          <strong>{sesion?.tipoUsuario ?? 'Cliente'}</strong>.
        </p>
        <div className="d-flex justify-content-center gap-2 mt-3">
          <Link to="/" className="btn btn-marca">
            Volver a la tienda
          </Link>
          <Link to="/perfil" className="btn btn-marca-outline">
            Ver mi perfil
          </Link>
        </div>
      </section>
    )
  }

  return children
}
