// src/data/usuarios.js
// Fuente de datos simulada de USUARIOS + CRUD + hook de React.
import { useSyncExternalStore } from 'react'
import { crearColeccion } from './coleccion'

export const USUARIOS_SEMILLA = [
  {
    run: '191234567',
    nombre: 'Bastian',
    apellidos: 'Riquelme Soto',
    correo: 'bastian.riquelme@duoc.cl',
    tipoUsuario: 'Administrador',
    region: 'Region Metropolitana de Santiago',
    comuna: 'Santiago',
    direccion: 'Av. Siempre Viva 742',
  },
  {
    run: '178889990',
    nombre: 'Camila',
    apellidos: 'Fuentes Araya',
    correo: 'camila.fuentes@gmail.com',
    tipoUsuario: 'Vendedor',
    region: 'Region de Valparaiso',
    comuna: 'Viña del Mar',
    direccion: 'Calle Prat 123',
  },
  {
    run: '205556667',
    nombre: 'Matias',
    apellidos: 'Gonzalez Pardo',
    correo: 'matias.gonzalez@profesor.duoc.cl',
    tipoUsuario: 'Cliente',
    region: 'Region del Biobio',
    comuna: 'Concepcion',
    direccion: "O'Higgins 456",
  },
]

export const TIPOS_USUARIO = ['Administrador', 'Vendedor', 'Cliente']

// CRUD de usuarios
export const usuariosStore = crearColeccion({
  clave: 'usuarios',
  semilla: USUARIOS_SEMILLA,
  claveId: 'run',
})

/** Busca un usuario por su RUN. */
export function buscarUsuarioPorRun(run) {
  return usuariosStore.obtener(run)
}

/** Hook de React con la lista de usuarios sincronizada en vivo. */
export function useUsuarios() {
  return useSyncExternalStore(usuariosStore.suscribir, usuariosStore.snapshot, usuariosStore.snapshot)
}
