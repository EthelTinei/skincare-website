import { defineConfig } from 'vite'
import { copyFileSync, mkdirSync } from 'fs'

export default defineConfig({
  base: '/skincare-website/',
  build: {
    outDir: 'dist',
  },
  plugins: [{
    name: 'copy-assets',
    closeBundle() {
      try {
        mkdirSync('dist/images', { recursive: true })
        const fs = require('fs')
        const files = fs.readdirSync('public/images')
        files.forEach(file => {
          copyFileSync(`public/images/${file}`, `dist/images/${file}`)
        })
      } catch (e) {
        console.log('Asset copy failed:', e.message)
      }
    }
  }]
})