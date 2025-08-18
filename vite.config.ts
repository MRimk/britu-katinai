import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If your repo is https://github.com/<user>/<repo>, set base to '/<repo>/' for assets.
// With HashRouter, this isn't strictly necessary, but it's handy for assets.
export default defineConfig({
  plugins: [react()],
  base: '/kennel-website/',
})