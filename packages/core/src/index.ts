import { debounce } from "./utils"

// range position
export interface RangePosition {
  node: Element
  offset: number
}

// highlight block's position and size
export interface HighlightBlockPosition {
  top: number
  left: number
  width: number
  height: number
}

export type Keyword = string | string[]

type CSSProperties = {
  [key in string]: string
}

type HighlightItMode = 'single' | 'all'

export interface HighlightItOptions {
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

function getKeywordIndex(keyword: string, text: string | null) {
  if (!text) return []
  const regexp = new RegExp(keyword, 'g')
  return Array.from(text.matchAll(regexp)).map(item => item.index)
}

interface HighlightBlocks {
  count: number
  blocks: HighlightBlockPosition[][]
}

// get highlight blocks
function getHighlightBlock(keyword: string | string[], root: Element, options: HighlightItOptions): HighlightBlocks | HighlightBlocks[] {
  if (!keyword || !keyword.length) return []
  if (Array.isArray(keyword)) {
    return keyword.reduce((res, item) => {
      const indexArr = getKeywordIndex(item, root.textContent)
      return res.concat({
        count: indexArr.length,
        blocks: indexArr.reduce((res, index) => {
          if (index) return res.concat([getBlockPosition(index, keyword.length, root, options)])
          else return res
        }, [] as HighlightBlockPosition[][])
      })
    }, [] as HighlightBlocks[])
  } else {
    const indexArr = getKeywordIndex(keyword, root.textContent)
    return {
      count: indexArr.length,
      blocks: indexArr.reduce((res, index) => {
        if (index) return res.concat([getBlockPosition(index, keyword.length, root, options)])
        else return res
      }, [] as HighlightBlockPosition[][])
    }
  }
}

// get highlight block position by keyword
function getBlockPosition(startIndex: number, keywordLength: number, root: Element, options: HighlightItOptions): HighlightBlockPosition[] {
  // TODO Get all match results and index, and Find prev one and next one.

  const start = findStartNodeAndOffset(root!, startIndex)
  const end = findStartNodeAndOffset(root!, startIndex + keywordLength)

  if (!start || !end) return []
  const range = document.createRange()
  range.setStart(start.node, start.offset)
  if (end.offset === 0 && (end.node as Element).parentElement?.previousSibling) {
    range.setEndAfter((end.node as Element).parentElement!.previousSibling!)
  } else {
    range.setEnd(end.node, end.offset)
  }

  const rootRect = root.getBoundingClientRect()

  return Array.from(range.getClientRects()).map(item => {
    const position = {
      left: item.x - rootRect.x,
      top: item.y - rootRect.y,
      width: item.width,
      height: item.height
    }
    if (options.positionProcessor && typeof options.positionProcessor === 'function') {
      return options.positionProcessor(position)
    } else {
      return position
    }
  })
}

// get node and offset by index
function findStartNodeAndOffset(node: Node, position: number): RangePosition | undefined {
  let currentIndex = 0
  for (const childNode of Array.from(node.childNodes)) {
    if (childNode.nodeType === Node.TEXT_NODE) {
      const currentNodeLength = childNode.nodeValue!.length
      currentIndex += currentNodeLength
      if (currentIndex > position) {
        return {
          node: childNode as Element,
          offset: currentNodeLength - (currentIndex - position)
        }
      }
    } else {
      const currentNodeLength = childNode.textContent!.length
      currentIndex += currentNodeLength
      if (currentIndex > position) {
        const offset = currentNodeLength - (currentIndex - position)
        const res = findStartNodeAndOffset(childNode, offset)
        if (res) return res
      }
    }
  }
  return
}

// get current highlight block position
function getBlocksByMode(highlightBlocks: HighlightBlocks | HighlightBlocks[], mode: HighlightItMode, keyword: Keyword, currentIndex: number) {
  let blocks: HighlightBlockPosition[]
  if (mode === 'single' && !Array.isArray(keyword)) {
    blocks = (highlightBlocks as HighlightBlocks).blocks[currentIndex]
  } else {
    if (Array.isArray(keyword)) {
      blocks = (highlightBlocks as HighlightBlocks[]).reduce((res, item) => {
        return res.concat(item.blocks.flat())
      }, [] as HighlightBlockPosition[])
    } else {
      blocks = (highlightBlocks as HighlightBlocks).blocks.flat()
    }
  }
  return blocks
}

const defaultOptions: HighlightItOptions = {
  appendToElement: false,
  rootElementPosition: 'relative',
  highlightElement: 'div',
  highlightClassName: 'highlight-it',
  highlightElementPosition: 'absolute',
  highlightStyle: {},
  mode: 'single',
  delay: 0
}

export default class HighlightIt {
  element: Element
  options: HighlightItOptions
  resizeObserver: ResizeObserver | null = null
  keyword: string | string[] = ''
  highlightBlocks: HighlightBlocks | HighlightBlocks[] = []
  highlightBlockElements: Element[] = []
  currentIndex: number = 0
  currentBlock: HighlightBlockPosition[] = []

