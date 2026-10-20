// test/productosStore.spec.js
// Pruebas del CRUD de la "base de datos" simulada de productos.
import { listarCategorias, productosStore } from '../src/data/productos'

const PRODUCTO_PRUEBA = {
  codigo: 'TEST01',
  categoria: 'Mouse',
  nombre: 'Mouse de prueba',
  precio: 1000,
  stock: 5,
  stockCritico: 1,
  descuento: 0,
  imagen: '/img/productos/mouse-g502.svg',
  descripcion: 'Producto creado por una prueba unitaria.',
}

describe('CRUD de productos', () => {
  afterEach(() => {
    productosStore.eliminar(PRODUCTO_PRUEBA.codigo)
  })

  it('crea un producto y luego lo lee', () => {
    productosStore.crear(PRODUCTO_PRUEBA)
    const leido = productosStore.obtener('TEST01')
    expect(leido).not.toBeNull()
    expect(leido.nombre).toBe('Mouse de prueba')
  })

  it('actualiza un producto existente', () => {
    productosStore.crear(PRODUCTO_PRUEBA)
    productosStore.actualizar('TEST01', { precio: 2500, stock: 9 })
    const actualizado = productosStore.obtener('TEST01')
    expect(actualizado.precio).toBe(2500)
    expect(actualizado.stock).toBe(9)
  })

  it('elimina un producto', () => {
    productosStore.crear(PRODUCTO_PRUEBA)
    const seElimino = productosStore.eliminar('TEST01')
    expect(seElimino).toBeTrue()
    expect(productosStore.obtener('TEST01')).toBeNull()
  })

  it('devuelve null cuando el producto no existe', () => {
    expect(productosStore.obtener('NO-EXISTE')).toBeNull()
  })
})

describe('listarCategorias', () => {
  it('devuelve categorias unicas', () => {
    const categorias = listarCategorias()
    expect(categorias.length).toBeGreaterThan(0)
    expect(categorias).toEqual([...new Set(categorias)])
  })
})
