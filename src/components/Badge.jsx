// src/components/Badge.jsx
// Etiqueta pequenia reutilizable (ofertas, stock bajo, roles de usuario).
const VARIANTES = {
  info: 'text-bg-primary',
  oferta: 'text-bg-info',
  alerta: 'text-bg-danger',
  exito: 'text-bg-success',
  neutro: 'text-bg-secondary',
  advertencia: 'text-bg-warning',
}

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {'info'|'oferta'|'alerta'|'exito'|'neutro'|'advertencia'} [props.variante]
 */
export default function Badge({ children, variante = 'info', className = '' }) {
  const clases = ['badge rounded-pill', VARIANTES[variante] ?? VARIANTES.info, className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={clases} data-variante={variante}>
      {children}
    </span>
  )
}
