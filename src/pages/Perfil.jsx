// src/pages/Perfil.jsx
// Perfil del usuario. Si no hay sesion, invita a iniciar sesion. Si la hay,
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Boton from '../components/Boton'
import CampoFormulario from '../components/CampoFormulario'
import { useSesion } from '../context/SesionContext'
import { useToast } from '../context/ToastContext'
import { usuariosStore } from '../data/usuarios'
import { validarCorreoInstitucional, validarLargoMaximo, validarRequerido } from '../utils/validaciones'

export default function Perfil() {
  const { sesion, autenticado, actualizarSesion, cerrarSesion } = useSesion()
  const { mostrarToast } = useToast()
  const navigate = useNavigate()

  const [nombre, setNombre] = useState(sesion?.nombre ?? '')
  const [correo, setCorreo] = useState(sesion?.correo ?? '')
  const [direccion, setDireccion] = useState(sesion?.direccion ?? '')
  const [errores, setErrores] = useState({})

  if (!autenticado) {
    return (
      <section className="my-5 text-center">
        <h1 className="h3">Debes iniciar sesion para ver tu perfil</h1>
        <Link to="/login" className="btn btn-marca mt-3">
          Iniciar sesion
        </Link>
      </section>
    )
  }

  const manejarSubmit = (evento) => {
    evento.preventDefault()

    const nuevos = {
      nombre: validarRequerido(nombre) || validarLargoMaximo(nombre, 100),
      correo:
        validarRequerido(correo) ||
        validarLargoMaximo(correo, 100) ||
        validarCorreoInstitucional(correo),
      direccion: validarLargoMaximo(direccion, 300),
    }
    setErrores(nuevos)
    if (Object.values(nuevos).some(Boolean)) return

    actualizarSesion({ nombre: nombre.trim(), correo: correo.trim(), direccion: direccion.trim() })

    // Si el correo corresponde a un usuario de la base local, sincronizamos.
    const usuario = usuariosStore.listar().find((u) => u.correo.toLowerCase() === correo.trim().toLowerCase())
    if (usuario) {
      usuariosStore.actualizar(usuario.run, {
        nombre: nombre.trim(),
        correo: correo.trim(),
        direccion: direccion.trim(),
      })
    }

    mostrarToast('Datos actualizados correctamente')
  }

  const manejarCerrarSesion = () => {
    if (window.confirm('¿Deseas cerrar tu sesion?')) {
      cerrarSesion()
      navigate('/')
    }
  }

  return (
    <section className="my-4">
      <div className="card formulario-nivelup mx-auto" style={{ maxWidth: 560 }}>
        <div className="card-body">
          <h1 className="h4 text-center mb-4">Mi perfil</h1>

          <form onSubmit={manejarSubmit} noValidate>
            <CampoFormulario
              id="nombre-perfil"
              label="Nombre completo"
              valor={nombre}
              error={errores.nombre}
              maxLength={100}
              onChange={(e) => setNombre(e.target.value)}
            />

            <CampoFormulario
              id="correo-perfil"
              label="Correo"
              tipo="email"
              valor={correo}
              error={errores.correo}
              ayuda="Solo correos @duoc.cl, @profesor.duoc.cl, @gmail.com o @hotmail.com."
              maxLength={100}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <CampoFormulario
              id="direccion-perfil"
              label="Direccion de despacho"
              valor={direccion}
              error={errores.direccion}
              maxLength={300}
              onChange={(e) => setDireccion(e.target.value)}
            />

            <div className="mb-3">
              <label className="form-label" htmlFor="tipo-usuario-perfil">
                Tipo de cuenta
              </label>
              <input
                id="tipo-usuario-perfil"
                className="form-control"
                value={sesion.tipoUsuario ?? 'Cliente'}
                disabled
                readOnly
              />
              <div className="form-text">El tipo de cuenta lo asigna el administrador.</div>
            </div>

            <Boton type="submit" bloque>
              Guardar cambios
            </Boton>
          </form>

          <div className="text-center mt-3">
            <Boton variante="secundario" onClick={manejarCerrarSesion}>
              Cerrar sesion
            </Boton>
          </div>
        </div>
      </div>
    </section>
  )
}
