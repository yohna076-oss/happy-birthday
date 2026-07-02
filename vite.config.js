import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'publik',  // ← pakai folder 'publik' yang sudah ada
})
