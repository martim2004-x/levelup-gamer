// src/pages/admin/AdminUsuarioForm.jsx
// Formulario de creacion y edicion de usuarios (CRUD sobre usuariosStore).
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import Boton from '../../components/Boton'
import CampoFormulario from '../../components/CampoFormulario'
import { useToast } from '../../context/ToastContext'
import { REGIONES, obtenerComunas } from '../../data/regiones'
import { TIPOS_USUARIO, usuariosStore } from '../../data/usuarios'
import {
  validarCorreoInstitucional,
  validarLargoMaximo,
  validarRequerido,
  validarRun,
} from '../../utils/validaciones'

const INICIAL = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  tipoUsuario: '',
  region: '',
  comuna: '',
  direccion: '',
}

export default function AdminUsuarioForm() {
  const { run } = useParams()
  const editando = Boolean(run)
  const existente = editando ? usuariosStore.obtener(run) : null

  const [datos, setDatos] = useState(() =>
    existente
      ? {
          run: existente.run,
          nombre: existente.nombre,
          apellidos: existente.apellidos,
          correo: existente.correo,
          tipoUsuario: existente.tipoUsuario,
          region: existente.region ?? '',
          comuna: existente.comuna ?? '',
          direccion: existente.direccion ?? '',
        }
      : INICIAL,
  )
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')
  const { mostrarToast } = useToast()
  const navigate = useNavigate()

  if (editando && !existente) {
    return (
      <AdminLayout titulo="Usuario no encontrado">
        <p className="text-secondary">No existe un usuario con el RUN {run}.</p>
      </AdminLayout>
    )
  }

  const comunas = obtenerComunas(datos.region)

  const actualizar = (clave, valor) => {
    setDatos((previo) => ({ ...previo, [clave]: valor }))
    setErrores((previo) => ({ ...previo, [clave]: '' }))
  }

  const manejarSubmit = (evento) => {
    evento.preventDefault()

    const nuevos = {
      run: editando ? '' : validarRun(datos.run),
      nombre: validarRequerido(datos.nombre) || validarLargoMaximo(datos.nombre, 50),
      apellidos: validarRequerido(datos.apellidos) || validarLargoMaximo(datos.apellidos, 100),
      correo:
        validarRequerido(datos.correo) ||
        validarLargoMaximo(datos.correo, 100) ||
        validarCorreoInstitucional(datos.correo),
      tipoUsuario: datos.tipoUsuario ? '' : 'Selecciona un tipo de usuario.',
      region: datos.region ? '' : 'Selecciona una region.',
      comuna: datos.comuna ? '' : 'Selecciona una comuna.',
      direccion: validarRequerido(datos.direccion) || validarLargoMaximo(datos.direccion, 300),
    }
    setErrores(nuevos)
    if (Object.values(nuevos).some(Boolean)) {
      setMensaje('Revisa los campos marcados en rojo.')
      return
    }

    const registro = {
      run: datos.run.trim().toUpperCase(),
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      correo: datos.correo.trim(),
      tipoUsuario: datos.tipoUsuario,
      region: datos.region,
      comuna: datos.comuna,
      direccion: datos.direccion.trim(),
    }

    if (editando) {
      usuariosStore.actualizar(run, registro)
      mostrarToast('Usuario actualizado correctamente')
    } else {
      if (usuariosStore.obtener(registro.run)) {
        setErrores((previo) => ({ ...previo, run: 'Ya existe un usuario con este RUN.' }))
        setMensaje('El RUN ya esta registrado.')
        return
      }
      usuariosStore.crear(registro)
      mostrarToast('Usuario creado correctamente')
    }

    navigate('/admin/usuarios')
  }

  return (
    <AdminLayout titulo={editando ? 'Editar usuario' : 'Nuevo usuario'}>
      <div className="card" style={{ maxWidth: 700 }}>
        <div className="card-body">
          <form onSubmit={manejarSubmit} noValidate>
            <CampoFormulario
              id="run-usuario"
              label="RUN (sin puntos ni guion)"
              valor={datos.run}
              error={errores.run}
              readOnly={editando}
              disabled={editando}
              maxLength={9}
              placeholder="190110222"
              onChange={(e) => actualizar('run', e.target.value)}
            />

            <div className="row">
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="nombre-usuario"
                  label="Nombre"
                  valor={datos.nombre}
                  error={errores.nombre}
                  maxLength={50}
                  onChange={(e) => actualizar('nombre', e.target.value)}
                />
              </div>
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="apellidos-usuario"
                  label="Apellidos"
                  valor={datos.apellidos}
                  error={errores.apellidos}
                  maxLength={100}
                  onChange={(e) => actualizar('apellidos', e.target.value)}
                />
              </div>
            </div>

            <CampoFormulario
              id="correo-usuario"
              label="Correo"
              tipo="email"
              valor={datos.correo}
              error={errores.correo}
              maxLength={100}
              onChange={(e) => actualizar('correo', e.target.value)}
            />

            <CampoFormulario
              id="tipo-usuario"
              label="Tipo de usuario"
              as="select"
              valor={datos.tipoUsuario}
              error={errores.tipoUsuario}
              ayuda="Administrador: acceso total. Vendedor: productos y ordenes. Cliente: solo tienda."
              onChange={(e) => actualizar('tipoUsuario', e.target.value)}
            >
              <option value="">-- Seleccione el perfil --</option>
              {TIPOS_USUARIO.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </CampoFormulario>

            <div className="row">
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="region-usuario"
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
                  id="comuna-usuario"
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

            <CampoFormulario
              id="direccion-usuario"
              label="Direccion"
              valor={datos.direccion}
              error={errores.direccion}
              maxLength={300}
              onChange={(e) => actualizar('direccion', e.target.value)}
            />

            {mensaje && (
              <p className="text-danger small" role="alert">
                {mensaje}
              </p>
            )}

            <Boton type="submit" bloque>
              {editando ? 'Guardar cambios' : 'Crear usuario'}
            </Boton>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
