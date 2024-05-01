import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Ensure .json files can be imported.
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
})
