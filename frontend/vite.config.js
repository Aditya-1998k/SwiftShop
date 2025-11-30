
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  server: {
    host: true,            // Allow external access
    allowedHosts: true,    // Allow Cloudflare Tunnel host
    port: 5173             // Optional: ensure port is defined
  }
})
