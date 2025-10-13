import {
  EventsQueryDemo,
  sourceCode,
  TodoQueryDemo,
} from '@/demos/04_tanstack-query'
import { createFileRoute } from '@tanstack/react-router'
import ShikiHighlighter from 'react-shiki'

export const Route = createFileRoute('/04')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">TanStack Query</h1>
      <p className="mb-10">
        TanStack Query sin dokumentasjon finner du{' '}
        <a
          href="https://tanstack.com/query/v5/docs/framework/react/overview"
          target="_blank"
        >
          her
        </a>
      </p>
      {/* Query Options */}
      <div>
        <h1 className="text-3xl">Query Options</h1>
        <p>
          Les mer om{' '}
          <a
            href="https://tanstack.com/query/v5/docs/framework/react/guides/query-options"
            target="_blank"
          >
            "Query Options" her
          </a>
        </p>
        <ShikiHighlighter
          language="tsx"
          theme="github-dark"
          showLineNumbers
          className="h-full *:h-full"
        >
          {sourceCode.eventsQueryOptionsSource}
        </ShikiHighlighter>
      </div>

      {/* Events Query Demo */}
      <div>
        <h1 className="text-3xl">Events Query Demo</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <ShikiHighlighter
            language="tsx"
            theme="github-dark"
            showLineNumbers
            className="h-full *:h-full"
          >
            {sourceCode.eventsQueryDemoSource}
          </ShikiHighlighter>
          <div className="p-5 border-4 min-h-100 border-black border-dashed">
            <EventsQueryDemo />
          </div>
        </div>
      </div>

      {/* Fake API and Query Options */}
      <div>
        <h1 className="text-3xl">Fake API and Query Options</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <ShikiHighlighter
            language="tsx"
            theme="github-dark"
            showLineNumbers
            className="h-full *:h-full"
          >
            {sourceCode.todoFakeAPISource}
          </ShikiHighlighter>
          <ShikiHighlighter
            language="tsx"
            theme="github-dark"
            showLineNumbers
            className="h-full *:h-full"
          >
            {sourceCode.todoQueryOptionsSource}
          </ShikiHighlighter>
        </div>
      </div>

      {/* Todo Query Demo */}
      <div>
        <h1 className="text-3xl">Todo Query Demo</h1>
        <ul className="*:list-disc *:ml-5">
          <li>
            <a
              href="https://tanstack.com/query/v5/docs/framework/react/guides/suspense"
              target="_blank"
            >
              Suspense og useSuspenseQuery
            </a>
          </li>
          <li>
            <a
              href="https://tanstack.com/query/v5/docs/framework/react/guides/mutations"
              target="_blank"
            >
              Query Mutations
            </a>
          </li>
          <li>
            <a
              href="https://tanstack.com/query/v5/docs/framework/react/guides/query-invalidation"
              target="_blank"
            >
              Query Invalidation
            </a>
          </li>
          <li>
            <a
              href="https://tanstack.com/query/v5/docs/framework/react/guides/queries"
              target="_blank"
            >
              Mer om queries
            </a>
          </li>
        </ul>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <ShikiHighlighter
            language="tsx"
            theme="github-dark"
            showLineNumbers
            className="h-full *:h-full"
          >
            {sourceCode.todoQueryDemoSource}
          </ShikiHighlighter>
          <div className="p-5 border-4 min-h-100 border-black border-dashed">
            <TodoQueryDemo />
          </div>
        </div>
      </div>
    </div>
  )
}
