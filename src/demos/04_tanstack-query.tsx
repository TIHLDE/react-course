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

// #region Show Query Options
const showsQueryOptions = () =>
  queryOptions({
    queryKey: ['shows'],
    queryFn: async () => {
      const response = await fetch('https://api.tvmaze.com/shows?page=0')
      if (!response.ok) throw new Error('Failed to fetch shows')
      const shows = (await response.json()) as Show[]
      return shows.sort((a, b) => b.weight - a.weight)
    },
  })

const showQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['show', id],
    queryFn: async () => {
      const response = await fetch(`https://api.tvmaze.com/shows/${id}`)
      if (!response.ok) throw new Error('Failed to fetch show')
      return response.json() as Promise<Show>
    },
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

// #region Shows Query Demo
export function ShowsQueryDemo() {
  const [selectedShowId, setSelectedShowId] = useState<number | null>(null)
  return (
    <div>
      <h1>TV Shows</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ShowsList showInfo={setSelectedShowId} />
      </Suspense>

      <div className="p-5 border-2 border-border">
        <Suspense fallback={<div>Loading...</div>}>
          {selectedShowId && <ShowInfo id={selectedShowId} />}
        </Suspense>
      </div>
    </div>
  )
}

function ShowsList({ showInfo }: { showInfo: (id: number) => void }) {
  const { data } = useSuspenseQuery(showsQueryOptions())
  return (
    <>
      {data.slice(0, 10).map((show) => (
        <li key={show.id}>
          <button onClick={() => showInfo(show.id)}>Show Info</button>
          {show.name}
        </li>
      ))}
    </>
  )
}

function ShowInfo({ id }: { id: number }) {
  const { data } = useSuspenseQuery(showQueryOptions(id))

  return (
    <div>
      <h1>{data.name}</h1>
      <p>
        {data.summary?.replace(/<[^>]*>/g, '').substring(0, 100) ??
          'No summary available.'}
        ...
      </p>
      {data.image?.medium && <img src={data.image.medium} alt={data.name} />}
    </div>
  )
}
// #endregion

type Show = {
  id: number
  name: string
  weight: number
  summary: string | null
  image: {
    medium: string
  } | null
}

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
const showsQueryOptionsSource = '' /* code-source: Show Query Options */
const todoQueryOptionsSource = '' /* code-source: Todo Query Options */

const showsQueryDemoSource = '' /* code-source: Shows Query Demo */
const todoQueryDemoSource = '' /* code-source: Todo Query Demo */

export const sourceCode = {
  todoFakeAPISource,
  showsQueryOptionsSource,
  todoQueryOptionsSource,
  showsQueryDemoSource,
  todoQueryDemoSource,
}
