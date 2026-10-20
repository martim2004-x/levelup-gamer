// src/components/CampoFormulario.jsx
// Campo de formulario reutilizable (input, textarea o select) con etiqueta,
/**
 * @param {object} props
 * @param {string} props.id
 * @param {string} [props.label]
 * @param {string} [props.ayuda]
 * @param {string} [props.error]
 * @param {'input'|'textarea'|'select'} [props.as]
 * @param {string} [props.tipo]
 * @param {string|number} props.valor
 * @param {Function} props.onChange
 */
export default function CampoFormulario({
  id,
  label,
  ayuda,
  error = '',
  as = 'input',
  tipo = 'text',
  valor,
  onChange,
  children,
  className = '',
  ...resto
}) {
  const clasesControl = ['form-control', error ? 'is-invalid' : '', className].filter(Boolean).join(' ')

  const comunes = {
    id,
    className: clasesControl,
    value: valor,
    onChange,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? `${id}-error` : undefined,
    ...resto,
  }

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}

      {as === 'textarea' && <textarea {...comunes} />}
      {as === 'select' && (
        <select {...comunes}>{children}</select>
      )}
      {as === 'input' && <input type={tipo} {...comunes} />}

      {ayuda && <div className="form-text">{ayuda}</div>}

      {error && (
        <div id={`${id}-error`} className="invalid-feedback d-block" role="alert" data-testid={`${id}-error`}>
          {error}
        </div>
      )}
    </div>
  )
}
