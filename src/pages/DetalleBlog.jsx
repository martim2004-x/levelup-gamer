// src/pages/DetalleBlog.jsx
// Detalle de un articulo del blog. El contenido se renderiza por bloques
import { Link, useParams } from 'react-router-dom'
import { obtenerBlog } from '../data/blogs'

export default function DetalleBlog() {
  const { slug } = useParams()
  const blog = obtenerBlog(slug)

  if (!blog) {
    return (
      <section className="my-5 text-center">
        <h1 className="h3">Articulo no encontrado</h1>
        <p className="text-secondary">El articulo que buscas no existe o fue movido.</p>
        <Link to="/blogs" className="btn btn-marca">
          Volver a Blogs
        </Link>
      </section>
    )
  }

  return (
    <section className="my-4">
      <nav className="migas mb-3" aria-label="Migas de pan">
        <Link to="/">Home</Link> &gt; <Link to="/blogs">Blogs</Link> &gt; {blog.titulo}
      </nav>

      <article className="articulo-blog mx-auto" data-testid={`detalle-${blog.slug}`}>
        <img src={blog.imagen} alt={blog.imagenAlt} className="img-fluid rounded mb-3" />
        <h1 className="h3 mb-3">{blog.titulo}</h1>

        {blog.bloques.map((bloque, indice) =>
          bloque.tipo === 'lista' ? (
            <ul key={indice} className="text-secondary">
              {bloque.items.map((item, posicion) => (
                <li key={posicion}>
                  <strong>{item.fuerte}</strong>
                  {item.texto}
                </li>
              ))}
            </ul>
          ) : (
            <p key={indice} className="text-secondary">
              {bloque.texto}
            </p>
          ),
        )}

        <div className="d-flex flex-wrap gap-2 mt-3">
          {blog.enlaceProducto && (
            <Link to={`/productos/${blog.enlaceProducto.codigo}`} className="btn btn-marca">
              {blog.enlaceProducto.texto}
            </Link>
          )}
          <Link to="/blogs" className="btn btn-marca-outline">
            ← Volver a Blogs
          </Link>
        </div>
      </article>
    </section>
  )
}