  constructor(element: Element, options?: Partial<HighlightItOptions>) {
    this.element = element
    this.options = options ? Object.assign(defaultOptions, options) : defaultOptions
  }

  setOptions(options: Partial<HighlightItOptions>) {
    this.options = Object.assign(this.options, options)
    this.update()
    if (this.resizeObserver) {
      this.unobserve()
      this.observe()
    }
  }

  // update the blocks
  update() {
    this.highlightBlocks = getHighlightBlock(this.keyword, this.element, this.options)
    const {
      appendToElement,
      mode
    } = this.options
    this.currentBlock = getBlocksByMode(this.highlightBlocks, mode, this.keyword, this.currentIndex)

    if (appendToElement) {
      this.appendBlocks(this.currentBlock)
    } else {
      this.clearBlocks()
    }
    return this.currentBlock
  }

  // highlight keyword
  query(keyword: Keyword) {
    if (!keyword || !keyword.length) return []
    this.keyword = keyword
    this.currentIndex = 0
    return this.update.bind(this)()
  }

  clearBlocks() {
    this.highlightBlockElements.forEach(element => {
      this.element.removeChild(element)
    })
    this.highlightBlockElements = []
  }

  // append the blocks to element
  appendBlocks(blocks: HighlightBlockPosition[]) {
    const {
      highlightElementPosition,
      highlightElement,
      highlightClassName,
      highlightStyle,
      rootElementPosition
    } = this.options
    ;(this.element as HTMLElement).style.position = rootElementPosition
    this.clearBlocks()
    blocks.forEach(block => {
      const b = document.createElement(highlightElement)
      b.setAttribute('class', highlightClassName)
      let styleStr = 'z-index: -1;'
      styleStr = Object.keys(highlightStyle).reduce((res, key) => {
        return `${res + key}: ${highlightStyle[key]};`
      }, styleStr)
      styleStr += `position: ${  highlightElementPosition  };`
      styleStr = Object.keys(block).reduce((res, key) => {
        return `${res + key}: ${block[key as keyof HighlightBlockPosition]}px;`
      }, styleStr)
      b.setAttribute('style', styleStr)
      this.element.appendChild(b)
      this.highlightBlockElements.push(b)
    })
  }

  // previous keyword
  prev() {
    const {
      appendToElement,
      mode
    } = this.options
    if (mode === 'all' || Array.isArray(this.keyword)) {
      return this.currentBlock
    }

    this.currentIndex--
    if (this.currentIndex < 0) {
      this.currentIndex = (this.highlightBlocks as HighlightBlocks).count - 1
    }
    const blocks = getBlocksByMode(this.highlightBlocks, mode, this.keyword, this.currentIndex)

    if (appendToElement) {
      this.appendBlocks(blocks)
    } else {
      this.clearBlocks()
    }
    return blocks
  }

  // next keyword
  next() {
    const {
      appendToElement,
      mode
    } = this.options
    if (mode === 'all' || Array.isArray(this.keyword)) {
      return this.currentBlock
    }

    this.currentIndex++
    if (this.currentIndex >= (this.highlightBlocks as HighlightBlocks).count) {
      this.currentIndex = 0
    }
    const blocks = getBlocksByMode(this.highlightBlocks, mode, this.keyword, this.currentIndex)

    if (appendToElement) {
      this.appendBlocks(blocks)
    } else {
      this.clearBlocks()
    }
    return blocks
  }

  // when element resize, update the position
  // observe element
  observe() {
    if (!this.resizeObserver) {
      const { delay } = this.options
      const updateFunc = delay ? debounce(this.update.bind(this), delay) : this.update.bind(this)
      this.resizeObserver = new ResizeObserver(() => {
        updateFunc()
      })
    }
    this.resizeObserver.observe(this.element)
  }

  // unobserve element
  unobserve() {
    this.resizeObserver?.unobserve(this.element)
    this.resizeObserver = null
  }
}
