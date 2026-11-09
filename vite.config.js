import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The sandbox preview proxy forwards an external host name. Allow it only when
// the platform marks this as a preview run; normal builds keep Vite's defaults.
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN

const allowedHosts =
  previewMode && sandboxDomain ? ['.' + sandboxDomain, 'localhost'] : undefined

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts,
    watch: { usePolling: true },
  },
})
