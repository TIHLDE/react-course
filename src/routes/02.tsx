import { createFileRoute } from '@tanstack/react-router'
import ShikiHighlighter from 'react-shiki'
import {
  EffectHook,
  MemoHook,
  RefHook,
  StateHook,
  sourceCode,
} from '@/demos/02_react-hooks'

export const Route = createFileRoute('/02')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-5">
      {/* State Hook */}
      <div>
        <h1 className="text-3xl">useState Hook</h1>
        <p>
          Les mer om{' '}
          <a href="https://react.dev/reference/react/useState" target="_blank">
            useState her
          </a>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        <ShikiHighlighter
          language="tsx"
          theme="github-dark"
          showLineNumbers
          className="h-full *:h-full"
        >
          {sourceCode.stateHookSource}
        </ShikiHighlighter>
        <div className="p-5 border-4 min-h-100 border-black border-dashed">
          <StateHook />
        </div>
      </div>

      {/* Effect Hook */}
      <div>
        <h1 className="text-3xl">useEffect Hook</h1>
        <p>
          Les mer om{' '}
          <a href="https://react.dev/reference/react/useEffect" target="_blank">
            useEffect her
          </a>
          <br />
          Se konsollen for å se utskriften når du trykker på knappene.{' '}
          <kbd>CTRL/CMD + SHIFT + I</kbd> eller <kbd>F12</kbd>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        <ShikiHighlighter
          language="tsx"
          theme="github-dark"
          showLineNumbers
          className="h-full *:h-full"
        >
          {sourceCode.effectHookSource}
        </ShikiHighlighter>
        <div className="p-5 border-4 min-h-100 border-black border-dashed">
          <EffectHook />
        </div>
      </div>

      {/* useMemo Hook */}
      <div>
        <h1 className="text-3xl">useMemo Hook</h1>
        <p>
          Les mer om{' '}
          <a href="https://react.dev/reference/react/useMemo" target="_blank">
            useMemo her
          </a>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        <ShikiHighlighter
          language="tsx"
          theme="github-dark"
          showLineNumbers
          className="h-full *:h-full"
        >
          {sourceCode.memoHookSource}
        </ShikiHighlighter>
        <div className="p-5 border-4 min-h-100 border-black border-dashed">
          <MemoHook />
        </div>
      </div>

      {/* useRef Hook */}
      <div>
        <h1 className="text-3xl">useRef Hook</h1>
        <p>
          Les mer om{' '}
          <a href="https://react.dev/reference/react/useRef" target="_blank">
            useRef her
          </a>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        <ShikiHighlighter
          language="tsx"
          theme="github-dark"
          showLineNumbers
          className="h-full *:h-full"
        >
          {sourceCode.refHookSource}
        </ShikiHighlighter>
        <div className="p-5 border-4 min-h-100 border-black border-dashed">
          <RefHook />
        </div>
      </div>
    </div>
  )
}
