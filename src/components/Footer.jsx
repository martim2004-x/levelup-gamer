// src/components/Footer.jsx
// Pie de pagina con enlaces rapidos. El enlace al panel de administracion
import { Link } from 'react-router-dom'
import { useSesion } from '../context/SesionContext'

export default function Footer() {
  const { sesion, autenticado } = useSesion()
  const esAdmin = autenticado && sesion?.tipoUsuario === 'Administrador'

  return (
    <footer className="footer-nivelup mt-auto">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h4 className="h6">Level-Up Gamer</h4>
            <p className="text-secondary small mb-0">
              Tienda online dedicada a satisfacer las necesidades de los entusiastas de los videojuegos en Chile.
            </p>
          </div>
          <div className="col-6 col-md-2">
            <h4 className="h6">Navegacion</h4>
            <ul className="list-unstyled small">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h4 className="h6">Mi cuenta</h4>
            <ul className="list-unstyled small">
              <li><Link to="/carrito">Mi carrito</Link></li>
              <li><Link to="/login">Iniciar sesion</Link></li>
              <li><Link to="/registro">Registrarse</Link></li>
              <li><Link to="/perfil">Mi perfil</Link></li>
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <h4 className="h6">Atencion al cliente</h4>
            <ul className="list-unstyled small">
              <li><Link to="/contacto">Formulario de contacto</Link></li>
              {esAdmin && <li><Link to="/admin">Panel administrador</Link></li>}
            </ul>
          </div>
        </div>
        <p className="text-center text-secondary small mt-4 mb-0">
          &copy; 2026 Level-Up Gamer. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
