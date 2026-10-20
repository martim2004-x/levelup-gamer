// src/pages/Contacto.jsx
// Formulario de contacto para enviar un mensaje a la tienda. Migrado desde
import { useState } from 'react'
import Boton from '../components/Boton'
import CampoFormulario from '../components/CampoFormulario'
import { useToast } from '../context/ToastContext'
import {
  validarCorreoInstitucional,
  validarLargoMaximo,
  validarRequerido,
} from '../utils/validaciones'

const FORMULARIO_INICIAL = { nombre: '', correo: '', comentario: '' }

const validarComentario = (valor) => validarRequerido(valor) || validarLargoMaximo(valor, 500)
const validarCorreoContacto = (valor) =>
  valor.trim() === '' ? '' : validarLargoMaximo(valor, 100) || validarCorreoInstitucional(valor)

export default function Contacto() {
  const [datos, setDatos] = useState(FORMULARIO_INICIAL)
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState(null)
  const { mostrarToast } = useToast()

  const actualizar = (clave, valor) => {
    setDatos((previo) => ({ ...previo, [clave]: valor }))
    setErrores((previo) => ({ ...previo, [clave]: '' }))
    setMensaje(null)
  }

  const manejarSubmit = (evento) => {
    evento.preventDefault()

    const nuevos = {
      nombre: validarRequerido(datos.nombre) || validarLargoMaximo(datos.nombre, 100),
      correo: validarCorreoContacto(datos.correo),
      comentario: validarComentario(datos.comentario),
    }
    setErrores(nuevos)

    if (Object.values(nuevos).some(Boolean)) {
      setMensaje({ tipo: 'error', texto: 'Revisa los campos marcados en rojo.' })
      return
    }

    setMensaje({ tipo: 'ok', texto: '¡Mensaje enviado! Te responderemos a la brevedad.' })
    mostrarToast('Mensaje enviado correctamente')
    setDatos(FORMULARIO_INICIAL)
  }

  return (
    <section className="my-4">
      <div className="text-center mb-4">
        <img src="/img/general/logo.png" alt="Logo Level-Up Gamer" height="72" />
        <h1 className="h3 mt-2">Contacto</h1>
        <p className="text-secondary">Cuentanos en que podemos ayudarte. Te respondemos a la brevedad.</p>
      </div>

      <div className="card formulario-nivelup mx-auto" style={{ maxWidth: 640 }}>
        <div className="card-body">
          <form onSubmit={manejarSubmit} noValidate data-testid="form-contacto">
            <h2 className="h5 mb-3">Formulario de contacto</h2>

            <CampoFormulario
              id="nombre-contacto"
              label="Nombre completo"
              valor={datos.nombre}
              error={errores.nombre}
              maxLength={100}
              onChange={(e) => actualizar('nombre', e.target.value)}
            />

            <CampoFormulario
              id="correo-contacto"
              label="Correo"
              tipo="email"
              valor={datos.correo}
              error={errores.correo}
              ayuda="Opcional. Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
              placeholder="nombre@duoc.cl"
              maxLength={100}
              onChange={(e) => actualizar('correo', e.target.value)}
            />

            <CampoFormulario
              id="comentario-contacto"
              label="Comentario"
              as="textarea"
              valor={datos.comentario}
              error={errores.comentario}
              ayuda={`${datos.comentario.length}/500 caracteres`}
              maxLength={500}
              rows={5}
              onChange={(e) => actualizar('comentario', e.target.value)}
            />

            {mensaje && (
              <p
                className={`small ${mensaje.tipo === 'ok' ? 'text-success' : 'text-danger'}`}
                role="alert"
                data-testid="mensaje-contacto"
              >
                {mensaje.texto}
              </p>
            )}

            <Boton type="submit" bloque>
              Enviar mensaje
            </Boton>
          </form>
        </div>
      </div>
    </section>
  )
}
