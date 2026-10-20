// src/components/Toast.jsx
// Notificacion flotante. Solo se renderiza cuando `visible` es true
/**
 * @param {object} props
 * @param {string} props.mensaje
 * @param {boolean} props.visible
 * @param {Function} [props.onClose]
 */
export default function Toast({ mensaje, visible, onClose }) {
  if (!visible) return null

  return (
    <div className="toast-nivelup visible" role="status" aria-live="polite" data-testid="toast-carrito">
      <span>{mensaje}</span>
      {onClose && (
        <button
          type="button"
          className="toast-nivelup__cerrar"
          onClick={onClose}
          aria-label="Cerrar notificacion"
        >
          ✕
        </button>
      )}
    </div>
  )
}
