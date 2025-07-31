import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' // Import the plugin
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()], // Add tailwindcss() here
})