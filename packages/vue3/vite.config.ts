import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'Bundle',
      fileName: 'highlightIt'
    },
    outDir: '../../dist/core'
  },
  plugins: [
    vue(),
    dts({
      include: './src',
      outDir: '../../dist/core',
      tsconfigPath: '../../tsconfig.json',
      beforeWriteFile(filePath, content) {
        return {
          filePath: resolve(filePath, '../../../../', 'highlightIt.d.ts'),
          content
        }
      }
    })
  ]
})
