import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/04')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/04"!</div>
}
