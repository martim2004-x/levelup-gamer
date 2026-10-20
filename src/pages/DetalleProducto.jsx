// src/pages/DetalleProducto.jsx
// Detalle de un producto (?codigo via parametro de ruta). Incluye selector de
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Badge from '../components/Badge'
import Boton from '../components/Boton'
import CampoFormulario from '../components/CampoFormulario'
import { useCarrito } from '../context/CarritoContext'
import { useProductos } from '../data/productos'
import { useAgregarProducto } from '../hooks/useAgregarProducto'
import { estaEnOferta, formatearCLP, precioConDescuento } from '../utils/formato'

export default function DetalleProducto() {
  const { codigo } = useParams()
  const productos = useProductos()
  const producto = productos.find((p) => p.codigo === codigo)
  const { cantidadDe } = useCarrito()
  const agregarProducto = useAgregarProducto()

  const [cantidad, setCantidad] = useState(1)
  const [error, setError] = useState('')

  if (!producto) {
    return (
      <section className="my-5 text-center">
        <h1 className="h3">Producto no encontrado</h1>
        <p className="text-secondary">No encontramos ese producto en el catalogo.</p>
        <Link to="/productos" className="btn btn-marca">
          Volver al catalogo
        </Link>
      </section>
    )
  }

  const enOferta = estaEnOferta(producto)
  const precioFinal = precioConDescuento(producto)
  const stockBajo = producto.stock <= producto.stockCritico
  const yaEnCarrito = cantidadDe(producto.codigo)

  const manejarAgregar = () => {
    const valor = Number(cantidad) || 0

    if (valor < 1) {
      setError('Ingresa una cantidad valida (minimo 1).')
      return
    }
    if (valor + yaEnCarrito > producto.stock) {
      const disponible = producto.stock - yaEnCarrito
      setError(
        disponible > 0
          ? `Solo quedan ${disponible} unidades disponibles (ya tienes ${yaEnCarrito} en el carrito).`
          : `Ya tienes en el carrito todo el stock disponible de este producto (${producto.stock} unidades).`,
      )
      return
    }

    setError('')
    agregarProducto(producto, valor)
  }

  return (
    <section className="my-4">
      <nav aria-label="Ruta" className="migas mb-3">
        <Link to="/">Home</Link> &gt; <Link to="/productos">Productos</Link> &gt;{' '}
        <span>{producto.nombre}</span>
      </nav>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid detalle-imagen" />
        </div>

        <div className="col-12 col-lg-6">
          <span className="producto-card__categoria">{producto.categoria}</span>
          <h1 className="h2">{producto.nombre}</h1>

          <div className="d-flex flex-wrap gap-2 my-2">
            {enOferta && <Badge variante="oferta">-{producto.descuento}% de descuento</Badge>}
            {stockBajo && <Badge variante="alerta">¡Stock critico! Quedan {producto.stock} unidades</Badge>}
            {!stockBajo && <Badge variante="exito">Stock disponible: {producto.stock} unidades</Badge>}
          </div>

          <p className="detalle-precio">
            {enOferta && <span className="producto-card__precio-original">{formatearCLP(producto.precio)}</span>}
            <span className="producto-card__precio-final">{formatearCLP(precioFinal)}</span>
          </p>

          <p className="text-secondary">{producto.descripcion}</p>

          <div className="row g-3 align-items-end" style={{ maxWidth: 420 }}>
            <div className="col-6">
              <CampoFormulario
                id="input-cantidad"
                label="Cantidad"
                tipo="number"
                min="1"
                max={producto.stock}
                valor={cantidad}
                error={error}
                onChange={(evento) => setCantidad(evento.target.value)}
              />
            </div>
            <div className="col-6 mb-3">
              <Boton bloque onClick={manejarAgregar}>
                Añadir al carrito
              </Boton>
            </div>
          </div>

          <Link to="/carrito" className="btn btn-marca-outline">
            Ver mi carrito
          </Link>
        </div>
      </div>
    </section>
  )
}
