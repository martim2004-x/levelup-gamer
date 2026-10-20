import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuracion de Vite para la tienda Level-Up Gamer (React + Vite).
// La rubrica DSY1104 pide migrar el sitio HTML a componentes React reutilizables,
// por lo que este archivo reemplaza la antigua carga de scripts <script src="js/...">.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
