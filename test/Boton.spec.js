// test/Boton.spec.jsx
// Pruebas de renderizado e interaccion del componente Boton.
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Boton from '../src/components/Boton'

afterEach(cleanup)

describe('Boton', () => {
  it('muestra la etiqueta recibida como children', () => {
    render(<Boton>Anadir al carrito</Boton>)
    expect(screen.getByRole('button').textContent).toBe('Anadir al carrito')
  })

  it('ejecuta onClick al hacer clic', () => {
    const alHacerClic = jasmine.createSpy('onClick')
    render(<Boton onClick={alHacerClic}>Comprar</Boton>)

    fireEvent.click(screen.getByRole('button'))

    expect(alHacerClic).toHaveBeenCalledTimes(1)
  })

  it('aplica la clase de la variante solicitada', () => {
    render(<Boton variante="peligro">Eliminar</Boton>)
    expect(screen.getByRole('button').className).toContain('btn-peligro')
  })
})
