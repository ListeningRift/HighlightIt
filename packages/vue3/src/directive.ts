import HighlightIt from '@highlight-it/core'
import type { Directive, DirectiveBinding, App } from 'vue'
import type { HighlightItOptions } from '@highlight-it/core'

interface HighlightItParams {
  el: string
  options: Partial<HighlightItOptions>
  keyword: string | string[]
}

const highlightIt: Directive<HTMLElement> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<HighlightItParams>) {
    const root = binding.value?.el ? el.querySelector(binding.value.el) : el
    const instance = new HighlightIt(root!, {
      appendToElement: true,
      ...binding.value.options
    })
    instance.observe()
    ;(el as any).highlightItInstance = instance
    instance.query(binding.value.keyword)
  },
  updated(el: HTMLElement, binding: DirectiveBinding<HighlightItParams>) {
    const instance = (el as HTMLElement & { highlightItInstance: HighlightIt }).highlightItInstance
    if (binding.value.keyword !== binding.oldValue?.keyword) {
      instance.query(binding.value.keyword)
    } else {
      instance.setOptions(binding.value.options)
    }
  },
  beforeUnmount(el: HTMLElement) {
    ;(el as HTMLElement & { highlightItInstance: HighlightIt }).highlightItInstance.unobserve()
  }
}

export default {
  install(app: App) {
    app.directive('highlight-it', highlightIt)
    return app
  }
}
export type { RangePosition, HighlightBlockPosition, HighlightItOptions, HighlightBlocks } from '@highlight-it/core'
