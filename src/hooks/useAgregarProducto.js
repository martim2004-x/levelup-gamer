// src/hooks/useAgregarProducto.js
// Hook que combina el carrito con las notificaciones, agrega un producto y
import { useCallback } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { useToast } from '../context/ToastContext'

export function useAgregarProducto() {
  const { agregar } = useCarrito()
  const { mostrarToast } = useToast()

  return useCallback(
    (producto, cantidad = 1) => {
      agregar(producto.codigo, cantidad)
      mostrarToast(`${producto.nombre} añadido al carrito`)
    },
    [agregar, mostrarToast],
  )
}
