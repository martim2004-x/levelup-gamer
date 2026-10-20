// src/pages/admin/AdminUsuarios.jsx
// CRUD de usuarios (listado, edicion y eliminacion).
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import Badge from '../../components/Badge'
import TablaAdmin from '../../components/TablaAdmin'
import { useToast } from '../../context/ToastContext'
import { usuariosStore, useUsuarios } from '../../data/usuarios'

const VARIANTE_ROL = {
  Administrador: 'info',
  Vendedor: 'advertencia',
  Cliente: 'oferta',
}

export default function AdminUsuarios() {
  const usuarios = useUsuarios()
  const { mostrarToast } = useToast()

  const eliminar = (usuario) => {
    if (!window.confirm(`¿Seguro que deseas eliminar a ${usuario.nombre} ${usuario.apellidos}?`)) return
    usuariosStore.eliminar(usuario.run)
    mostrarToast('Usuario eliminado')
  }

  return (
    <AdminLayout titulo="Gestion de usuarios">
      <TablaAdmin
        titulo="Listado de usuarios"
        columnas={['RUN', 'Nombre completo', 'Correo', 'Region / Comuna', 'Tipo', 'Acciones']}
        accion={
          <Link to="/admin/usuarios/nuevo" className="btn btn-marca btn-sm">
            + Nuevo usuario
          </Link>
        }
      >
        {usuarios.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center text-secondary">
              No hay usuarios registrados.
            </td>
          </tr>
        ) : (
          usuarios.map((usuario) => (
            <tr key={usuario.run}>
              <td>{usuario.run}</td>
              <td>
                {usuario.nombre} {usuario.apellidos}
              </td>
              <td>{usuario.correo}</td>
              <td>
                {usuario.comuna}, {usuario.region}
              </td>
              <td>
                <Badge variante={VARIANTE_ROL[usuario.tipoUsuario] ?? 'neutro'}>{usuario.tipoUsuario}</Badge>
              </td>
              <td>
                <div className="admin-tabla__acciones">
                  <Link to={`/admin/usuarios/${usuario.run}/editar`} className="btn btn-sm btn-marca">
                    Editar
                  </Link>
                  <button type="button" className="btn btn-sm btn-peligro" onClick={() => eliminar(usuario)}>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </TablaAdmin>
    </AdminLayout>
  )
}
