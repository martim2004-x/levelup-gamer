// src/pages/Registro.jsx
// Registro de usuario que valida RUN (modulo 11), mayoria de edad, correo
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Boton from '../components/Boton'
import CampoFormulario from '../components/CampoFormulario'
import { useSesion } from '../context/SesionContext'
import { REGIONES, obtenerComunas } from '../data/regiones'
import { usuariosStore } from '../data/usuarios'
import {
  validarCorreoInstitucional,
  validarLargoMaximo,
  validarMayorDeEdad,
  validarRangoLargo,
  validarRequerido,
  validarRun,
} from '../utils/validaciones'

const FORMULARIO_INICIAL = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  fechaNacimiento: '',
  contrasena: '',
  confirmar: '',
  direccion: '',
  region: '',
  comuna: '',
}

export default function Registro() {
  const [datos, setDatos] = useState(FORMULARIO_INICIAL)
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')
  const { iniciarSesion } = useSesion()
  const navigate = useNavigate()

  const comunas = obtenerComunas(datos.region)

  const actualizar = (clave, valor) => {
    setDatos((previo) => ({ ...previo, [clave]: valor }))
    setErrores((previo) => ({ ...previo, [clave]: '' }))
  }

  const manejarSubmit = (evento) => {
    evento.preventDefault()

    const nuevos = {
      run: validarRun(datos.run),
      nombre: validarRequerido(datos.nombre) || validarLargoMaximo(datos.nombre, 50),
      apellidos: validarRequerido(datos.apellidos) || validarLargoMaximo(datos.apellidos, 100),
      correo:
        validarRequerido(datos.correo) ||
        validarLargoMaximo(datos.correo, 100) ||
        validarCorreoInstitucional(datos.correo),
      fechaNacimiento: validarMayorDeEdad(datos.fechaNacimiento, { requerido: true }),
      contrasena: validarRequerido(datos.contrasena) || validarRangoLargo(datos.contrasena, 4, 10),
      confirmar: datos.confirmar !== datos.contrasena ? 'Las contrasenas no coinciden.' : '',
      direccion: validarRequerido(datos.direccion) || validarLargoMaximo(datos.direccion, 300),
      region: datos.region ? '' : 'Selecciona una region.',
      comuna: datos.comuna ? '' : 'Selecciona una comuna.',
    }

    setErrores(nuevos)

    if (Object.values(nuevos).some(Boolean)) {
      setMensaje('Revisa los campos marcados en rojo antes de continuar.')
      return
    }

    const runNormalizado = datos.run.trim().toUpperCase()

    if (usuariosStore.obtener(runNormalizado)) {
      setErrores((previo) => ({ ...previo, run: 'Ya existe un usuario registrado con este RUN.' }))
      setMensaje('El RUN ya esta registrado.')
      return
    }

    usuariosStore.crear({
      run: runNormalizado,
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      correo: datos.correo.trim(),
      tipoUsuario: 'Cliente',
      region: datos.region,
      comuna: datos.comuna,
      direccion: datos.direccion.trim(),
    })

    iniciarSesion({
      nombre: `${datos.nombre.trim()} ${datos.apellidos.trim()}`,
      correo: datos.correo.trim(),
      direccion: datos.direccion.trim(),
      tipoUsuario: 'Cliente',
    })

    navigate('/perfil')
  }

  return (
    <section className="my-4">
      <div className="card formulario-nivelup mx-auto" style={{ maxWidth: 640 }}>
        <div className="card-body">
          <h1 className="h4 text-center mb-4">Registro de usuario</h1>

          <form onSubmit={manejarSubmit} noValidate>
            <CampoFormulario
              id="run"
              label="RUN (sin puntos ni guion)"
              valor={datos.run}
              error={errores.run}
              ayuda="Debe incluir un digito verificador valido (algoritmo modulo 11). Ejemplo: 190110222."
              maxLength={9}
              placeholder="190110222"
              onChange={(e) => actualizar('run', e.target.value)}
            />

            <div className="row">
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="nombre"
                  label="Nombre"
                  valor={datos.nombre}
                  error={errores.nombre}
                  maxLength={50}
                  onChange={(e) => actualizar('nombre', e.target.value)}
                />
              </div>
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="apellidos"
                  label="Apellidos"
                  valor={datos.apellidos}
                  error={errores.apellidos}
                  maxLength={100}
                  onChange={(e) => actualizar('apellidos', e.target.value)}
                />
              </div>
            </div>

            <CampoFormulario
              id="correo"
              label="Correo electronico"
              tipo="email"
              valor={datos.correo}
              error={errores.correo}
              placeholder="nombre@duoc.cl"
              maxLength={100}
              onChange={(e) => actualizar('correo', e.target.value)}
            />

            <CampoFormulario
              id="fecha-nacimiento"
              label="Fecha de nacimiento"
              tipo="date"
              valor={datos.fechaNacimiento}
              error={errores.fechaNacimiento}
              ayuda="Debes ser mayor de 18 años para registrarte."
              onChange={(e) => actualizar('fechaNacimiento', e.target.value)}
            />

            <div className="row">
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="contrasena"
                  label="Contraseña"
                  tipo="password"
                  valor={datos.contrasena}
                  error={errores.contrasena}
                  ayuda="Entre 4 y 10 caracteres."
                  maxLength={10}
                  onChange={(e) => actualizar('contrasena', e.target.value)}
                />
              </div>
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="confirmar-contrasena"
                  label="Confirmar contraseña"
                  tipo="password"
                  valor={datos.confirmar}
                  error={errores.confirmar}
                  onChange={(e) => actualizar('confirmar', e.target.value)}
                />
              </div>
            </div>

            <CampoFormulario
              id="direccion"
              label="Direccion"
              valor={datos.direccion}
              error={errores.direccion}
              maxLength={300}
              onChange={(e) => actualizar('direccion', e.target.value)}
            />

            <div className="row">
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="region"
                  label="Region"
                  as="select"
                  valor={datos.region}
                  error={errores.region}
                  onChange={(e) => {
                    actualizar('region', e.target.value)
                    actualizar('comuna', '')
                  }}
                >
                  <option value="">-- Seleccione la region --</option>
                  {REGIONES.map((region) => (
                    <option key={region.nombre} value={region.nombre}>
                      {region.nombre}
                    </option>
                  ))}
                </CampoFormulario>
              </div>
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="comuna"
                  label="Comuna"
                  as="select"
                  valor={datos.comuna}
                  error={errores.comuna}
                  disabled={!datos.region}
                  onChange={(e) => actualizar('comuna', e.target.value)}
                >
                  <option value="">-- Seleccione la comuna --</option>
                  {comunas.map((comuna) => (
                    <option key={comuna} value={comuna}>
                      {comuna}
                    </option>
                  ))}
                </CampoFormulario>
              </div>
            </div>

            {mensaje && (
              <p className="text-danger small" role="alert">
                {mensaje}
              </p>
            )}

            <Boton type="submit" bloque>
              Registrar
            </Boton>
          </form>

          <p className="text-center mt-3 mb-0 small">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
