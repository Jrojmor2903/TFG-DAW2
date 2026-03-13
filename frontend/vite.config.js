import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // opcional: escuchar en todas las interfaces
    port: 5173, // asegúrate que coincida con tu puerto
    allowedHosts: [
      'localhost',
      '.ngrok-free.dev'  // permite cualquier subdominio de ngrok-free.dev
    ]
  }
})