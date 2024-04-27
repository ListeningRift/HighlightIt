import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      fileName: 'highlightIt'
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['vue'],
    }
  },
  plugins: [
    vue(),
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
