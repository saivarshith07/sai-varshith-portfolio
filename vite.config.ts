import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the build works on GitHub Pages project sites,
// Netlify, Vercel or a plain static host without any extra config.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
