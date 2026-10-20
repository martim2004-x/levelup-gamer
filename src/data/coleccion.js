// src/data/coleccion.js
// Fabrica de "colecciones" con operaciones CRUD (Crear, Leer, Actualizar,
import { guardarClave, leerClave, notificar, suscribir } from './persistencia'

/**
 * Crea una coleccion CRUD persistida.
 * @param {object} opciones
 * @param {string} opciones.clave      nombre de la clave en localStorage
 * @param {Array}  opciones.semilla    datos iniciales
 * @param {string} opciones.claveId    nombre del campo identificador
 */
export function crearColeccion({ clave, semilla = [], claveId = 'id' }) {
  let datos = leerClave(clave, null)

  // Si no hay datos guardados, se siembra la "base de datos" simulada.
  if (!Array.isArray(datos)) {
    datos = semilla.map((item) => ({ ...item }))
    guardarClave(clave, datos)
  }

  function persistir(siguiente) {
    datos = siguiente
    guardarClave(clave, datos)
    notificar(clave)
  }

  /** Lectura, devuelve copias para no exponer el arreglo interno. */
  function listar() {
    return datos.map((item) => ({ ...item }))
  }

  /** Lectura, obtiene un elemento por su id. */
  function obtener(id) {
    const encontrado = datos.find((item) => item[claveId] === id)
    return encontrado ? { ...encontrado } : null
  }

  /** Crear, agrega un elemento nuevo. */
  function crear(item) {
    const nuevo = { ...item }
    persistir([...datos, nuevo])
    return { ...nuevo }
  }

  /** Actualizar, reemplaza campos de un elemento existente. */
  function actualizar(id, cambios) {
    let actualizado = null
    const siguiente = datos.map((item) => {
      if (item[claveId] !== id) return item
      actualizado = { ...item, ...cambios, [claveId]: id }
      return actualizado
    })
    persistir(siguiente)
    return actualizado ? { ...actualizado } : null
  }

  /** Eliminar, quita un elemento por su id. */
  function eliminar(id) {
    const siguiente = datos.filter((item) => item[claveId] !== id)
    const seElimino = siguiente.length !== datos.length
    persistir(siguiente)
    return seElimino
  }

  /** Devuelve el arreglo interno (referencia estable) para useSyncExternalStore. */
  function snapshot() {
    return datos
  }

  return { listar, obtener, crear, actualizar, eliminar, snapshot, suscribir: (cb) => suscribir(clave, cb) }
}
