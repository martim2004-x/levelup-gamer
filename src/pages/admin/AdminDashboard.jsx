// src/pages/admin/AdminDashboard.jsx
// Panel con metricas del inventario y listado de productos con stock critico.
import AdminLayout from '../../components/AdminLayout'
import Badge from '../../components/Badge'
import TablaAdmin from '../../components/TablaAdmin'
import { useProductos } from '../../data/productos'
import { formatearCLP, precioConDescuento } from '../../utils/formato'

export default function AdminDashboard() {
  const productos = useProductos()

  const totalProductos = productos.length
  const totalUnidades = productos.reduce((suma, p) => suma + p.stock, 0)
  const valorInventario = productos.reduce((suma, p) => suma + p.stock * precioConDescuento(p), 0)
  const criticos = productos.filter((p) => p.stock <= p.stockCritico)

  const metricas = [
    { valor: totalProductos, etiqueta: 'Productos' },
    { valor: totalUnidades, etiqueta: 'Unidades en stock' },
    { valor: formatearCLP(valorInventario), etiqueta: 'Valor del inventario' },
    { valor: criticos.length, etiqueta: 'Con stock critico', alerta: true },
  ]

  return (
    <AdminLayout titulo="¡Hola, Administrador!">
      <section className="row g-3 mb-4">
        {metricas.map((metrica) => (
          <div className="col-12 col-sm-6 col-xl-3" key={metrica.etiqueta}>
            <div className={`admin-card ${metrica.alerta ? 'admin-card--alerta' : ''}`}>
              <span className="admin-card__valor">{metrica.valor}</span>
              <span className="admin-card__etiqueta">{metrica.etiqueta}</span>
            </div>
          </div>
        ))}
      </section>

      <TablaAdmin titulo="Productos con stock critico" columnas={['Codigo', 'Producto', 'Stock actual', 'Stock critico']}>
        {criticos.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center text-secondary">
              No hay productos con stock critico.
            </td>
          </tr>
        ) : (
          criticos.map((producto) => (
            <tr key={producto.codigo}>
              <td>{producto.codigo}</td>
              <td>{producto.nombre}</td>
              <td>
                <Badge variante="alerta">{producto.stock}</Badge>
              </td>
              <td>{producto.stockCritico}</td>
            </tr>
          ))
        )}
      </TablaAdmin>
    </AdminLayout>
  )
}
