import { createFileRoute } from '@tanstack/react-router'
import {
  BasicComponent,
  ComponentPropsDemo,
  FragmentComponent,
  sourceCode,
} from '@/demos/01_react-components'
import ShikiHighlighter from 'react-shiki'

export const Route = createFileRoute('/01')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-5">
      {/* Basic Component */}
      <div>
        <h1 className="text-3xl">Basic Component</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        <ShikiHighlighter
          language="tsx"
          theme="github-dark"
          showLineNumbers
          className="h-full *:h-full"
        >
          {sourceCode.basicComponentSource}
        </ShikiHighlighter>
        <div className="p-5 border-4 min-h-100 border-black border-dashed">
          <BasicComponent />
        </div>
      </div>

      {/* Fragment Component */}
      <div>
        <h1 className="text-3xl">Fragment Component</h1>
        <p>
          Les mer om fragments{' '}
          <a href="https://react.dev/reference/react/Fragment" target="_blank">
            her
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
          {sourceCode.fragmentComponentSource}
        </ShikiHighlighter>
        <div className="p-5 border-4 min-h-100 border-black border-dashed">
          <FragmentComponent />
        </div>
      </div>

      {/* Component Props */}
      <div>
        <h1 className="text-3xl">Component Props</h1>
        <p>
          Les mer om props{' '}
          <a href="https://react.dev/learn/passing-props-to-a-component">her</a>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        <ShikiHighlighter
          language="tsx"
          theme="github-dark"
          showLineNumbers
          className="h-full *:h-full"
        >
          {sourceCode.componentPropsSource}
        </ShikiHighlighter>
        <div className="p-5 border-4 min-h-100 border-black border-dashed">
          <ComponentPropsDemo />
        </div>
      </div>
    </div>
  )
}
