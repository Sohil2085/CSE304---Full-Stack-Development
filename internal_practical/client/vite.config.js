import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server : { //this is for proxy
    proxy : {
      '/api' : 'http://localhost:8000',//whenever you go to the /api it will automatically call localhost:3000
    },
  },
  plugins: [react()],
})
