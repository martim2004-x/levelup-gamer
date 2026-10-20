// src/components/ProductGrid.jsx
// Grilla responsiva de productos. Recibe un arreglo por props y delega el
import ProductCard from './ProductCard'

/**
 * @param {object} props
 * @param {Array} props.productos
 * @param {Function} props.onAgregar
 * @param {string} [props.mensajeVacio]
 */
export default function ProductGrid({
  productos = [],
  onAgregar,
  mensajeVacio = 'No hay productos para mostrar por el momento.',
}) {
  if (productos.length === 0) {
    return (
      <p className="text-center text-secondary" data-testid="grilla-vacia">
        {mensajeVacio}
      </p>
    )
  }

  return (
    <div className="row g-4" data-testid="grilla-productos">
      {productos.map((producto) => (
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={producto.codigo}>
          <ProductCard producto={producto} onAgregar={onAgregar} />
        </div>
      ))}
    </div>
  )
}
