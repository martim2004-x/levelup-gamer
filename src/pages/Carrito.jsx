// src/pages/Carrito.jsx
// Carrito de compras (lista de items, edicion de cantidades, total y acceso al pago).
import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ItemCarrito from '../components/ItemCarrito'
import ResumenCarrito from '../components/ResumenCarrito'
import { useCarrito } from '../context/CarritoContext'
import { useToast } from '../context/ToastContext'
import { useProductos } from '../data/productos'
import { calcularTotal } from '../utils/carrito'
import { precioConDescuento } from '../utils/formato'

export default function Carrito() {
  const { items, actualizarCantidad, quitar, vaciar, totalUnidades } = useCarrito()
  const productos = useProductos()
  const { mostrarToast } = useToast()
  const navigate = useNavigate()

  // Cruzamos el carrito (que solo guarda codigo + cantidad) con el catalogo.
  const lineas = useMemo(() => {
    return items
      .map((item) => {
        const producto = productos.find((p) => p.codigo === item.codigo)
        if (!producto) return null
        return { producto, cantidad: item.cantidad, subtotal: precioConDescuento(producto) * item.cantidad }
      })
      .filter(Boolean)
  }, [items, productos])

  // El total se calcula con la utilidad pura (probada en test/carrito.spec.js).
  const total = calcularTotal(items, productos)

  const manejarCambioCantidad = (codigo, nuevaCantidad) => {
    const producto = productos.find((p) => p.codigo === codigo)
    if (!producto) return

    if (nuevaCantidad < 1) {
      mostrarToast('La cantidad minima es 1. Usa el boton ✕ para quitar el producto.')
      return
    }
    if (nuevaCantidad > producto.stock) {
      mostrarToast(`Solo hay ${producto.stock} unidades disponibles de ${producto.nombre}.`)
      actualizarCantidad(codigo, producto.stock)
      return
    }
    actualizarCantidad(codigo, nuevaCantidad)
  }

  if (items.length === 0) {
    return (
      <section className="my-5 text-center" data-testid="carrito-vacio">
        <h1 className="h3">Tu carrito esta vacio</h1>
        <p className="text-secondary">Explora nuestro catalogo y encuentra tu proximo upgrade.</p>
        <Link to="/productos" className="btn btn-marca">
          Ver productos
        </Link>
      </section>
    )
  }

  return (
    <section className="my-4">
      <h1 className="h2 mb-4">Mi carrito de compras</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          {lineas.map((linea) => (
            <ItemCarrito
              key={linea.producto.codigo}
              producto={linea.producto}
              cantidad={linea.cantidad}
              onCambiarCantidad={manejarCambioCantidad}
              onQuitar={quitar}
            />
          ))}
        </div>

        <div className="col-12 col-lg-4">
          <ResumenCarrito
            total={total}
            cantidadUnidades={totalUnidades}
            onPagar={() => navigate('/checkout')}
            onVaciar={vaciar}
          />
        </div>
      </div>
    </section>
  )
}
