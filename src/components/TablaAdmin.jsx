// src/components/TablaAdmin.jsx
// Tabla reutilizable del panel de administracion (productos y usuarios).
/**
 * @param {object} props
 * @param {string[]} props.columnas
 * @param {React.ReactNode} props.children  filas <tr> de la tabla
 * @param {string} [props.titulo]
 * @param {React.ReactNode} [props.accion]  boton "Nuevo ..." de la cabecera
 */
export default function TablaAdmin({ columnas = [], children, titulo, accion }) {
  return (
    <section className="admin-panel">
      {(titulo || accion) && (
        <div className="admin-tabla-header d-flex justify-content-between align-items-center mb-3">
          {titulo && <h2 className="h5 mb-0">{titulo}</h2>}
          {accion}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle admin-tabla mb-0">
          <thead>
            <tr>
              {columnas.map((columna) => (
                <th key={columna} scope="col">
                  {columna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </section>
  )
}
