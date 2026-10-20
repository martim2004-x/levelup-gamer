// test/validaciones.spec.js
// Pruebas unitarias de las reglas de validacion de formularios.
import {
  validarCorreoInstitucional,
  validarLargoMaximo,
  validarMayorDeEdad,
  validarNumero,
  validarRangoLargo,
  validarRequerido,
  validarRun,
} from '../src/utils/validaciones'

describe('validaciones basicas', () => {
  it('validarRequerido detecta campos vacios', () => {
    expect(validarRequerido('')).not.toBe('')
    expect(validarRequerido('   ')).not.toBe('')
    expect(validarRequerido('Bastian')).toBe('')
  })

  it('validarLargoMaximo respeta el limite', () => {
    expect(validarLargoMaximo('12345', 5)).toBe('')
    expect(validarLargoMaximo('123456', 5)).not.toBe('')
  })

  it('validarRangoLargo exige un minimo y un maximo', () => {
    expect(validarRangoLargo('abc', 2, 5)).toBe('')
    expect(validarRangoLargo('a', 2, 5)).not.toBe('')
    expect(validarRangoLargo('abcdef', 2, 5)).not.toBe('')
  })
})

describe('validarCorreoInstitucional', () => {
  it('acepta los dominios permitidos', () => {
    expect(validarCorreoInstitucional('alumno@duoc.cl')).toBe('')
    expect(validarCorreoInstitucional('profe@profesor.duoc.cl')).toBe('')
    expect(validarCorreoInstitucional('alguien@gmail.com')).toBe('')
  })

  it('rechaza dominios no permitidos', () => {
    expect(validarCorreoInstitucional('alguien@yahoo.com')).not.toBe('')
  })
})

describe('validarRun (algoritmo modulo 11)', () => {
  it('acepta un RUN valido', () => {
    expect(validarRun('190110222')).toBe('')
  })

  it('rechaza un RUN con digito verificador incorrecto', () => {
    expect(validarRun('190110221')).not.toBe('')
  })

  it('rechaza un cuerpo con letras', () => {
    expect(validarRun('19A110222')).not.toBe('')
  })
})

describe('validarMayorDeEdad', () => {
  it('acepta a una persona mayor de 18 anios', () => {
    const hace20 = new Date()
    hace20.setFullYear(hace20.getFullYear() - 20)
    expect(validarMayorDeEdad(hace20.toISOString().slice(0, 10))).toBe('')
  })

  it('rechaza a un menor de edad', () => {
    const hace10 = new Date()
    hace10.setFullYear(hace10.getFullYear() - 10)
    expect(validarMayorDeEdad(hace10.toISOString().slice(0, 10))).not.toBe('')
  })

  it('rechaza fechas futuras', () => {
    const manana = new Date()
    manana.setDate(manana.getDate() + 1)
    expect(validarMayorDeEdad(manana.toISOString().slice(0, 10))).not.toBe('')
  })
})

describe('validarNumero', () => {
  it('valida el rango permitido', () => {
    expect(validarNumero(5, { min: 0, max: 10 })).toBe('')
    expect(validarNumero(-1, { min: 0 })).not.toBe('')
    expect(validarNumero(11, { max: 10 })).not.toBe('')
  })

  it('exige numeros enteros cuando se solicita', () => {
    expect(validarNumero(2.5, { soloEnteros: true })).not.toBe('')
    expect(validarNumero(3, { soloEnteros: true })).toBe('')
  })
})
