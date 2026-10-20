// src/utils/validaciones.js
// Reglas de validacion migradas desde js/validaciones.js.
/** Campo obligatorio. */
export function validarRequerido(valor) {
  return String(valor).trim() === '' ? 'Este campo es obligatorio.' : ''
}

/** Largo maximo permitido. */
export function validarLargoMaximo(valor, max) {
  return String(valor).length > max ? `Maximo ${max} caracteres.` : ''
}

/** Largo minimo permitido. */
export function validarLargoMinimo(valor, min) {
  return String(valor).length < min ? `Minimo ${min} caracteres.` : ''
}

/** Rango de largo (min..max). */
export function validarRangoLargo(valor, min, max) {
  const largo = String(valor).length
  if (largo < min || largo > max) {
    return `Debe tener entre ${min} y ${max} caracteres.`
  }
  return ''
}

/** Verifica que el correo pertenezca a un dominio permitido. */
export function validarCorreoInstitucional(valor) {
  const regex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com|hotmail\.com)$/i
  if (!regex.test(valor)) {
    return 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.'
  }
  return ''
}

/** Verifica la estructura general de un correo. */
export function validarFormatoCorreo(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(valor) ? '' : 'Ingresa un correo con formato valido.'
}

/** Valida mayoria de edad (18 anios). */
export function validarMayorDeEdad(fechaNacimiento, { requerido = false } = {}) {
  if (!fechaNacimiento) {
    return requerido ? 'Debes ingresar tu fecha de nacimiento.' : ''
  }
  const hoy = new Date()
  const nacimiento = new Date(`${fechaNacimiento}T00:00:00`)

  if (Number.isNaN(nacimiento.getTime())) {
    return 'Ingresa una fecha valida.'
  }
  if (nacimiento > hoy) {
    return 'La fecha de nacimiento no puede ser futura.'
  }

  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  const noHaCumplidoEsteAno =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())
  if (noHaCumplidoEsteAno) edad--

  return edad < 18 ? 'Debes ser mayor de 18 años para registrarte.' : ''
}

/**
 * Valida un RUN chileno usando el algoritmo modulo 11.
 * Acepta el RUN sin puntos ni guion (ejemplo "190110222").
 */
export function validarRun(valor) {
  const run = String(valor).trim().toUpperCase()

  if (run.length < 7 || run.length > 9) {
    return 'El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guion.'
  }

  const cuerpo = run.slice(0, -1)
  const dv = run.slice(-1)

  if (!/^\d+$/.test(cuerpo)) {
    return 'El cuerpo del RUN debe contener solo numeros.'
  }

  let suma = 0
  let multiplicador = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplicador
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
  }
  const resto = 11 - (suma % 11)
  let dvEsperado
  if (resto === 11) dvEsperado = '0'
  else if (resto === 10) dvEsperado = 'K'
  else dvEsperado = String(resto)

  if (dv !== dvEsperado) {
    return 'El RUN ingresado no es valido (digito verificador incorrecto).'
  }

  return ''
}

/** Valida rangos numericos. */
export function validarNumero(valor, { min = null, max = null, soloEnteros = false } = {}) {
  if (valor === '') return 'Este campo es obligatorio.'

  const numero = Number(valor)
  if (Number.isNaN(numero)) return 'Debe ser un valor numerico.'

  if (soloEnteros && !Number.isInteger(numero)) {
    return 'Debe ser un numero entero.'
  }
  if (min !== null && numero < min) return `El valor minimo permitido es ${min}.`
  if (max !== null && numero > max) return `El valor maximo permitido es ${max}.`

  return ''
}
