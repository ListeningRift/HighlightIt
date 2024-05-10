# HighlightIt

HighlightIt is a library for highlighting keywords in the document based [`Range`](https://developer.mozilla.org/en-US/docs/Web/API/Range) API.

![npm license](https://img.shields.io/npm/l/@highlight-it/core) [![npm](https://img.shields.io/npm/v/@highlight-it/core)](https://www.npmjs.com/package/@highlight-it/core)

## Features

 * Highlight keywords in the document
 * Support multiple keywords
 * Support finding the `prev` and the `next`
 * Highlight block style supports high customization
 * Support
   * VanillaJS
   * Vue3
   * React
 * Simple API

## Getting Start

### VanillaJs

```bash
npm install @highlight-it/core
```

### Vue3

```bash
npm install @highlight-it/vue3
```

### React

```bash
npm install @highlight-it/react
```

## Usage

### VanillaJs

```html
<div id="container">
  <p>In all one's lifetime it is oneself that one spends the most time being with or dealing with. But it is precisely oneself that one has the least understanding of.</p>

  <p>When you are going upwards in life you tend to overestimate yourself. When you are going downhill you tend to underestimate yourself. It's likely that you think it wise for yourself to know your place and stay aloof from worldly wearing a mask of cowardice, behind which the flow of sap in your life will be retarded.</p>

  <p>To get a thorough understanding of oneself is to gain a correct view of oneself and be a sober realist—aware of both one's strength and shortage. You may look forward hopefully to the future but be sure not to expect too much, for ideals can never be fully realized. You may be courageous to meet challenges but it should be clear to you where to direct your efforts.</p>

  <p>To get a thorough understanding of oneself needs self-appreciation. Whether you like yourself to a towering tree or a blade of grass, whether you think you are a high mountain or a small stone, you represent a state of nature that has its own reason of existence. If you earnestly admire yourself you'll have a real sense of self-appreciation, which will give you confidence. As soon as you gain full confidence in yourself you'll be enabled to fight and overcome any adversity.</p>

  <p>To get a thorough understanding of oneself also requires doing oneself a favor when it's needed. In time of anger, do yourself a favor by giving vent to it in a quiet place so that you won't be hurt by its flames; in time of sadness, do yourself a favor by sharing it with your friends so as to change a gloomy mood into a cheerful one; in time of tiredness, do yourself a favor by getting a good sleep or taking some tonic. Show yourself loving concern about your health and daily life. Unless you know perfectly well when and how to do yourself a favor, you won't be confident and ready enough to resist the attack of illness.</p>

  <p>To get a thorough understanding of oneself is to get a full control of one's life. Then one will find one's life full of color and flavor.</p>
</div>
```

```javascript
// Import into your project
import HighlightIt from '@highlight-it/core'

// Init
const instance = new HighlightIt(document.getElementById('container'), {
  appendToElement: true,
  highlightStyle: {
    'background-color': 'rgba(255, 0, 0, 0.4)'
  }
})

const keyword = 'oneself'

const query = () => {
  instance.query(keyword)
}

const prev = () => {
  instance.prev()
}

const next = () => {
  instance.next()
}
```

### Vue3

#### Component

Import into your project:

```js
// Method 1: As a plugin
import { createApp } from 'vue'
import HighlightIt from '@highlight-it/vue3/component'

const app = createApp({
  /* ... */
})

app.use(HighlightIt)
```

```html
<script setup>
// Method 2: As a component
import HighlightIt from '@highlight-it/vue3/component'
</script>

<template>
  <highlight-it></highlight-it>
</template>
```

Usage:

```html
<script setup>
import { ref } from 'vue'
import HighlightIt from '@highlight-it/vue3/component'
import type { HighlightItOptions, HighlightItInstance } from '@highlight-it/vue3/component'

const keyword = ref('oneself')
const options = ref<Partial<HighlightItOptions>>({
  highlightStyle: {
    'background-color': 'rgba(255, 0, 0, 0.4)'
  }
})

const highlightItInstance = ref<HighlightItInstance>()

const prev = () => {
  highlightItInstance.value?.prev()
}

const next = () => {
  highlightItInstance.value?.next()
}
</script>

<template>
  <highlight-it
    ref="highlightItInstance"
    :keyword="keyword"
    :options="options"
  >
    <p>
      In all one's lifetime it is oneself that one spends the most time being with or dealing with. But it is precisely oneself that one has the least
      understanding of.
    </p>

    <p>
      When you are going upwards in life you tend to overestimate yourself. When you are going downhill you tend to underestimate yourself. It's likely that
      you think it wise for yourself to know your place and stay aloof from worldly wearing a mask of cowardice, behind which the flow of sap in your life
      will be retarded.
    </p>

    <p>
      To get a thorough understanding of oneself is to gain a correct view of oneself and be a sober realist—aware of both one's strength and shortage. You
      may look forward hopefully to the future but be sure not to expect too much, for ideals can never be fully realized. You may be courageous to meet
      challenges but it should be clear to you where to direct your efforts.
    </p>

    <p>
      To get a thorough understanding of oneself needs self-appreciation. Whether you like yourself to a towering tree or a blade of grass, whether you think
      you are a high mountain or a small stone, you represent a state of nature that has its own reason of existence. If you earnestly admire yourself you'll
      have a real sense of self-appreciation, which will give you confidence. As soon as you gain full confidence in yourself you'll be enabled to fight and
      overcome any adversity.
    </p>

    <p>
      To get a thorough understanding of oneself also requires doing oneself a favor when it's needed. In time of anger, do yourself a favor by giving vent to
      it in a quiet place so that you won't be hurt by its flames; in time of sadness, do yourself a favor by sharing it with your friends so as to change a
      gloomy mood into a cheerful one; in time of tiredness, do yourself a favor by getting a good sleep or taking some tonic. Show yourself loving concern
      about your health and daily life. Unless you know perfectly well when and how to do yourself a favor, you won't be confident and ready enough to resist
      the attack of illness.
    </p>

    <p>To get a thorough understanding of oneself is to get a full control of one's life. Then one will find one's life full of color and flavor.</p>
  </highlight-it>
</template>
```

#### Directive

Import into your project:

```js
import { createApp } from 'vue'
import HighlightIt from '@highlight-it/vue3/directive'

const app = createApp({
  /* ... */
})

app.use(HighlightIt)
```

Usage

```html
<script setup>
import { ref } from 'vue'
import type { HighlightItOptions } from '@highlight-it/vue3/component'

const keyword = ref('oneself')
const options = ref<Partial<HighlightItOptions>>({
  highlightStyle: {
    'background-color': 'rgba(255, 0, 0, 0.4)'
  }
})
</script>

<template>
  <div v-highlight-it="{ options, keyword }">
    <p>
      In all one's lifetime it is oneself that one spends the most time being with or dealing with. But it is precisely oneself that one has the least
      understanding of.
    </p>

    <p>
      When you are going upwards in life you tend to overestimate yourself. When you are going downhill you tend to underestimate yourself. It's likely that
      you think it wise for yourself to know your place and stay aloof from worldly wearing a mask of cowardice, behind which the flow of sap in your life
      will be retarded.
    </p>

    <p>
      To get a thorough understanding of oneself is to gain a correct view of oneself and be a sober realist—aware of both one's strength and shortage. You
      may look forward hopefully to the future but be sure not to expect too much, for ideals can never be fully realized. You may be courageous to meet
      challenges but it should be clear to you where to direct your efforts.
    </p>

    <p>
      To get a thorough understanding of oneself needs self-appreciation. Whether you like yourself to a towering tree or a blade of grass, whether you think
      you are a high mountain or a small stone, you represent a state of nature that has its own reason of existence. If you earnestly admire yourself you'll
      have a real sense of self-appreciation, which will give you confidence. As soon as you gain full confidence in yourself you'll be enabled to fight and
      overcome any adversity.
    </p>

    <p>
      To get a thorough understanding of oneself also requires doing oneself a favor when it's needed. In time of anger, do yourself a favor by giving vent to
      it in a quiet place so that you won't be hurt by its flames; in time of sadness, do yourself a favor by sharing it with your friends so as to change a
      gloomy mood into a cheerful one; in time of tiredness, do yourself a favor by getting a good sleep or taking some tonic. Show yourself loving concern
      about your health and daily life. Unless you know perfectly well when and how to do yourself a favor, you won't be confident and ready enough to resist
      the attack of illness.
    </p>

    <p>To get a thorough understanding of oneself is to get a full control of one's life. Then one will find one's life full of color and flavor.</p>
  </div>
</template>
```

### React

```jsx
import React, { useRef, useState } from 'react'
import { HighlightIt } from '@highlight-it/react'
import type { HighlightItOptions, HighlightItRef } from '@highlight-it/react'

export function App() {
  const [keyword, setKeyword] = useState<string>('oneself')
  const [options, setOptions] = useState<Partial<HighlightItOptions>>({
    highlightStyle: {
      'background-color': 'rgba(255, 0, 0, 0.4)'
    }
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const onSearch = () => {
    setKeyword(inputRef.current.value)
  }

  const highlightItRef = useRef<HighlightItRef>(null)

  const prev = () => {
    highlightItRef.current?.prev()
  }

  const next = () => {
    highlightItRef.current?.next()
  }

  const showAll = () => {
    setOptions({
      mode: 'all',
      highlightStyle: {
        'background-color': 'rgba(255, 0, 0, 0.4)'
      }
    })
  }

  return (
    <>
      <HighlightIt
        ref={highlightItRef as any}
        keyword={keyword}
        options={options}
        children={
          <>
            <p>
              In all one's lifetime it is oneself that one spends the most time being with or dealing with. But it is precisely oneself that one has the least
              understanding of.
            </p>

            <p>
              When you are going upwards in life you tend to overestimate yourself. When you are going downhill you tend to underestimate yourself. It's likely
              that you think it wise for yourself to know your place and stay aloof from worldly wearing a mask of cowardice, behind which the flow of sap in
              your life will be retarded.
            </p>

            <p>
              To get a thorough understanding of oneself is to gain a correct view of oneself and be a sober realist—aware of both one's strength and shortage.
              You may look forward hopefully to the future but be sure not to expect too much, for ideals can never be fully realized. You may be courageous to
              meet challenges but it should be clear to you where to direct your efforts.
            </p>

            <p>
              To get a thorough understanding of oneself needs self-appreciation. Whether you like yourself to a towering tree or a blade of grass, whether you
              think you are a high mountain or a small stone, you represent a state of nature that has its own reason of existence. If you earnestly admire
              yourself you'll have a real sense of self-appreciation, which will give you confidence. As soon as you gain full confidence in yourself you'll be
              enabled to fight and overcome any adversity.
            </p>

            <p>
              To get a thorough understanding of oneself also requires doing oneself a favor when it's needed. In time of anger, do yourself a favor by giving
              vent to it in a quiet place so that you won't be hurt by its flames; in time of sadness, do yourself a favor by sharing it with your friends so as
              to change a gloomy mood into a cheerful one; in time of tiredness, do yourself a favor by getting a good sleep or taking some tonic. Show yourself
              loving concern about your health and daily life. Unless you know perfectly well when and how to do yourself a favor, you won't be confident and
              ready enough to resist the attack of illness.
            </p>

            <p>To get a thorough understanding of oneself is to get a full control of one's life. Then one will find one's life full of color and flavor.</p>
          </>
        }
      ></HighlightIt>
    </>
  )
}
```

## Options

```ts
interface HighlightItOptions {
  /**
   * auto append the highlight block to element
   * @default false
   */
  appendToElement: boolean
  /**
   * element position
   * @default 'relative'
   */
  rootElementPosition: string
  /**
   * highlight block position
   * @default 'absolute'
   */
  highlightElementPosition: string
  /**
   * position processor
   * @param position highlight block position(before)
   * @returns highlight block position(after)
   */
  positionProcessor?: (position: HighlightBlockPosition) => HighlightBlockPosition
  /**
   * highlight block element
   * @default 'div'
   */
  highlightElement: string
  /**
   * highlight block element class
   * @default 'highlight-it'
   */
  highlightClassName: string
  /**
   * highlight block element class style
   * @default {}
   */
  highlightStyle: CSSProperties
  /**
   * 'single' only highlight one, 'all' highlight all. when keyword is array, only can highlight all.
   * @default 'single'
   */
  mode: HighlightItMode
  /**
   * when observe element, debounce time
   * @default 0
   */
  delay: number
}
```

## Methods

`setOptions(options: Partial<HighlightItOptions>) => void`

Set the instance's options after the instance has been created.

`query(keyword: string | string[]) => HighlightBlockPosition[]`

Query the keywords. Highlight them or get the blocks' position.

`update() => HighlightBlockPosition[]`

Recalculate the blocks' position.

`clearBlocks() => void`

Clear all the block elements.

`prev() => void`

Find the previous one.

`next() => void`

Find the next one.

`observe() => void`

Observe the root element and update the blocks when it resizes.

`unobserve() => void`

Remove the observer.
