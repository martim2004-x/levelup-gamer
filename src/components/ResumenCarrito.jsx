// src/components/ResumenCarrito.jsx
// Panel de resumen de compra (unidades, total y accion de pago).
import { formatearCLP } from '../utils/formato'
import Boton from './Boton'

/**
 * @param {object} props
 * @param {number} props.total
 * @param {number} props.cantidadUnidades
 * @param {Function} props.onPagar
 * @param {Function} [props.onVaciar]
 * @param {boolean} [props.deshabilitado]
 */
export default function ResumenCarrito({ total, cantidadUnidades, onPagar, onVaciar, deshabilitado = false }) {
  return (
    <aside className="card resumen-carrito" aria-label="Resumen de compra">
      <div className="card-body">
        <h3 className="h5">Resumen</h3>

        <div className="d-flex justify-content-between text-secondary mb-2">
          <span>Unidades</span>
          <span data-testid="unidades-carrito">{cantidadUnidades}</span>
        </div>

        <div className="d-flex justify-content-between resumen-carrito__total">
          <span>Total</span>
          <span data-testid="total-carrito">{formatearCLP(total)}</span>
        </div>

        <Boton bloque className="mt-3" onClick={onPagar} disabled={deshabilitado}>
          Ir a pagar
        </Boton>

        {onVaciar && (
          <Boton bloque variante="secundario" className="mt-2" onClick={onVaciar}>
            Vaciar carrito
          </Boton>
        )}
      </div>
    </aside>
  )
}
