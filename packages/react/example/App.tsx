import React, { useEffect, useRef, useState } from 'react'
import { HighlightIt } from '../src/index'
import type { HighlightItOptions, HighlightItRef } from '../src/index'

export default function App() {
  const [keyword, setKeyword] = useState<string>('oneself')
  const [options, setOptions] = useState<Partial<HighlightItOptions>>({
    highlightStyle: {
      'background-color': 'rgba(255, 0, 0, 0.4)'
    }
  })
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current && (inputRef.current.value = keyword)
  }, [])

  const onSearch = () => {
    inputRef.current && setKeyword(inputRef.current.value)
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
      <div className="search">
        <input
          ref={inputRef}
          type="text"
        />
        <button onClick={onSearch}>搜索</button>
      </div>
      <div className="operation">
        <button onClick={prev}>上一处</button>
        <button onClick={next}>下一处</button>
        <button onClick={showAll}>展示全部</button>
      </div>
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
