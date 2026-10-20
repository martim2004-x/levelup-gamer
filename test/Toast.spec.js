// test/Toast.spec.jsx
// Pruebas de renderizado condicional y cierre del componente Toast.
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Toast from '../src/components/Toast'

afterEach(cleanup)

describe('Toast', () => {
  it('no renderiza nada cuando visible es false', () => {
    render(<Toast mensaje="Producto agregado" visible={false} />)
    expect(screen.queryByTestId('toast-carrito')).toBeNull()
  })

  it('muestra el mensaje cuando visible es true', () => {
    render(<Toast mensaje="Producto agregado" visible={true} />)
    expect(screen.getByTestId('toast-carrito').textContent).toContain('Producto agregado')
  })

  it('ejecuta onClose al presionar el boton de cierre', () => {
    const alCerrar = jasmine.createSpy('onClose')
    render(<Toast mensaje="Producto agregado" visible={true} onClose={alCerrar} />)

    fireEvent.click(screen.getByLabelText('Cerrar notificacion'))

    expect(alCerrar).toHaveBeenCalledTimes(1)
  })
})
