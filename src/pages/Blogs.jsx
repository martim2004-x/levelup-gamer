// src/pages/Blogs.jsx
// Listado de articulos / noticias de la tienda. Migrada desde blogs.html.
import { Link } from 'react-router-dom'
import { BLOGS } from '../data/blogs'

export default function Blogs() {
  return (
    <section className="my-4">
      <h1 className="h2 text-center mb-4">Noticias importantes</h1>

      <div className="row g-4">
        {BLOGS.map((blog) => (
          <div className="col-12 col-lg-6" key={blog.slug}>
            <article className="card h-100 panel-filtros" data-testid={`blog-${blog.slug}`}>
              <img src={blog.imagen} alt={blog.imagenAlt} className="card-img-top" />
              <div className="card-body d-flex flex-column">
                <h2 className="h5">{blog.titulo}</h2>
                <p className="text-secondary flex-grow-1">{blog.resumen}</p>
                <Link to={`/blogs/${blog.slug}`} className="btn btn-marca-outline align-self-start">
                  Ver caso
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
