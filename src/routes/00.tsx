import { createFileRoute } from '@tanstack/react-router'
import Demo from '../demos/00_interactive'
import Demo2 from '../demos/00_interactive_2'

export const Route = createFileRoute('/00')({
  component: Page,
})

function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold">00. Interactive Demo</h1>
      <div className="m-10 p-5 border-4 min-h-100 border-black border-dashed">
        <Demo />
      </div>
      <div className="m-10 p-5 border-4 min-h-100 border-black border-dashed">
        <Demo2 />
      </div>
    </div>
  )
}
