// src/components/Boton.jsx
// Componente de boton reutilizable. Recibe la etiqueta como children y una
const VARIANTES = {
  primario: 'btn-marca',
  secundario: 'btn-marca-outline',
  peligro: 'btn-peligro',
  neutro: 'btn-outline-secondary',
}

/**
 * @param {object} props
 * @param {React.ReactNode} props.children  texto/contenido del boton
 * @param {'primario'|'secundario'|'peligro'|'neutro'} [props.variante]
 * @param {boolean} [props.bloque]           ocupa todo el ancho
 * @param {Function} [props.onClick]
 */
export default function Boton({
  children,
  variante = 'primario',
  bloque = false,
  type = 'button',
  className = '',
  ...resto
}) {
  const clases = ['btn', VARIANTES[variante] ?? VARIANTES.primario, bloque ? 'w-100' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={clases} {...resto}>
      {children}
    </button>
  )
}
