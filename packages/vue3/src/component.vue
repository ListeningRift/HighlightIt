<template>
  <div ref="container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, watchEffect, onMounted, onBeforeMount } from 'vue'
import HighlightIt from '@highlight-it/core'
import type { HighlightItOptions } from '@highlight-it/core'

const props = withDefaults(
  defineProps<{
    options?: Partial<HighlightItOptions>
    keyword: string | string[]
  }>(),
  {
    options: () => ({})
  }
)

const container = ref<HTMLDivElement>()
const instance = shallowRef<HighlightIt>()

onMounted(() => {
  watchEffect(() => {
    if (!instance.value) {
      instance.value = new HighlightIt(container.value!, {
        appendToElement: true,
        ...props.options
      })
      instance.value.observe()
    } else {
      instance.value.setOptions(props.options)
    }
  })
  watchEffect(() => {
    instance.value?.query(props.keyword)
  })
})

const prev = () => {
  instance.value?.prev()
}

const next = () => {
  instance.value?.next()
}

onBeforeMount(() => {
  instance.value?.unobserve()
})

defineExpose({
  prev,
  next
})
</script>
