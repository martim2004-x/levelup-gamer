// src/pages/Checkout.jsx
// Paso de pago en el que el cliente confirma sus datos y direccion de entrega. Si hay
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CampoFormulario from '../components/CampoFormulario'
import Boton from '../components/Boton'
import { useCarrito } from '../context/CarritoContext'
import { useSesion } from '../context/SesionContext'
import { useProductos } from '../data/productos'
import { REGIONES, obtenerComunas } from '../data/regiones'
import { calcularTotal } from '../utils/carrito'
import { formatearCLP, precioConDescuento } from '../utils/formato'
import {
  validarCorreoInstitucional,
  validarLargoMaximo,
  validarRequerido,
} from '../utils/validaciones'

export default function Checkout() {
  const { items, vaciar, totalUnidades } = useCarrito()
  const { sesion, autenticado } = useSesion()
  const productos = useProductos()
  const navigate = useNavigate()

  const [formulario, setFormulario] = useState({
    nombre: sesion?.nombre ?? '',
    correo: sesion?.correo ?? '',
    direccion: sesion?.direccion ?? '',
    region: '',
    comuna: '',
    resultado: 'aprobado',
  })
  const [errores, setErrores] = useState({})

  const lineas = useMemo(
    () =>
      items
        .map((item) => {
          const producto = productos.find((p) => p.codigo === item.codigo)
          if (!producto) return null
          return { producto, cantidad: item.cantidad, subtotal: precioConDescuento(producto) * item.cantidad }
        })
        .filter(Boolean),
    [items, productos],
  )

  // El total se calcula con la utilidad pura (probada en test/carrito.spec.js).
  const total = calcularTotal(items, productos)
  const comunas = obtenerComunas(formulario.region)

  const actualizar = (clave, valor) => {
    setFormulario((previo) => ({ ...previo, [clave]: valor }))
    setErrores((previo) => ({ ...previo, [clave]: '' }))
  }

  if (items.length === 0) {
    return (
      <section className="my-5 text-center">
        <h1 className="h3">No hay productos en el carrito</h1>
        <p className="text-secondary">Agrega productos antes de continuar al pago.</p>
        <Link to="/productos" className="btn btn-marca">
          Ver productos
        </Link>
      </section>
    )
  }

  const validar = () => {
    const nuevos = {
      nombre: validarRequerido(formulario.nombre) || validarLargoMaximo(formulario.nombre, 100),
      correo:
        validarRequerido(formulario.correo) ||
        validarLargoMaximo(formulario.correo, 100) ||
        validarCorreoInstitucional(formulario.correo),
      direccion: validarRequerido(formulario.direccion) || validarLargoMaximo(formulario.direccion, 300),
      region: formulario.region ? '' : 'Selecciona una region.',
      comuna: formulario.comuna ? '' : 'Selecciona una comuna.',
    }
    setErrores(nuevos)
    return Object.values(nuevos).every((mensaje) => !mensaje)
  }

  const manejarSubmit = (evento) => {
    evento.preventDefault()
    if (!validar()) return

    const orden = {
      numeroOrden: `LU-${Date.now().toString().slice(-6)}`,
      fecha: new Date().toLocaleString('es-CL'),
      total,
      unidades: totalUnidades,
      cliente: {
        nombre: formulario.nombre,
        correo: formulario.correo,
        direccion: formulario.direccion,
        region: formulario.region,
        comuna: formulario.comuna,
      },
      articulos: lineas.map((linea) => ({
        codigo: linea.producto.codigo,
        nombre: linea.producto.nombre,
        cantidad: linea.cantidad,
        subtotal: linea.subtotal,
      })),
    }

    if (formulario.resultado === 'rechazado') {
      navigate('/compra-fallida', { state: { orden, motivo: 'El banco rechazo la transaccion (simulacion).' } })
      return
    }

    vaciar()
    navigate('/compra-exitosa', { state: { orden } })
  }

  return (
    <section className="my-4">
      <h1 className="h2 mb-2">Finalizar compra</h1>
      {autenticado && (
        <p className="text-secondary small">
          Hola {sesion.nombre}, precargamos tus datos. Puedes editarlos si lo necesitas.
        </p>
      )}

      <form className="row g-4" onSubmit={manejarSubmit} noValidate>
        <div className="col-12 col-lg-7">
          <div className="card">
            <div className="card-body">
              <h2 className="h5 mb-3">Datos de envio</h2>

              <CampoFormulario
                id="checkout-nombre"
                label="Nombre completo"
                valor={formulario.nombre}
                error={errores.nombre}
                maxLength={100}
                onChange={(e) => actualizar('nombre', e.target.value)}
              />

              <CampoFormulario
                id="checkout-correo"
                label="Correo electronico"
                tipo="email"
                valor={formulario.correo}
                error={errores.correo}
                maxLength={100}
                onChange={(e) => actualizar('correo', e.target.value)}
              />

              <CampoFormulario
                id="checkout-direccion"
                label="Direccion de despacho"
                valor={formulario.direccion}
                error={errores.direccion}
                maxLength={300}
                onChange={(e) => actualizar('direccion', e.target.value)}
              />

              <div className="row">
                <div className="col-12 col-md-6">
                  <CampoFormulario
                    id="checkout-region"
                    label="Region"
                    as="select"
                    valor={formulario.region}
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
                    id="checkout-comuna"
                    label="Comuna"
                    as="select"
                    valor={formulario.comuna}
                    error={errores.comuna}
                    disabled={!formulario.region}
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

              <h2 className="h5 mb-3 mt-4">Pago (simulacion)</h2>
              <CampoFormulario
                id="checkout-resultado"
                label="Resultado de la pasarela de pago"
                as="select"
                valor={formulario.resultado}
                ayuda="Permite demostrar el flujo de compra exitosa y de pago rechazado."
                onChange={(e) => actualizar('resultado', e.target.value)}
              >
                <option value="aprobado">Pago aprobado (compra exitosa)</option>
                <option value="rechazado">Pago rechazado (compra fallida)</option>
              </CampoFormulario>

              <Boton type="submit" bloque>
                Confirmar pago
              </Boton>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card">
            <div className="card-body">
              <h2 className="h5 mb-3">Tu pedido</h2>
              <ul className="list-unstyled mb-3">
                {lineas.map((linea) => (
                  <li key={linea.producto.codigo} className="d-flex justify-content-between small mb-1">
                    <span>
                      {linea.cantidad} × {linea.producto.nombre}
                    </span>
                    <span>{formatearCLP(linea.subtotal)}</span>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between resumen-carrito__total">
                <span>Total</span>
                <span data-testid="checkout-total">{formatearCLP(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}
