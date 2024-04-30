import React, { useRef, forwardRef, useEffect, useImperativeHandle } from 'react'
import HighlightItCore from '@highlight-it/core'
import type { ReactNode } from 'react'
import type { HighlightItOptions, HighlightBlockPosition } from '@highlight-it/core'

export interface HighlightItProps {
  options?: Partial<HighlightItOptions>
  keyword: string | string[]
  children?: ReactNode
}

export interface HighlightItRef {
  prev: () => HighlightBlockPosition[] | undefined
  next: () => HighlightBlockPosition[] | undefined
}

export const HighlightIt = forwardRef<HighlightItRef, HighlightItProps>(({ options, keyword, children }, ref) => {
  const container = useRef(null)
  const highlightItInstance = useRef<HighlightItCore>()

  useEffect(() => {
    if (container.current) {
      highlightItInstance.current = new HighlightItCore(container.current, {
        appendToElement: true,
        ...options
      })
      highlightItInstance.current.observe()
      if (keyword) {
        highlightItInstance.current.query(keyword)
      }
    }
    return () => {
      highlightItInstance.current?.unobserve()
      highlightItInstance.current?.clearBlocks()
    }
  }, [options])

  useEffect(() => {
    highlightItInstance.current?.query(keyword)
  }, [keyword])

  useImperativeHandle<HighlightItRef, HighlightItRef>(
    ref,
    () => {
      return {
        prev: () => highlightItInstance.current?.prev(),
        next: () => highlightItInstance.current?.next()
      }
    },
    []
  )

  return <div ref={container}>{children}</div>
})
export type { RangePosition, HighlightBlockPosition, HighlightItOptions, HighlightBlocks } from '@highlight-it/core'
