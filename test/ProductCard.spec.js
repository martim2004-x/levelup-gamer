// test/ProductCard.spec.jsx
// Pruebas de la tarjeta de producto (datos visibles, badges condicionales y
// la accion "agregar al carrito").
import { MemoryRouter } from 'react-router-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import ProductCard from '../src/components/ProductCard'

afterEach(cleanup)

const BASE = {
  codigo: 'MS001',
  categoria: 'Mouse',
  nombre: 'Mouse Logitech G502',
  precio: 10000,
  descuento: 0,
  stock: 10,
  stockCritico: 2,
  imagen: '/img/productos/mouse-g502.svg',
}

function renderizar(producto) {
  return render(
    <MemoryRouter>
      <ProductCard producto={producto} onAgregar={() => {}} />
    </MemoryRouter>,
  )
}

describe('ProductCard', () => {
  it('muestra el nombre, la categoria y el precio formateado', () => {
    renderizar(BASE)
    expect(screen.getByText('Mouse Logitech G502')).toBeTruthy()
    expect(screen.getByText('Mouse')).toBeTruthy()
    expect(screen.getByText(/\$10\.000/)).toBeTruthy()
  })

  it('muestra "¡Stock bajo!" cuando el stock alcanza el minimo critico', () => {
    renderizar({ ...BASE, stock: 2, stockCritico: 2 })
    expect(screen.getByText('¡Stock bajo!')).toBeTruthy()
  })

  it('no muestra "¡Stock bajo!" cuando hay stock suficiente', () => {
    renderizar(BASE)
    expect(screen.queryByText('¡Stock bajo!')).toBeNull()
  })

  it('muestra el badge de descuento cuando el producto esta en oferta', () => {
    renderizar({ ...BASE, precio: 10000, descuento: 20 })
    expect(screen.getByText('-20%')).toBeTruthy()
    expect(screen.getByText(/\$8\.000/)).toBeTruthy()
  })

  it('llama a onAgregar con el producto al presionar el boton', () => {
    const alAgregar = jasmine.createSpy('onAgregar')
    render(
      <MemoryRouter>
        <ProductCard producto={BASE} onAgregar={alAgregar} />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Añadir al carrito' }))

    expect(alAgregar).toHaveBeenCalledWith(BASE)
  })
})
