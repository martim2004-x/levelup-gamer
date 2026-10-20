// src/data/persistencia.js
// Capa de persistencia (localStorage) + un pequenio bus de eventos.
const PREFIJO = 'levelup_'

/** Lee y deserializa un valor guardado. Devuelve `porDefecto` si no existe. */
export function leerClave(clave, porDefecto = null) {
  try {
    const crudo = window.localStorage.getItem(PREFIJO + clave)
    return crudo === null ? porDefecto : JSON.parse(crudo)
  } catch {
    return porDefecto
  }
}

/** Serializa y guarda un valor. */
export function guardarClave(clave, valor) {
  try {
    window.localStorage.setItem(PREFIJO + clave, JSON.stringify(valor))
  } catch {
    /* almacenamiento no disponible (modo privado, etc.) */
  }
}

/** Elimina una clave. */
export function borrarClave(clave) {
  try {
    window.localStorage.removeItem(PREFIJO + clave)
  } catch {
    /* ignorar */
  }
}

// ---------------------------------------------------------------------------
// Bus de eventos, permite que multiples componentes reaccionen a un cambio.
// ---------------------------------------------------------------------------
const oyentes = new Map()

/** Suscribe una funcion a los cambios de una clave. Devuelve un cancelador. */
export function suscribir(clave, callback) {
  if (!oyentes.has(clave)) oyentes.set(clave, new Set())
  oyentes.get(clave).add(callback)
  return () => {
    oyentes.get(clave)?.delete(callback)
  }
}

/** Notifica a todos los suscriptores de una clave. */
export function notificar(clave) {
  oyentes.get(clave)?.forEach((callback) => callback())
}
