import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { LoaderCircleIcon } from 'lucide-react'
import { Suspense, useState } from 'react'

// #region Todo Fake API
const fakeTodos = [
  { id: 1, title: 'Todo 1', completed: false },
  { id: 2, title: 'Todo 2', completed: false },
  { id: 3, title: 'Todo 3', completed: false },
]

async function getTodos() {
  // Fake delay
  await new Promise((res) => setTimeout(res, 500)) // 500ms

  return fakeTodos.map((todo) => ({ ...todo }))
}

async function toggleCompleted(id: number) {
  // Fake delay
  await new Promise((res) => setTimeout(res, 500)) // 500ms

  const todo = fakeTodos.find((todo) => todo.id === id)
  if (!todo) return
  todo.completed = !todo.completed
  return todo
}
// #endregion

// #region Event Query Options
const eventsQueryOptions = () =>
  queryOptions({
    queryKey: ['events'],
    queryFn: () =>
      fetch('https://api.tihlde.org/events').then((res) => res.json()),
  })

const eventQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['event', id],
    queryFn: () =>
      fetch(`https://api.tihlde.org/events/${id}`).then((res) => res.json()),
  })
// #endregion

// #region Todo Query Options
const todoQueryOptions = () =>
  queryOptions({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
  })

function useTodoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: toggleCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries(todoQueryOptions())
    },
  })
}
// #endregion

// #region Events Query Demo
export function EventsQueryDemo() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  return (
    <div>
      <h1>Events</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <EventsList showInfo={setSelectedEventId} />
      </Suspense>

      <div className="p-5 border-2 border-border">
        <Suspense fallback={<div>Loading...</div>}>
          {selectedEventId && <EventInfo id={selectedEventId} />}
        </Suspense>
      </div>
    </div>
  )
}

function EventsList({ showInfo }: { showInfo: (id: string) => void }) {
  const { data } = useSuspenseQuery(eventsQueryOptions())
  return (
    <>
      {data.results.slice(0, 10).map((event: any) => (
        <li key={event.id}>
          <button onClick={() => showInfo(event.id)}>Show Info</button>
          {event.title}
        </li>
      ))}
    </>
  )
}

function EventInfo({ id }: { id: string }) {
  const { data } = useSuspenseQuery(eventQueryOptions(id))

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description.substring(0, 100)}...</p>
      <img src={data.image} alt={data.image_alt} />
    </div>
  )
}
// #endregion

type Todo = (typeof fakeTodos)[number]

// #region Todo Query Demo
export function TodoQueryDemo() {
  const { isRefetching } = useQuery(todoQueryOptions())
  return (
    <div>
      <h1 className="flex items-center gap-2">
        Todos {isRefetching && <LoaderCircleIcon className="animate-spin" />}
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoList />
      </Suspense>
    </div>
  )
}

function TodoList() {
  const { data } = useSuspenseQuery(todoQueryOptions())
  return (
    <div>
      {data.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

function TodoItem({ todo }: { todo: Todo }) {
  const mutation = useTodoMutation()

  function toggleCompleted() {
    mutation.mutate(todo.id)
  }

  return (
    <div className="flex gap-2">
      <span className={todo.completed ? 'line-through' : ''}>{todo.title}</span>
      <button onClick={toggleCompleted}>Toggle Completed</button>
      {mutation.isPending && <LoaderCircleIcon className="animate-spin" />}
    </div>
  )
}
// #endregion

const todoFakeAPISource = '' /* code-source: Todo Fake API */
const eventsQueryOptionsSource = '' /* code-source: Event Query Options */
const todoQueryOptionsSource = '' /* code-source: Todo Query Options */

const eventsQueryDemoSource = '' /* code-source: Events Query Demo */
const todoQueryDemoSource = '' /* code-source: Todo Query Demo */

export const sourceCode = {
  todoFakeAPISource,
  eventsQueryOptionsSource,
  todoQueryOptionsSource,
  eventsQueryDemoSource,
  todoQueryDemoSource,
}
