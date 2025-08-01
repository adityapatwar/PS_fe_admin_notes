import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  // Define environment variables for TypeScript
  define: {
    // Ensure process.env is not used in client code
    'process.env': {},
  },
  // Environment variables configuration
  envPrefix: 'VITE_',
})
