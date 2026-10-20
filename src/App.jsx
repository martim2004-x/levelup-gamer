// src/App.jsx
// Definicion de rutas de la aplicacion (react-router-dom).
import { Link, Outlet, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import RutaAdmin from './components/RutaAdmin'
import Toast from './components/Toast'
import { useToast } from './context/ToastContext'
import Blogs from './pages/Blogs'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import CompraExitosa from './pages/CompraExitosa'
import CompraFallida from './pages/CompraFallida'
import Contacto from './pages/Contacto'
import DetalleBlog from './pages/DetalleBlog'
import DetalleProducto from './pages/DetalleProducto'
import Home from './pages/Home'
import Login from './pages/Login'
import Nosotros from './pages/Nosotros'
import Perfil from './pages/Perfil'
import Productos from './pages/Productos'
import Registro from './pages/Registro'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProductoForm from './pages/admin/AdminProductoForm'
import AdminProductos from './pages/admin/AdminProductos'
import AdminUsuarioForm from './pages/admin/AdminUsuarioForm'
import AdminUsuarios from './pages/admin/AdminUsuarios'

function LayoutTienda() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="container flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function NoEncontrado() {
  return (
    <section className="my-5 text-center">
      <h1 className="display-6">404</h1>
      <p className="text-secondary">La pagina que buscas no existe.</p>
      <Link to="/" className="btn btn-marca">
        Volver al inicio
      </Link>
    </section>
  )
}

export default function App() {
  const { mensaje, visible, ocultarToast } = useToast()

  return (
    <>
      <Routes>
        <Route element={<LayoutTienda />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:codigo" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra-exitosa" element={<CompraExitosa />} />
          <Route path="/compra-fallida" element={<CompraFallida />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<DetalleBlog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="*" element={<NoEncontrado />} />
        </Route>

        <Route
          path="/admin"
          element={
            <RutaAdmin>
              <AdminDashboard />
            </RutaAdmin>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <RutaAdmin>
              <AdminProductos />
            </RutaAdmin>
          }
        />
        <Route
          path="/admin/productos/nuevo"
          element={
            <RutaAdmin>
              <AdminProductoForm />
            </RutaAdmin>
          }
        />
        <Route
          path="/admin/productos/:codigo/editar"
          element={
            <RutaAdmin>
              <AdminProductoForm />
            </RutaAdmin>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <RutaAdmin>
              <AdminUsuarios />
            </RutaAdmin>
          }
        />
        <Route
          path="/admin/usuarios/nuevo"
          element={
            <RutaAdmin>
              <AdminUsuarioForm />
            </RutaAdmin>
          }
        />
        <Route
          path="/admin/usuarios/:run/editar"
          element={
            <RutaAdmin>
              <AdminUsuarioForm />
            </RutaAdmin>
          }
        />
      </Routes>

      <Toast mensaje={mensaje} visible={visible} onClose={ocultarToast} />
    </>
  )
}
