// test/ItemCarrito.spec.jsx
// Pruebas de una fila del carrito (subtotal con descuento, cambio de cantidad
// y eliminacion del producto).
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import ItemCarrito from '../src/components/ItemCarrito'

afterEach(cleanup)

const PRODUCTO = {
  codigo: 'MS001',
  categoria: 'Mouse',
  nombre: 'Mouse Logitech G502',
  precio: 10000,
  descuento: 10,
  stock: 10,
  stockCritico: 2,
  imagen: '/img/productos/mouse-g502.svg',
}

describe('ItemCarrito', () => {
  it('calcula el subtotal aplicando el descuento y la cantidad', () => {
    render(<ItemCarrito producto={PRODUCTO} cantidad={2} onCambiarCantidad={() => {}} onQuitar={() => {}} />)
    // 10000 con 10% de descuento = 9000; 9000 * 2 = 18000.
    expect(screen.getByTestId('subtotal-MS001').textContent).toBe('$18.000')
  })

  it('llama a onQuitar con el codigo del producto', () => {
    const alQuitar = jasmine.createSpy('onQuitar')
    render(<ItemCarrito producto={PRODUCTO} cantidad={1} onCambiarCantidad={() => {}} onQuitar={alQuitar} />)

    fireEvent.click(screen.getByLabelText('Quitar Mouse Logitech G502 del carrito'))

    expect(alQuitar).toHaveBeenCalledWith('MS001')
  })

  it('llama a onCambiarCantidad con el codigo y la nueva cantidad', () => {
    const alCambiar = jasmine.createSpy('onCambiarCantidad')
    render(<ItemCarrito producto={PRODUCTO} cantidad={1} onCambiarCantidad={alCambiar} onQuitar={() => {}} />)

    fireEvent.change(screen.getByLabelText('Cantidad de Mouse Logitech G502'), { target: { value: '4' } })

    expect(alCambiar).toHaveBeenCalledWith('MS001', 4)
  })
})
