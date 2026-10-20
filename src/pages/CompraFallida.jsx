// src/pages/CompraFallida.jsx
// Vista de pago rechazado. Recibe el motivo y el resumen por location.state.
import { useLocation } from 'react-router-dom'
import CompraResultado from '../components/CompraResultado'
import { formatearCLP } from '../utils/formato'

export default function CompraFallida() {
  const { state } = useLocation()
  const orden = state?.orden
  const motivo = state?.motivo ?? 'No se pudo procesar el pago.'

  return (
    <section className="my-5">
      <CompraResultado
        exito={false}
        titulo="No pudimos completar tu pago"
        mensaje={motivo}
      >
        {orden && (
          <div className="card text-start mx-auto" style={{ maxWidth: 560 }}>
            <div className="card-body">
              <p className="mb-1">
                <strong>Orden:</strong> {orden.numeroOrden}
              </p>
              <p className="mb-1">
                <strong>Total a pagar:</strong> {formatearCLP(orden.total)}
              </p>
              <p className="mb-0 text-secondary small">
                Tu carrito sigue disponible para que puedas reintentar el pago.
              </p>
            </div>
          </div>
        )}
      </CompraResultado>
    </section>
  )
}
