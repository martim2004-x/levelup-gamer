// test/ResumenCarrito.spec.jsx
// Pruebas del panel de resumen (total, unidades y accion de pago).
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import ResumenCarrito from '../src/components/ResumenCarrito'

afterEach(cleanup)

describe('ResumenCarrito', () => {
  it('muestra el total en pesos chilenos y la cantidad de unidades', () => {
    render(<ResumenCarrito total={25990} cantidadUnidades={3} onPagar={() => {}} />)
    expect(screen.getByTestId('total-carrito').textContent).toBe('$25.990')
    expect(screen.getByTestId('unidades-carrito').textContent).toBe('3')
  })

  it('llama a onPagar al presionar "Ir a pagar"', () => {
    const alPagar = jasmine.createSpy('onPagar')
    render(<ResumenCarrito total={10000} cantidadUnidades={1} onPagar={alPagar} />)

    fireEvent.click(screen.getByRole('button', { name: 'Ir a pagar' }))

    expect(alPagar).toHaveBeenCalledTimes(1)
  })
})
