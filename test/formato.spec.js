// test/formato.spec.js
// Pruebas unitarias de las utilidades de formato.
import { estaEnOferta, formatearCLP, normalizarTexto, precioConDescuento } from '../src/utils/formato'

describe('formatearCLP', () => {
  it('formatea un monto en pesos chilenos sin decimales', () => {
    expect(formatearCLP(29990)).toBe('$29.990')
  })

  it('devuelve $0 ante un valor no numerico', () => {
    expect(formatearCLP('abc')).toBe('$0')
  })
})

describe('precioConDescuento', () => {
  it('aplica el porcentaje de descuento', () => {
    expect(precioConDescuento({ precio: 10000, descuento: 20 })).toBe(8000)
  })

  it('mantiene el precio cuando no hay descuento', () => {
    expect(precioConDescuento({ precio: 10000, descuento: 0 })).toBe(10000)
  })
})

describe('estaEnOferta', () => {
  it('detecta un producto con descuento mayor a 0', () => {
    expect(estaEnOferta({ descuento: 15 })).toBeTrue()
  })

  it('devuelve false cuando el descuento es 0 o no existe', () => {
    expect(estaEnOferta({ descuento: 0 })).toBeFalse()
    expect(estaEnOferta({})).toBeFalse()
  })
})

describe('normalizarTexto', () => {
  it('quita tildes y pasa a minusculas para poder comparar', () => {
    expect(normalizarTexto('  Silla GAMER Ñuñoa  ')).toBe('silla gamer nunoa')
  })
})
