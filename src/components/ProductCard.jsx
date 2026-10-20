// src/components/ProductCard.jsx
// Tarjeta de producto reutilizable (Home, catalogo, ofertas y detalle usan
import { Link } from 'react-router-dom'
import { estaEnOferta, formatearCLP, precioConDescuento } from '../utils/formato'
import Badge from './Badge'
import Boton from './Boton'

/**
 * @param {object} props
 * @param {object} props.producto
 * @param {Function} props.onAgregar  recibe el producto completo
 */
export default function ProductCard({ producto, onAgregar }) {
  const enOferta = estaEnOferta(producto)
  const precioFinal = precioConDescuento(producto)
  const stockBajo = producto.stock <= producto.stockCritico

  return (
    <article className="card producto-card h-100" data-testid={`producto-${producto.codigo}`}>
      <Link to={`/productos/${producto.codigo}`} className="producto-card__imagen">
        <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
      </Link>

      <div className="card-body d-flex flex-column">
        <span className="producto-card__categoria">{producto.categoria}</span>

        <h3 className="h6 producto-card__nombre">
          <Link to={`/productos/${producto.codigo}`}>{producto.nombre}</Link>
        </h3>

        <div className="d-flex flex-wrap gap-2 mb-2">
          {enOferta && <Badge variante="oferta">-{producto.descuento}%</Badge>}
          {stockBajo && <Badge variante="alerta">¡Stock bajo!</Badge>}
        </div>

        <p className="producto-card__precio mt-auto mb-2">
          {enOferta && <span className="producto-card__precio-original">{formatearCLP(producto.precio)}</span>}
          <span className="producto-card__precio-final">{formatearCLP(precioFinal)}</span>
        </p>
      </div>

      <div className="card-footer bg-transparent border-0 pt-0">
        <Boton bloque onClick={() => onAgregar(producto)}>
          Añadir al carrito
        </Boton>
      </div>
    </article>
  )
}
