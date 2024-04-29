import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.tsx'),
      fileName: 'highlightIt',
      formats: ['es']
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['react'],
    }
  },
  plugins: [
    react(),
    dts({
      include: './src',
      outDir: 'dist',
      tsconfigPath: '../../tsconfig.json',
      beforeWriteFile(filePath, content) {
        return {
          filePath: resolve(filePath, '../../../../', 'highlightIt.d.ts'),
          content
        }
      }
    })
  ],
  server: {
    open: './example/index.html',
    fs: {
      strict: false
    }
  }
})
