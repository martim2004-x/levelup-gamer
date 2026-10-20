// test/CampoFormulario.spec.jsx
// Pruebas del componente CampoFormulario (renderizado condicional del error y
// actualizacion del valor del input controlado).
import { useState } from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import CampoFormulario from '../src/components/CampoFormulario'

afterEach(cleanup)

/**probar el flujo controlado del campo. */
function CampoControlado({ errorInicial = '' }) {
  const [valor, setValor] = useState('')
  return (
    <CampoFormulario
      id="nombre"
      label="Nombre"
      valor={valor}
      error={errorInicial}
      onChange={(evento) => setValor(evento.target.value)}
    />
  )
}

describe('CampoFormulario', () => {
  it('no muestra el mensaje de error cuando no hay error', () => {
    render(<CampoControlado />)
    expect(screen.queryByTestId('nombre-error')).toBeNull()
  })

  it('muestra el mensaje de error cuando se entrega uno', () => {
    render(<CampoControlado errorInicial="El nombre es obligatorio" />)
    expect(screen.getByTestId('nombre-error').textContent).toBe('El nombre es obligatorio')
  })

  it('refleja en el input el valor escrito por el usuario', () => {
    render(<CampoControlado />)
    const input = screen.getByLabelText('Nombre')

    fireEvent.change(input, { target: { value: 'Bastian' } })

    expect(input.value).toBe('Bastian')
  })
})
