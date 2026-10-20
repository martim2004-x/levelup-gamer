// src/pages/admin/AdminProductos.jsx
// CRUD de productos (listado, edicion y eliminacion).
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import Badge from '../../components/Badge'
import TablaAdmin from '../../components/TablaAdmin'
import { useToast } from '../../context/ToastContext'
import { productosStore, useProductos } from '../../data/productos'
import { formatearCLP, precioConDescuento } from '../../utils/formato'

export default function AdminProductos() {
  const productos = useProductos()
  const { mostrarToast } = useToast()

  const eliminar = (producto) => {
    if (!window.confirm(`¿Seguro que deseas eliminar "${producto.nombre}"?`)) return
    productosStore.eliminar(producto.codigo)
    mostrarToast(`Producto "${producto.nombre}" eliminado`)
  }

  return (
    <AdminLayout titulo="Gestion de productos">
      <TablaAdmin
        titulo="Listado de productos"
        columnas={['Codigo', 'Imagen', 'Nombre', 'Categoria', 'Precio', 'Stock', 'Acciones']}
        accion={
          <Link to="/admin/productos/nuevo" className="btn btn-marca btn-sm">
            + Nuevo producto
          </Link>
        }
      >
        {productos.length === 0 ? (
          <tr>
            <td colSpan="7" className="text-center text-secondary">
              No hay productos registrados.
            </td>
          </tr>
        ) : (
          productos.map((producto) => (
            <tr key={producto.codigo}>
              <td>{producto.codigo}</td>
              <td>
                <img src={producto.imagen} alt={producto.nombre} className="admin-tabla__miniatura" />
              </td>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>{formatearCLP(precioConDescuento(producto))}</td>
              <td>
                {producto.stock <= producto.stockCritico ? (
                  <Badge variante="alerta">{producto.stock}</Badge>
                ) : (
                  producto.stock
                )}
              </td>
              <td>
                <div className="admin-tabla__acciones">
                  <Link to={`/admin/productos/${producto.codigo}/editar`} className="btn btn-sm btn-marca">
                    Editar
                  </Link>
                  <button type="button" className="btn btn-sm btn-peligro" onClick={() => eliminar(producto)}>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </TablaAdmin>
    </AdminLayout>
  )
}
