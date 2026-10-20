// test/RutaAdmin.spec.js
// Pruebas de la guardia de acceso al panel de administracion.
//   - Sin sesion, redirige a /login.
//   - Con sesion sin rol de admin, muestra "acceso restringido".
//   - Con rol de Administrador, renderiza el contenido protegido.
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { cleanup, render, screen } from '@testing-library/react'
import RutaAdmin from '../src/components/RutaAdmin'
import { SesionProvider } from '../src/context/SesionContext'

afterEach(cleanup)

function montarAdmin(estadoSesion) {
  if (estadoSesion) {
    window.localStorage.setItem('levelup_sesion', JSON.stringify(estadoSesion))
  }
  return render(
    <MemoryRouter initialEntries={['/admin']}>
      <SesionProvider>
        <Routes>
          <Route path="/login" element={<p>pagina-login</p>} />
          <Route
            path="/admin"
            element={
              <RutaAdmin>
                <p>panel-admin</p>
              </RutaAdmin>
            }
          />
        </Routes>
      </SesionProvider>
    </MemoryRouter>,
  )
}

describe('RutaAdmin', () => {
  it('redirige a /login cuando no hay sesion', () => {
    montarAdmin(null)
    expect(screen.getByText('pagina-login')).toBeTruthy()
    expect(screen.queryByText('panel-admin')).toBeNull()
  })

  it('muestra acceso restringido a un usuario sin rol de administrador', () => {
    montarAdmin({ nombre: 'Cliente', correo: 'cliente@gmail.com', tipoUsuario: 'Cliente' })
    expect(screen.getByTestId('acceso-restringido')).toBeTruthy()
    expect(screen.queryByText('panel-admin')).toBeNull()
  })

  it('renderiza el contenido cuando la sesion es de Administrador', () => {
    montarAdmin({ nombre: 'Admin', correo: 'admin@duoc.cl', tipoUsuario: 'Administrador' })
    expect(screen.getByText('panel-admin')).toBeTruthy()
  })
})
