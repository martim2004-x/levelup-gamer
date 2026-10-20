// src/context/CarritoContext.jsx
// Estado global del carrito de compras, persistido en localStorage.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { guardarClave, leerClave } from '../data/persistencia'
import { actualizarItem, agregarItem, contarUnidades, quitarItem } from '../utils/carrito'

const CarritoContext = createContext(null)
const CLAVE_CARRITO = 'carrito'

function leerCarritoInicial() {
  const datos = leerClave(CLAVE_CARRITO, [])
  return Array.isArray(datos) ? datos : []
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(leerCarritoInicial)

  // Persistencia, cada cambio del carrito se guarda en localStorage.
  useEffect(() => {
    guardarClave(CLAVE_CARRITO, items)
  }, [items])

  const agregar = useCallback((codigo, cantidad = 1) => {
    setItems((previos) => agregarItem(previos, codigo, cantidad))
  }, [])

  const actualizarCantidad = useCallback((codigo, nuevaCantidad) => {
    setItems((previos) => actualizarItem(previos, codigo, nuevaCantidad))
  }, [])

  const quitar = useCallback((codigo) => {
    setItems((previos) => quitarItem(previos, codigo))
  }, [])

  const vaciar = useCallback(() => setItems([]), [])

  const cantidadDe = useCallback(
    (codigo) => items.find((i) => i.codigo === codigo)?.cantidad ?? 0,
    [items],
  )

  const totalUnidades = contarUnidades(items)

  const value = useMemo(
    () => ({ items, agregar, actualizarCantidad, quitar, vaciar, cantidadDe, totalUnidades }),
    [items, agregar, actualizarCantidad, quitar, vaciar, cantidadDe, totalUnidades],
  )

  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
}

/** Hook de acceso al carrito. */
export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>')
  return contexto
}
