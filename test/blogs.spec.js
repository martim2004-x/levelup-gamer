// test/blogs.spec.js
// Pruebas de la fuente de datos del blog.
import { BLOGS, obtenerBlog } from '../src/data/blogs'

describe('obtenerBlog', () => {
  it('devuelve el articulo correspondiente al slug', () => {
    const articulo = obtenerBlog('elegir-primera-silla-gamer')
    expect(articulo).not.toBeNull()
    expect(articulo.titulo).toContain('silla gamer')
  })

  it('devuelve null cuando el slug no existe', () => {
    expect(obtenerBlog('no-existe')).toBeNull()
  })
})

describe('BLOGS', () => {
  it('tiene slugs unicos para poder enrutar cada articulo', () => {
    const slugs = BLOGS.map((blog) => blog.slug)
    expect(slugs).toEqual([...new Set(slugs)])
  })

  it('cada articulo incluye titulo, resumen e imagen', () => {
    expect(BLOGS.every((blog) => blog.titulo && blog.resumen && blog.imagen)).toBeTrue()
  })
})
