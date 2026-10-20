// src/utils/carrito.js
// Logica pura del carrito (sin React). Se separa del contexto para poder
import { precioConDescuento } from './formato'

/** Agrega un producto o aumenta su cantidad. */
export function agregarItem(items, codigo, cantidad = 1) {
  const existe = items.find((item) => item.codigo === codigo)
  if (existe) {
    return items.map((item) => (item.codigo === codigo ? { ...item, cantidad: item.cantidad + cantidad } : item))
  }
  return [...items, { codigo, cantidad }]
}

/** Fija la cantidad exacta de un producto (<= 0 lo elimina). */
export function actualizarItem(items, codigo, cantidad) {
  if (cantidad <= 0) return items.filter((item) => item.codigo !== codigo)
  return items.map((item) => (item.codigo === codigo ? { ...item, cantidad } : item))
}

/** Elimina un producto del carrito. */
export function quitarItem(items, codigo) {
  return items.filter((item) => item.codigo !== codigo)
}

/** Cuenta las unidades totales del carrito. */
export function contarUnidades(items = []) {
  return items.reduce((total, item) => total + item.cantidad, 0)
}

/** Calcula el total monetario cruzando el carrito con el catalogo. */
export function calcularTotal(items = [], productos = []) {
  return items.reduce((total, item) => {
    const producto = productos.find((p) => p.codigo === item.codigo)
    return producto ? total + precioConDescuento(producto) * item.cantidad : total
  }, 0)
}
