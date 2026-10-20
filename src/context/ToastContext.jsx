// src/context/ToastContext.jsx
// Notificaciones flotantes (equivalente al toast de js/main.js).
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [mensaje, setMensaje] = useState('')
  const [visible, setVisible] = useState(false)
  const temporizador = useRef(null)

  const mostrarToast = useCallback((texto, duracion = 2200) => {
    setMensaje(texto)
    setVisible(true)
    clearTimeout(temporizador.current)
    temporizador.current = setTimeout(() => setVisible(false), duracion)
  }, [])

  const ocultarToast = useCallback(() => setVisible(false), [])

  const value = useMemo(
    () => ({ mensaje, visible, mostrarToast, ocultarToast }),
    [mensaje, visible, mostrarToast, ocultarToast],
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

/** Hook de acceso a las notificaciones. */
export function useToast() {
  const contexto = useContext(ToastContext)
  if (!contexto) throw new Error('useToast debe usarse dentro de <ToastProvider>')
  return contexto
}
