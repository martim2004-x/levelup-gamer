// src/pages/admin/AdminProductoForm.jsx
// Formulario de creacion y edicion de productos. Usa el CRUD del archivo de
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import Boton from '../../components/Boton'
import CampoFormulario from '../../components/CampoFormulario'
import { useToast } from '../../context/ToastContext'
import { CATEGORIAS, productosStore } from '../../data/productos'
import {
  validarLargoMaximo,
  validarLargoMinimo,
  validarNumero,
  validarRequerido,
} from '../../utils/validaciones'

const INICIAL = {
  codigo: '',
  nombre: '',
  descripcion: '',
  precio: '',
  categoria: '',
  stock: '',
  stockCritico: '',
  descuento: '',
  imagen: '',
}

export default function AdminProductoForm() {
  const { codigo } = useParams()
  const editando = Boolean(codigo)
  const existente = editando ? productosStore.obtener(codigo) : null

  const [datos, setDatos] = useState(() =>
    existente
      ? {
          codigo: existente.codigo,
          nombre: existente.nombre,
          descripcion: existente.descripcion ?? '',
          precio: String(existente.precio),
          categoria: existente.categoria,
          stock: String(existente.stock),
          stockCritico: existente.stockCritico != null ? String(existente.stockCritico) : '',
          descuento: existente.descuento != null ? String(existente.descuento) : '',
          imagen: existente.imagen ?? '',
        }
      : INICIAL,
  )
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')
  const { mostrarToast } = useToast()
  const navigate = useNavigate()

  if (editando && !existente) {
    return (
      <AdminLayout titulo="Producto no encontrado">
        <p className="text-secondary">No existe un producto con el codigo {codigo}.</p>
      </AdminLayout>
    )
  }

  const actualizar = (clave, valor) => {
    setDatos((previo) => ({ ...previo, [clave]: valor }))
    setErrores((previo) => ({ ...previo, [clave]: '' }))
  }

  const manejarSubmit = (evento) => {
    evento.preventDefault()

    const nuevos = {
      codigo: validarRequerido(datos.codigo) || validarLargoMinimo(datos.codigo, 3),
      nombre: validarRequerido(datos.nombre) || validarLargoMaximo(datos.nombre, 100),
      descripcion: validarLargoMaximo(datos.descripcion, 500),
      precio: validarNumero(datos.precio, { min: 0 }),
      categoria: datos.categoria ? '' : 'Selecciona una categoria.',
      stock: validarNumero(datos.stock, { min: 0, soloEnteros: true }),
      stockCritico: datos.stockCritico === '' ? '' : validarNumero(datos.stockCritico, { min: 0, soloEnteros: true }),
      descuento:
        datos.descuento === '' ? '' : validarNumero(datos.descuento, { min: 0, max: 100, soloEnteros: true }),
    }
    setErrores(nuevos)
    if (Object.values(nuevos).some(Boolean)) {
      setMensaje('Revisa los campos marcados en rojo.')
      return
    }

    const registro = {
      codigo: datos.codigo.trim().toUpperCase(),
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion.trim(),
      precio: Number(datos.precio),
      categoria: datos.categoria,
      stock: Number(datos.stock),
      stockCritico: datos.stockCritico === '' ? 0 : Number(datos.stockCritico),
      descuento: datos.descuento === '' ? 0 : Number(datos.descuento),
      imagen: datos.imagen.trim() || '/img/productos/polera-levelup.jpg',
    }

    if (editando) {
      productosStore.actualizar(codigo, registro)
      mostrarToast('Producto actualizado correctamente')
    } else {
      if (productosStore.obtener(registro.codigo)) {
        setErrores((previo) => ({ ...previo, codigo: 'Ya existe un producto con este codigo.' }))
        setMensaje('El codigo ya esta en uso.')
        return
      }
      productosStore.crear(registro)
      mostrarToast('Producto creado correctamente')
    }

    navigate('/admin/productos')
  }

  return (
    <AdminLayout titulo={editando ? 'Editar producto' : 'Nuevo producto'}>
      <div className="card" style={{ maxWidth: 700 }}>
        <div className="card-body">
          <form onSubmit={manejarSubmit} noValidate>
            <CampoFormulario
              id="codigo-producto"
              label="Codigo del producto"
              valor={datos.codigo}
              error={errores.codigo}
              ayuda="Minimo 3 caracteres. No se puede editar una vez creado."
              readOnly={editando}
              disabled={editando}
              onChange={(e) => actualizar('codigo', e.target.value)}
            />

            <CampoFormulario
              id="nombre-producto"
              label="Nombre"
              valor={datos.nombre}
              error={errores.nombre}
              maxLength={100}
              onChange={(e) => actualizar('nombre', e.target.value)}
            />

            <CampoFormulario
              id="descripcion-producto"
              label="Descripcion (opcional)"
              as="textarea"
              rows={4}
              valor={datos.descripcion}
              error={errores.descripcion}
              maxLength={500}
              onChange={(e) => actualizar('descripcion', e.target.value)}
            />

            <div className="row">
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="precio-producto"
                  label="Precio (CLP)"
                  tipo="number"
                  min="0"
                  valor={datos.precio}
                  error={errores.precio}
                  onChange={(e) => actualizar('precio', e.target.value)}
                />
              </div>
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="categoria-producto"
                  label="Categoria"
                  as="select"
                  valor={datos.categoria}
                  error={errores.categoria}
                  onChange={(e) => actualizar('categoria', e.target.value)}
                >
                  <option value="">-- Seleccione --</option>
                  {CATEGORIAS.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </CampoFormulario>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-4">
                <CampoFormulario
                  id="stock-producto"
                  label="Stock"
                  tipo="number"
                  min="0"
                  valor={datos.stock}
                  error={errores.stock}
                  onChange={(e) => actualizar('stock', e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4">
                <CampoFormulario
                  id="stock-critico-producto"
                  label="Stock critico (opcional)"
                  tipo="number"
                  min="0"
                  valor={datos.stockCritico}
                  error={errores.stockCritico}
                  onChange={(e) => actualizar('stockCritico', e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4">
                <CampoFormulario
                  id="descuento-producto"
                  label="Descuento % (opcional)"
                  tipo="number"
                  min="0"
                  max="100"
                  valor={datos.descuento}
                  error={errores.descuento}
                  onChange={(e) => actualizar('descuento', e.target.value)}
                />
              </div>
            </div>

            <CampoFormulario
              id="imagen-producto"
              label="Imagen (opcional, URL o ruta)"
              valor={datos.imagen}
              error={errores.imagen}
              placeholder="/img/productos/foto-producto.jpg"
              onChange={(e) => actualizar('imagen', e.target.value)}
            />

            {mensaje && (
              <p className="text-danger small" role="alert">
                {mensaje}
              </p>
            )}

            <Boton type="submit" bloque>
              {editando ? 'Guardar cambios' : 'Crear producto'}
            </Boton>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
