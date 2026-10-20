// src/context/SesionContext.jsx
// Estado de la sesion del usuario (login simulado), persistido en localStorage.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { borrarClave, guardarClave, leerClave } from '../data/persistencia'

const SesionContext = createContext(null)
const CLAVE_SESION = 'sesion'

export function SesionProvider({ children }) {
  const [sesion, setSesion] = useState(() => leerClave(CLAVE_SESION, null))

  useEffect(() => {
    if (sesion) guardarClave(CLAVE_SESION, sesion)
    else borrarClave(CLAVE_SESION)
  }, [sesion])

  /** Inicia sesion con los datos entregados. */
  const iniciarSesion = useCallback((datos) => setSesion(datos), [])

  /** Cierra la sesion actual. */
  const cerrarSesion = useCallback(() => setSesion(null), [])

  /** Actualiza campos de la sesion actual (perfil). */
  const actualizarSesion = useCallback(
    (cambios) => setSesion((actual) => ({ ...(actual || {}), ...cambios })),
    [],
  )

  const value = useMemo(
    () => ({
      sesion,
      autenticado: Boolean(sesion),
      iniciarSesion,
      cerrarSesion,
      actualizarSesion,
    }),
    [sesion, iniciarSesion, cerrarSesion, actualizarSesion],
  )

  return <SesionContext.Provider value={value}>{children}</SesionContext.Provider>
}

/** Hook de acceso a la sesion. */
export function useSesion() {
  const contexto = useContext(SesionContext)
  if (!contexto) throw new Error('useSesion debe usarse dentro de <SesionProvider>')
  return contexto
}
