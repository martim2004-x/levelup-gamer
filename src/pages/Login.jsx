// src/pages/Login.jsx
// Inicio de sesion simulado (sin backend). Busca el correo en la "base de
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Boton from '../components/Boton'
import CampoFormulario from '../components/CampoFormulario'
import { useSesion } from '../context/SesionContext'
import { usuariosStore } from '../data/usuarios'
import {
  validarCorreoInstitucional,
  validarLargoMaximo,
  validarRangoLargo,
  validarRequerido,
} from '../utils/validaciones'

export default function Login() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')
  const { iniciarSesion } = useSesion()
  const navigate = useNavigate()
  const location = useLocation()

  // Si el usuario fue enviado aqui por intentar abrir el panel de admin.
  const avisoAdmin = location.state?.motivo === 'admin'
  const destinoAdmin = typeof location.state?.desde === 'string' && location.state.desde.startsWith('/admin')
    ? location.state.desde
    : '/admin'

  const manejarSubmit = (evento) => {
    evento.preventDefault()

    const nuevosErrores = {
      correo:
        validarRequerido(correo) ||
        validarLargoMaximo(correo, 100) ||
        validarCorreoInstitucional(correo),
      contrasena: validarRequerido(contrasena) || validarRangoLargo(contrasena, 4, 10),
    }
    setErrores(nuevosErrores)

    if (Object.values(nuevosErrores).some(Boolean)) {
      setMensaje('Revisa los datos ingresados.')
      return
    }

    // Simulacion de autenticacion contra la base de datos local.
    const usuario = usuariosStore
      .listar()
      .find((u) => u.correo.toLowerCase() === correo.trim().toLowerCase())

    const datos = usuario
      ? {
          nombre: `${usuario.nombre} ${usuario.apellidos}`,
          correo: usuario.correo,
          direccion: usuario.direccion ?? '',
          tipoUsuario: usuario.tipoUsuario,
        }
      : { nombre: correo.split('@')[0], correo: correo.trim(), tipoUsuario: 'Cliente' }

    iniciarSesion(datos)

    // El panel de administracion es exclusivo para cuentas "Administrador".
    if (datos.tipoUsuario === 'Administrador') {
      navigate(destinoAdmin, { replace: true })
      return
    }
    navigate('/perfil', { replace: true })
  }

  return (
    <section className="my-4">
      <div className="card formulario-nivelup mx-auto" style={{ maxWidth: 480 }}>
        <div className="card-body">
          <h1 className="h4 text-center mb-4">Inicio de sesion</h1>

          {avisoAdmin && (
            <p className="alert alert-warning small" role="alert">
              El panel de administracion requiere una cuenta de Administrador. Inicia sesion para continuar.
            </p>
          )}

          <form onSubmit={manejarSubmit} noValidate>
            <CampoFormulario
              id="correo-login"
              label="Correo"
              tipo="email"
              valor={correo}
              error={errores.correo}
              placeholder="nombre@duoc.cl"
              maxLength={100}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <CampoFormulario
              id="contrasena-login"
              label="Contraseña"
              tipo="password"
              valor={contrasena}
              error={errores.contrasena}
              ayuda="Entre 4 y 10 caracteres."
              minLength={4}
              maxLength={10}
              onChange={(e) => setContrasena(e.target.value)}
            />

            {mensaje && (
              <p className="text-danger small" role="alert">
                {mensaje}
              </p>
            )}

            <Boton type="submit" bloque>
              Iniciar sesion
            </Boton>
          </form>

          <p className="text-center mt-3 mb-0 small">
            ¿No tienes cuenta? <Link to="/registro">Registrate aqui</Link>
          </p>

          <p className="text-center mt-2 mb-0 small text-secondary">
            Cuenta de administrador de prueba: <strong>bastian.riquelme@duoc.cl</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
