import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/getproducts': 'http://localhost:8005',
      '/getproductsone': 'http://localhost:8005'
    }
  }
})
