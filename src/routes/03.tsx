import {
  ImportanceOfKeyPropIndex,
  ImportanceOfKeyPropRandom,
  ImportanceOfKeyPropValue,
  ListRenderingDemo,
  RawListRenderingDemo,
  sourceCode,
} from '@/demos/03_react-lists'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import ShikiHighlighter from 'react-shiki'

export const Route = createFileRoute('/03')({
  component: RouteComponent,
})

function RouteComponent() {
  const [keyPropDemo, setKeyPropDemo] = useState<'random' | 'index' | 'value'>(
    'random',
  )
  return (
    <div className="p-5">
      {/* List Rendering Demo */}
      <div>
        <h1 className="text-3xl">List Rendering Demo</h1>
        <p>
          Les mer om{' '}
          <a href="https://react.dev/learn/rendering-lists" target="_blank">
            "Rendering List" her
          </a>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <ShikiHighlighter
            language="tsx"
            theme="github-dark"
            showLineNumbers
            className="h-full *:h-full"
          >
            {sourceCode.listRenderingSource}
          </ShikiHighlighter>
          <div className="p-5 border-4 min-h-100 border-black border-dashed">
            <ListRenderingDemo />
          </div>
        </div>
      </div>

      {/* Raw List Rendering Demo */}
      <div>
        <h1 className="text-3xl">Verdier i React komponenter</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <ShikiHighlighter
            language="tsx"
            theme="github-dark"
            showLineNumbers
            className="h-full *:h-full"
          >
            {sourceCode.rawListRenderingSource}
          </ShikiHighlighter>
          <div className="p-5 border-4 min-h-100 border-black border-dashed">
            <RawListRenderingDemo />
          </div>
        </div>
      </div>

      {/* Importance of key prop */}
      <div>
        <h1 className="text-3xl">Importance of key prop</h1>
        <p>
          Les mer om{' '}
          <a
            href="https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
            target="_blank"
          >
            "Keeping List Items in Order with Key" her
          </a>
        </p>
        <ShikiHighlighter
          language="tsx"
          theme="github-dark"
          showLineNumbers
          className="h-full *:h-full my-5"
        >
          {sourceCode.valuesSource}
        </ShikiHighlighter>
        <div className="flex gap-2">
          <button onClick={() => setKeyPropDemo('random')}>Random</button>
          <button onClick={() => setKeyPropDemo('index')}>Index</button>
          <button onClick={() => setKeyPropDemo('value')}>Value</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <ShikiHighlighter
            language="tsx"
            theme="github-dark"
            showLineNumbers
            className="h-full *:h-full"
          >
            {keyPropDemo === 'index'
              ? sourceCode.keyPropIndexSource
              : keyPropDemo === 'value'
                ? sourceCode.keyPropValueSource
                : sourceCode.keyPropRandomSource}
          </ShikiHighlighter>
          <div className="p-5 border-4 min-h-100 border-black border-dashed">
            {keyPropDemo === 'random' && (
              <ImportanceOfKeyPropRandom key="random" />
            )}
            {keyPropDemo === 'index' && (
              <ImportanceOfKeyPropIndex key="index" />
            )}
            {keyPropDemo === 'value' && (
              <ImportanceOfKeyPropValue key="value" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
