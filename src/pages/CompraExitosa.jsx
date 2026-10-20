// src/pages/CompraExitosa.jsx
// Vista de confirmacion de compra. Recibe el resumen del pedido por el estado
import { useLocation } from 'react-router-dom'
import CompraResultado from '../components/CompraResultado'
import { formatearCLP } from '../utils/formato'

export default function CompraExitosa() {
  const { state } = useLocation()
  const orden = state?.orden

  return (
    <section className="my-5">
      <CompraResultado
        exito
        titulo="¡Compra realizada con exito!"
        mensaje="Gracias por tu compra en Level-Up Gamer. Enviaremos tu pedido a la direccion indicada."
      >
        {orden ? (
          <div className="card text-start mx-auto" style={{ maxWidth: 560 }}>
            <div className="card-body">
              <p className="mb-1">
                <strong>Orden:</strong> {orden.numeroOrden}
              </p>
              <p className="mb-1">
                <strong>Fecha:</strong> {orden.fecha}
              </p>
              <p className="mb-1">
                <strong>Cliente:</strong> {orden.cliente.nombre}
              </p>
              <p className="mb-1">
                <strong>Entrega:</strong> {orden.cliente.direccion}, {orden.cliente.comuna},{' '}
                {orden.cliente.region}
              </p>
              <hr />
              <ul className="list-unstyled mb-2">
                {orden.articulos.map((articulo) => (
                  <li key={articulo.codigo} className="d-flex justify-content-between small">
                    <span>
                      {articulo.cantidad} × {articulo.nombre}
                    </span>
                    <span>{formatearCLP(articulo.subtotal)}</span>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between fs-5">
                <span>Total pagado</span>
                <span data-testid="total-orden">{formatearCLP(orden.total)}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-secondary">
            No encontramos el detalle del pedido, pero tu compra fue registrada correctamente.
          </p>
        )}
      </CompraResultado>
    </section>
  )
}
