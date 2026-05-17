import { defineConfig } from 'vite'
import { copyFileSync, mkdirSync } from 'fs'

export default defineConfig({
  base: '/skincare-website/',
  build: {
    outDir: 'dist',
  },
  plugins: [{
    name: 'copy-data',
    closeBundle() {
      try {
        mkdirSync('dist/data', { recursive: true })
        copyFileSync('public/data/skincare.json', 'dist/data/skincare.json')
      } catch (e) {
        console.log('Data copy skipped or failed')
      }
    }
  }]
})