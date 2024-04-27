import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'HighlightIt',
      fileName: 'highlightIt'
    },
    outDir: 'dist'
  },
  plugins: [
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
  ]
})
