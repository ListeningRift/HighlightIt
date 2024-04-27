import HighlightItComponent from './component.vue'
import type { App } from 'vue'

HighlightItComponent.install = (app: App) => {
  app.component('HighlightIt', HighlightItComponent)
  return app
}

export const HighlightIt = HighlightItComponent as typeof HighlightItComponent & {
  install: (app: App) => App
}
export type HighlightItInstance = InstanceType<typeof HighlightItComponent>
export type { RangePosition, HighlightBlockPosition, HighlightItOptions, HighlightBlocks } from '@highlight-it/core'
