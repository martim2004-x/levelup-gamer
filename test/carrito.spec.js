// test/carrito.spec.js
// Pruebas unitarias de la logica pura del carrito sin React.
import {
  actualizarItem,
  agregarItem,
  calcularTotal,
  contarUnidades,
  quitarItem,
} from '../src/utils/carrito'

describe('Utilidades del carrito', () => {
  it('agrega un producto nuevo', () => {
    const resultado = agregarItem([], 'JM001', 1)
    expect(resultado).toEqual([{ codigo: 'JM001', cantidad: 1 }])
  })

  it('aumenta la cantidad de un producto ya existente', () => {
    const inicial = [{ codigo: 'JM001', cantidad: 1 }]
    const resultado = agregarItem(inicial, 'JM001', 2)
    expect(resultado).toEqual([{ codigo: 'JM001', cantidad: 3 }])
  })

  it('actualiza la cantidad exacta de un producto', () => {
    const inicial = [{ codigo: 'JM001', cantidad: 1 }]
    expect(actualizarItem(inicial, 'JM001', 5)).toEqual([{ codigo: 'JM001', cantidad: 5 }])
  })

  it('elimina el producto cuando la cantidad llega a cero', () => {
    const inicial = [{ codigo: 'JM001', cantidad: 1 }]
    expect(actualizarItem(inicial, 'JM001', 0)).toEqual([])
  })

  it('quita un producto por su codigo', () => {
    const inicial = [
      { codigo: 'JM001', cantidad: 1 },
      { codigo: 'MS001', cantidad: 2 },
    ]
    expect(quitarItem(inicial, 'JM001')).toEqual([{ codigo: 'MS001', cantidad: 2 }])
  })

  it('cuenta las unidades totales', () => {
    const inicial = [
      { codigo: 'JM001', cantidad: 2 },
      { codigo: 'MS001', cantidad: 3 },
    ]
    expect(contarUnidades(inicial)).toBe(5)
  })

  it('calcula el total aplicando los descuentos del catalogo', () => {
    const catalogo = [
      { codigo: 'JM001', precio: 10000, descuento: 0 },
      { codigo: 'MS001', precio: 10000, descuento: 10 },
    ]
    const items = [
      { codigo: 'JM001', cantidad: 2 }, // 20000
      { codigo: 'MS001', cantidad: 1 }, // 9000
    ]
    expect(calcularTotal(items, catalogo)).toBe(29000)
  })
})
