// src/pages/Productos.jsx
// Catalogo con busqueda por texto, filtro por categoria y filtro de ofertas.
import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CampoFormulario from '../components/CampoFormulario'
import ProductGrid from '../components/ProductGrid'
import { useProductos } from '../data/productos'
import { useAgregarProducto } from '../hooks/useAgregarProducto'
import { estaEnOferta, normalizarTexto } from '../utils/formato'

export default function Productos() {
  const productos = useProductos()
  const agregarProducto = useAgregarProducto()
  const [parametros, setParametros] = useSearchParams()

  const busqueda = parametros.get('q') ?? ''
  const categoria = parametros.get('categoria') ?? 'todas'
  const soloOfertas = parametros.get('ofertas') === '1'

  const categorias = useMemo(
    () => [...new Set(productos.map((p) => p.categoria))],
    [productos],
  )

  const filtrados = useMemo(() => {
    const termino = normalizarTexto(busqueda)
    return productos.filter((producto) => {
      const coincideCategoria = categoria === 'todas' || producto.categoria === categoria
      const coincideOferta = !soloOfertas || estaEnOferta(producto)
      const coincideBusqueda =
        termino === '' ||
        normalizarTexto(producto.nombre).includes(termino) ||
        normalizarTexto(producto.categoria).includes(termino)
      return coincideCategoria && coincideOferta && coincideBusqueda
    })
  }, [productos, busqueda, categoria, soloOfertas])

  const actualizarParametro = (clave, valor) => {
    const siguientes = new URLSearchParams(parametros)
    if (valor) siguientes.set(clave, valor)
    else siguientes.delete(clave)
    setParametros(siguientes, { replace: true })
  }

  return (
    <section className="my-4">
      <nav aria-label="Ruta" className="migas mb-2">
        <Link to="/">Home</Link> &gt; <span>Productos</span>
      </nav>

      <h1 className="h2 mb-4">Todos los productos</h1>

      <div className="card panel-filtros mb-4">
        <div className="card-body row g-3 align-items-end">
          <div className="col-12 col-md-5">
            <CampoFormulario
              id="filtro-busqueda"
              label="Buscar"
              valor={busqueda}
              placeholder="Ej: silla, consola, mouse..."
              onChange={(evento) => actualizarParametro('q', evento.target.value)}
            />
          </div>

          <div className="col-12 col-md-4">
            <CampoFormulario
              id="filtro-categoria"
              label="Filtrar por categoria"
              as="select"
              valor={categoria}
              onChange={(evento) => actualizarParametro('categoria', evento.target.value)}
            >
              <option value="todas">Todas las categorias</option>
              {categorias.map((nombre) => (
                <option key={nombre} value={nombre}>
                  {nombre}
                </option>
              ))}
            </CampoFormulario>
          </div>

          <div className="col-12 col-md-3">
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="filtro-ofertas"
                checked={soloOfertas}
                onChange={(evento) => actualizarParametro('ofertas', evento.target.checked ? '1' : '')}
              />
              <label className="form-check-label" htmlFor="filtro-ofertas">
                Solo ofertas
              </label>
            </div>
          </div>
        </div>
      </div>

      <p className="text-secondary small" data-testid="resultado-conteo">
        {filtrados.length} producto(s) encontrado(s).
      </p>

      <ProductGrid
        productos={filtrados}
        onAgregar={agregarProducto}
        mensajeVacio="No hay productos que coincidan con tu busqueda."
      />
    </section>
  )
}
