// test/ProductGrid.spec.jsx
// Pruebas de la grilla de productos (render de varias tarjetas y estado vacio).
import { MemoryRouter } from 'react-router-dom'
import { cleanup, render, screen } from '@testing-library/react'
import ProductGrid from '../src/components/ProductGrid'

afterEach(cleanup)

function producto(codigo) {
  return {
    codigo,
    categoria: 'Mouse',
    nombre: `Producto ${codigo}`,
    precio: 10000,
    descuento: 0,
    stock: 10,
    stockCritico: 2,
    imagen: '/img/productos/mouse-g502.svg',
  }
}

function renderizar(productos) {
  return render(
    <MemoryRouter>
      <ProductGrid productos={productos} onAgregar={() => {}} />
    </MemoryRouter>,
  )
}

describe('ProductGrid', () => {
  it('renderiza una tarjeta por cada producto recibido', () => {
    renderizar([producto('A1'), producto('A2'), producto('A3')])
    expect(screen.getAllByRole('article').length).toBe(3)
  })

  it('muestra el mensaje de grilla vacia cuando no hay productos', () => {
    renderizar([])
    expect(screen.getByTestId('grilla-vacia')).toBeTruthy()
    expect(screen.queryByTestId('grilla-productos')).toBeNull()
  })
})
