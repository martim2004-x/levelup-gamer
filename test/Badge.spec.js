// test/Badge.spec.jsx
// Pruebas del componente Badge (etiquetas de oferta, stock y roles).
import { cleanup, render, screen } from '@testing-library/react'
import Badge from '../src/components/Badge'

afterEach(cleanup)

describe('Badge', () => {
  it('expone la variante mediante el atributo data-variante', () => {
    render(<Badge variante="alerta">¡Stock bajo!</Badge>)
    expect(screen.getByText('¡Stock bajo!').getAttribute('data-variante')).toBe('alerta')
  })

  it('usa la variante info por defecto', () => {
    render(<Badge>Nuevo</Badge>)
    expect(screen.getByText('Nuevo').getAttribute('data-variante')).toBe('info')
  })
})
