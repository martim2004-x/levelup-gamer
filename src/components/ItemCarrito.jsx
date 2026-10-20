// src/components/ItemCarrito.jsx
// Fila de un producto dentro del carrito con imagen, cantidad editable y subtotal.
import { formatearCLP, precioConDescuento } from '../utils/formato'
import Boton from './Boton'

/**
 * @param {object} props
 * @param {object} props.producto
 * @param {number} props.cantidad
 * @param {Function} props.onCambiarCantidad  recibe (codigo, cantidad)
 * @param {Function} props.onQuitar           recibe (codigo)
 */
export default function ItemCarrito({ producto, cantidad, onCambiarCantidad, onQuitar }) {
  const precioUnitario = precioConDescuento(producto)
  const subtotal = precioUnitario * cantidad

  return (
    <div className="item-carrito" data-testid={`item-${producto.codigo}`}>
      <img src={producto.imagen} alt={producto.nombre} className="item-carrito__imagen" />

      <div className="flex-grow-1">
        <h3 className="h6 mb-0">{producto.nombre}</h3>
        <p className="text-secondary small mb-0">{formatearCLP(precioUnitario)} c/u</p>
      </div>

      <input
        type="number"
        className="form-control item-carrito__cantidad"
        min="1"
        max={producto.stock}
        value={cantidad}
        aria-label={`Cantidad de ${producto.nombre}`}
        onChange={(evento) => onCambiarCantidad(producto.codigo, Number(evento.target.value))}
      />

      <p className="item-carrito__subtotal mb-0" data-testid={`subtotal-${producto.codigo}`}>
        {formatearCLP(subtotal)}
      </p>

      <Boton
        variante="peligro"
        className="item-carrito__quitar"
        aria-label={`Quitar ${producto.nombre} del carrito`}
        onClick={() => onQuitar(producto.codigo)}
      >
        ✕
      </Boton>
    </div>
  )
}
