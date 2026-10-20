// src/pages/Home.jsx
// Vista principal (hero + productos destacados + ofertas).
import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { useProductos } from '../data/productos'
import { useAgregarProducto } from '../hooks/useAgregarProducto'
import { estaEnOferta } from '../utils/formato'

export default function Home() {
  const productos = useProductos()
  const agregarProducto = useAgregarProducto()

  const destacados = productos.slice(0, 4)
  const ofertas = productos.filter(estaEnOferta).slice(0, 4)

  return (
    <>
      <section className="hero-nivelup rounded-4 p-4 p-md-5 my-4">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-7">
            <h1 className="display-5">
              Sube de nivel con el mejor <span className="texto-acento">equipo gamer</span> de Chile
            </h1>
            <p className="text-secondary">
              Desde consolas y accesorios hasta computadores y sillas especializadas. Despachamos a todo el pais.
            </p>
            <Link to="/productos" className="btn btn-marca btn-lg">
              Ver catalogo
            </Link>
          </div>
          <div className="col-12 col-lg-5 text-center">
            <img
              src="/img/general/hero-home.jpg"
              alt="Ilustracion de equipamiento gamer"
              className="img-fluid hero-nivelup__imagen"
            />
          </div>
        </div>
      </section>

      <section className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h3 mb-0">Productos destacados</h2>
          <Link to="/productos" className="btn btn-marca-outline btn-sm">
            Ver catalogo completo
          </Link>
        </div>
        <ProductGrid productos={destacados} onAgregar={agregarProducto} />
      </section>

      {ofertas.length > 0 && (
        <section className="my-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h3 mb-0">Ofertas de la semana</h2>
            <Link to="/productos?ofertas=1" className="btn btn-marca-outline btn-sm">
              Ver todas las ofertas
            </Link>
          </div>
          <ProductGrid productos={ofertas} onAgregar={agregarProducto} />
        </section>
      )}
    </>
  )
}
