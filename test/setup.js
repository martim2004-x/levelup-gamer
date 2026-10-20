// test/setup.js
// Configuracion comun a todas las pruebas. Se carga ANTES que los specs
// (ver la lista `files` en karma.conf.js).
// Le indica a React que estamos en un entorno de pruebas controlado por act().
globalThis.IS_REACT_ACT_ENVIRONMENT = true

// Cada prueba parte con el almacenamiento limpio para ser independiente.
beforeEach(() => {
  try {
    window.localStorage.clear()
  } catch {
    /* jsdom sin storage */
  }
})
