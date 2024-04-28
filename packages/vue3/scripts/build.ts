import { resolve } from 'path'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import type { LibraryFormats} from 'vite';

// make library list, the name for folder
const components = ['directive', 'component'];

const libs = components.map((name) => {
  return {
    entry: `src/${name}.ts`,
    fileName: name,
    formats: ['es'] as LibraryFormats[]
  };
});

libs.forEach(async (lib) => {
  await build({
    configFile: false,
    build: {
      lib,
      outDir: 'dist',
      rollupOptions: {
        external: ['vue'],
      },
      emptyOutDir: false
    },
    plugins: [
      vue(),
      dts({
        include: 'src',
        outDir: 'dist',
        tsconfigPath: '../../tsconfig.json',
        beforeWriteFile(filePath, content) {
          return {
            filePath: resolve(filePath, '../../../../', `${lib.fileName}.d.ts`),
            content
          }
        }
      })
    ],
  });
});
