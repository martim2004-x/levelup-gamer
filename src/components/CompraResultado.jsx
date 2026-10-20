// src/components/CompraResultado.jsx
// Vista compartida para "compra exitosa" y "compra fallida".
import { Link } from 'react-router-dom'

/**
 * @param {object} props
 * @param {boolean} props.exito
 * @param {string} props.titulo
 * @param {string} props.mensaje
 * @param {React.ReactNode} [props.children]  resumen / detalle adicional
 */
export default function CompraResultado({ exito, titulo, mensaje, children }) {
  return (
    <div className="compra-resultado text-center" data-testid="compra-resultado">
      <div className={`compra-resultado__icono ${exito ? 'es-exito' : 'es-error'}`} aria-hidden="true">
        {exito ? '✓' : '✕'}
      </div>

      <h1 className="h3 mt-3">{titulo}</h1>
      <p className="text-secondary">{mensaje}</p>

      {children && <div className="compra-resultado__detalle my-4">{children}</div>}

      <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
        <Link to="/productos" className="btn btn-marca">
          Seguir comprando
        </Link>
        <Link to="/" className="btn btn-marca-outline">
          Volver al inicio
        </Link>
        {!exito && (
          <Link to="/carrito" className="btn btn-marca-outline">
            Reintentar pago
          </Link>
        )}
      </div>
    </div>
  )
}
