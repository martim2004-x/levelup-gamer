// src/main.jsx
// Punto de entrada de la aplicacion React. Monta <App /> dentro de los
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import { CarritoProvider } from './context/CarritoContext'
import { SesionProvider } from './context/SesionContext'
import { ToastProvider } from './context/ToastContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SesionProvider>
        <CarritoProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </CarritoProvider>
      </SesionProvider>
    </BrowserRouter>
  </StrictMode>,
)
