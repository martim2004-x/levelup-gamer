// src/utils/formato.js
// Utilidades de formato reutilizables (migradas desde js/productos-data.js).
/**
 * Da formato de moneda al peso chileno, sin decimales.
 * @param {number|string} valor
 * @returns {string} por ejemplo "$29.990"
 */
export function formatearCLP(valor) {
  const numero = Number(valor)
  const seguro = Number.isNaN(numero) ? 0 : numero
  return seguro.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  })
}

/**
 * Calcula el precio final de un producto aplicando su descuento (0-100).
 * @param {Object} producto con precio y descuento opcional
 * @returns {number}
 */
export function precioConDescuento(producto) {
  const descuento = Number(producto?.descuento) || 0
  const precio = Number(producto?.precio) || 0
  if (descuento <= 0) return precio
  return Math.round(precio * (1 - descuento / 100))
}

/** Indica si un producto esta en oferta (tiene descuento mayor a 0). */
export function estaEnOferta(producto) {
  return (Number(producto?.descuento) || 0) > 0
}

/** Quita tildes y pasa a minusculas para busquedas simples. */
export function normalizarTexto(texto = '') {
  return String(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}
