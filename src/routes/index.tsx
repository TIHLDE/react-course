import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  useCallback,
  useMemo,
  memo,
  Suspense,
  useReducer,
  useLayoutEffect,
  useImperativeHandle,
  use,
} from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import ShikiHighlighter from 'react-shiki'

export const Route = createFileRoute('/')({
  component: MainPage,
})

const delay = (ms: number, data: string): Promise<string> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms))

// #region Basic Component
function BasicComponent() {
  return (
    <div className="p-4 bg-blue-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Basic Component</h3>
      <p>This is a simple functional component that returns JSX.</p>
    </div>
  )
}
// #endregion

// #region Props Example
interface PropsExampleProps {
  title: string
  description: string
  count?: number
}
//                                          Count has a default value of 0
//                                          if nothing is passed
function PropsExample({ title, description, count = 0 }: PropsExampleProps) {
  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="mb-2">{description}</p>
      <p className="text-sm text-gray-600">Count: {count}</p>
    </div>
  )
}

function PropsDemo() {
  return (
    // Here we consume the component above passing in the props
    <PropsExample
      title="Props Example"
      description="Props allow you to pass data from parent to child components."
      count={42}
    />
  )
}
// #endregion

// #region State Example
function StateExample() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  return (
    <div className="p-4 bg-yellow-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">useState Hook</h3>
      <div className="space-y-2">
        <div>
          <p>Count: {count}</p>
          <button
            onClick={() => setCount(count + 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Increment
          </button>
        </div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="px-3 py-1 border rounded"
          />
          <p>Hello, {name || 'Anonymous'}!</p>
        </div>
      </div>
    </div>
  )
}
// #endregion

// #region useEffect Example
function EffectExample() {
  const [count, setCount] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    console.log(`Count: ${count}`)
  }, [count])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="p-4 bg-purple-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">useEffect Hook</h3>
      <div className="space-y-2">
        <p>Count: {count} (prints to console)</p>
        <p>Window width: {windowWidth}px</p>
        <p>(try resizing the window it will not print to console)</p>
        <button
          onClick={() => setCount(count + 1)}
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Increment
        </button>
      </div>
    </div>
  )
}
// #endregion

// #region useRef Example
function RefExample() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')

  function focusInput() {
    inputRef.current?.focus()
  }

  return (
    <div className="p-4 bg-red-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">useRef Hook</h3>
      <div className="space-y-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="This input can be focused programmatically"
          className="px-3 py-1 border rounded"
        />
        <button
          onClick={focusInput}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Focus Input
        </button>
      </div>
    </div>
  )
}
// #endregion

// #region Context Example
type ThemeContextType = {
  theme: string
  toggleTheme: () => void
}

const ThemeContext = createContext<{
  theme: string
  toggleTheme: () => void
}>({} as ThemeContextType)

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function ContextExample() {
  const context = useContext(ThemeContext)

  if (!context) return null

  const { theme, toggleTheme } = context

  return (
    <div
      className={cn(
        'p-4 rounded-lg',
        theme === 'light' && 'bg-gray-100',
        theme === 'dark' && 'bg-gray-800 text-white',
      )}
    >
      <h3 className="text-lg font-semibold mb-2">useContext Hook</h3>
      <div className="space-y-2">
        <p>Current theme: {theme}</p>
        <button
          onClick={toggleTheme}
          className={cn(
            'px-3 py-1 rounded hover:opacity-80',
            theme === 'light' && 'bg-gray-800 text-white',
            theme === 'dark' && 'bg-gray-100 text-gray-800',
          )}
        >
          Toggle Theme
        </button>
      </div>
    </div>
  )
}
// #endregion

// #region useCallback Example
function CallbackExample() {
  const [count, setCount] = useState(0)

  // This function is recreated on every render
  // @ts-expect-error - This method is intentionally not used
  function regularFunction() {
    console.log('Regular function called')
  }

  // This function is memoized and only recreated when dependencies change
  const memoizedFunction = useCallback(() => {
    console.log('Memoized function called')
  }, [count])

  return (
    <div className="p-4 bg-indigo-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">useCallback Hook</h3>
      <div className="space-y-2">
        <p>Count: {count}</p>
        <div className="space-x-2">
          <button
            onClick={() => setCount(count + 1)}
            className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Increment Count
          </button>
          <button
            onClick={memoizedFunction}
            className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Call Memoized Function
          </button>
        </div>
        <p className="text-sm text-gray-600">
          The useCallback hook is probably the most useless hook in React.{' '}
          <a
            href="https://tkdodo.eu/blog/the-useless-use-callback"
            target="_blank"
            className="text-blue-600 underline"
          >
            Read more about why here
          </a>
        </p>
      </div>
    </div>
  )
}
// #endregion

// #region useMemo Example
function MemoExample() {
  const [count, setCount] = useState(0)
  const [multiplier, setMultiplier] = useState(1)

  // Memoized expensive calculation that only runs when dependencies change
  const memoizedValue = useMemo(() => {
    console.log('Expensive calculation running...')
    return count * multiplier * 1000000
  }, [count, multiplier])
  //  ^^^^   ^^^^ This is the dependencies

  return (
    <div className="p-4 bg-pink-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">useMemo Hook</h3>
      <div className="space-y-2">
        <p>Count: {count}</p>
        <p>Multiplier: {multiplier}</p>
        <p>Memoized Value: {memoizedValue}</p>
        <div className="space-x-2">
          <button
            onClick={() => setCount(count + 1)}
            className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Increment Count
          </button>
          <button
            onClick={() => setMultiplier(multiplier + 1)}
            className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Increment Multiplier
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Check console to see when expensive calculation runs.
        </p>
      </div>
    </div>
  )
}
// #endregion

// #region Custom Hook Example
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => setCount((c) => c + 1), [])
  const decrement = useCallback(() => setCount((c) => c - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])

  return { count, increment, decrement, reset }
}

function CustomHookExample() {
  const { count, increment, decrement, reset } = useCounter(0)

  return (
    <div className="p-4 bg-teal-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Custom Hook</h3>
      <div className="space-y-2">
        <p>Count: {count}</p>
        <div className="space-x-2">
          <button
            onClick={decrement}
            className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Decrement
          </button>
          <button
            onClick={increment}
            className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Increment
          </button>
          <button
            onClick={reset}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
        <p className="text-sm text-gray-600">
          This counter uses a custom hook that encapsulates counter logic.
          Encapsulating logic in a custom hook is a good way to reuse logic in
          multiple components.
        </p>
      </div>
    </div>
  )
}
// #endregion

// #region Event Handling Example
function EventHandlingExample() {
  const [message, setMessage] = useState('')

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMessage(`Button clicked! Event type: ${event.type}`)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(`Input changed: ${event.target.value}`)
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('Form submitted!')
  }

  return (
    <div className="p-4 bg-orange-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Event Handling</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">{message || 'No events yet'}</p>
        <div className="space-y-2">
          <button
            onClick={handleClick}
            className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Click Me
          </button>
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Type something..."
            className="px-3 py-1 border rounded"
          />
          <form onSubmit={handleFormSubmit}>
            <button
              type="submit"
              className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Submit Form
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
// #endregion

// #region Conditional Rendering Example
function ConditionalRenderingExample() {
  const [isVisible, setIsVisible] = useState(true)
  const [user, setUser] = useState<{
    name: string
    isLoggedIn: boolean
  } | null>(null)

  const toggleVisibility = () => setIsVisible(!isVisible)
  const toggleUser = () =>
    setUser(user ? null : { name: 'John Doe', isLoggedIn: true })

  return (
    <div className="p-4 bg-cyan-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Conditional Rendering</h3>
      <div className="space-y-4">
        <div>
          <button
            onClick={toggleVisibility}
            className="px-3 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-600"
          >
            {isVisible ? 'Hide' : 'Show'} Content
          </button>

          {/* Conditional rendering using the && operator */}
          {/* && will only render the component if the left hand side is truthy */}
          {isVisible && (
            <p className="mt-2 text-sm">
              This content is conditionally rendered!
            </p>
          )}
        </div>

        <div>
          <button
            onClick={toggleUser}
            className="px-3 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-600"
          >
            {user ? 'Logout' : 'Login'}
          </button>

          {/* Conditional rendering using the ternary operator */}
          {/*
            This is the same as:
            if (user) {
              return <p className="mt-2 text-sm">Welcome, {user.name}!</p>
            } else {
              return <p className="mt-2 text-sm">Please log in</p>
            }

            The ternary operator is a shorthand way to write an if/else statement.

            condition ? true : false
          */}
          {user ? (
            <p className="mt-2 text-sm">Welcome, {user.name}!</p>
          ) : (
            <p className="mt-2 text-sm">Please log in</p>
          )}
        </div>
      </div>
    </div>
  )
}
// #endregion

// #region List Rendering Example
function ListRenderingExample() {
  const [items, setItems] = useState(['Apple', 'Banana', 'Cherry'])
  const [newItem, setNewItem] = useState('')

  function addItem() {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()])
      setNewItem('')
    }
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <div className="p-4 bg-lime-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">List Rendering</h3>
      <div className="space-y-2">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
            className="px-3 py-1 border rounded flex-1"
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
          />
          <button
            onClick={addItem}
            className="px-3 py-1 bg-lime-500 text-white rounded hover:bg-lime-600"
          >
            Add
          </button>
        </div>
        <ul className="space-y-1">
          {/* Loop over all items and map them to a list of elements */}
          {items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white p-2 rounded"
            >
              <span>{item}</span>
              <button
                onClick={() => removeItem(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
// #endregion

// #region Error Boundary
function BuggyComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('This is a demo error!')
  }

  return (
    <div className="p-4 bg-green-50 rounded-lg">
      Yay the component worked normally!
    </div>
  )
}

function ErrorFallback({ error }: FallbackProps) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Something went wrong!
      </h3>
      <p className="text-red-600">
        An error occurred in this component:
        <br />
        <code className="bg-black/5 p-1">{error.message}</code>
      </p>
    </div>
  )
}

function ErrorBoundaryDemo() {
  const [keyId, setKeyId] = useState(0)

  const shouldThrow = useMemo(() => keyId % 2 === 0, [keyId])

  return (
    <div className="p-4 bg-blue-50 rounded-lg flex flex-col gap-2">
      {/* This component will catch errors thrown from the children and display the fallback UI */}
      <ErrorBoundary key={keyId} fallbackRender={ErrorFallback}>
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>

      <button onClick={() => setKeyId(keyId + 1)}>Toggle Error</button>
    </div>
  )
}
// #endregion

// #region useReducer Example
interface CounterState {
  count: number
  step: number
}

type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'setStep'; step: number }

function counterReducer(
  state: CounterState,
  action: CounterAction,
): CounterState {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step }
    case 'decrement':
      return { ...state, count: state.count - state.step }
    case 'reset':
      return { ...state, count: 0 }
    case 'setStep':
      return { ...state, step: action.step }
    default:
      return state
  }
}

function ReducerExample() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 })

  return (
    <div className="p-4 bg-violet-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">useReducer Hook</h3>
      <div className="space-y-2">
        <p>Count: {state.count}</p>
        <p>Step: {state.step}</p>
        <div className="space-x-2">
          <button
            onClick={() => dispatch({ type: 'increment' })}
            className="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-600"
          >
            +{state.step}
          </button>
          <button
            onClick={() => dispatch({ type: 'decrement' })}
            className="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-600"
          >
            -{state.step}
          </button>
          <button
            onClick={() => dispatch({ type: 'reset' })}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Step:</label>
          <input
            type="number"
            value={state.step}
            onChange={(e) =>
              dispatch({ type: 'setStep', step: Number(e.target.value) })
            }
            className="px-2 py-1 border rounded w-20"
          />
        </div>
      </div>
      <p className="text-sm text-gray-600">
        useReducer is often used to create complex state machines. Where events
        is dispatched to modify the state.
      </p>
    </div>
  )
}
// #endregion

// #region useLayoutEffect Example
function LayoutEffectExample() {
  const [count, setCount] = useState(0)
  const [width, setWidth] = useState(0)
  const divRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth)
    }
  }, [count])

  return (
    <div className="p-4 bg-emerald-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">useLayoutEffect Hook</h3>
      <div className="space-y-2">
        <p>Count: {count}</p>
        <p>Div width: {width}px</p>
        <button
          onClick={() => setCount(count + 1)}
          className="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600"
        >
          Increment
        </button>
        <div
          ref={divRef}
          className="p-2 bg-emerald-100 rounded border"
          style={{ width: 200 + count * 10 }}
        >
          This div's width changes with count
        </div>
        <p className="text-sm text-gray-600">
          useLayoutEffect runs synchronously after all DOM mutations but before
          the browser paints.
        </p>
      </div>
    </div>
  )
}
// #endregion

// #region useImperativeHandle Example
interface FancyInputRef {
  focus: () => void
  clear: () => void
  getValue: () => string
}

function FancyInput({
  placeholder,
  ref,
}: {
  placeholder?: string
  ref?: React.Ref<FancyInputRef>
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      setValue('')
      inputRef.current?.focus()
    },
    getValue: () => value,
  }))

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="px-3 py-1 border rounded"
    />
  )
}

function ImperativeHandleExample() {
  const inputRef = useRef<FancyInputRef>(null)

  const handleFocus = () => inputRef.current?.focus()
  const handleClear = () => inputRef.current?.clear()
  const handleGetValue = () => {
    const value = inputRef.current?.getValue()
    alert(`Current value: ${value}`)
  }

  return (
    <div className="p-4 bg-rose-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">useImperativeHandle Hook</h3>
      <div className="space-y-2">
        <FancyInput ref={inputRef} placeholder="Type something..." />
        <div className="space-x-2">
          <button
            onClick={handleFocus}
            className="px-3 py-1 bg-rose-500 text-white rounded hover:bg-rose-600"
          >
            Focus
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1 bg-rose-500 text-white rounded hover:bg-rose-600"
          >
            Clear
          </button>
          <button
            onClick={handleGetValue}
            className="px-3 py-1 bg-rose-500 text-white rounded hover:bg-rose-600"
          >
            Get Value
          </button>
        </div>
        <p className="text-sm text-gray-600">
          useImperativeHandle allows you to customize the instance value that is
          exposed to parent components when using ref.
        </p>
      </div>
    </div>
  )
}
// #endregion

// #region React memo Example
interface ExpensiveComponentProps {
  value: number
  multiplier: number
}

const ExpensiveComponent = memo(
  ({ value, multiplier }: ExpensiveComponentProps) => {
    console.log('ExpensiveComponent rendered')

    const result = useMemo(() => {
      console.log('Expensive calculation running...')
      let sum = 0
      for (let i = 0; i < value * 100000; i++) {
        sum += i
      }
      return sum * multiplier
    }, [value, multiplier])

    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">React.memo Component</h3>
        <p>Value: {value}</p>
        <p>Multiplier: {multiplier}</p>
        <p>Result: {result}</p>
      </div>
    )
  },
)

function AdvancedMemoExample() {
  const [value, setValue] = useState(1)
  const [multiplier, setMultiplier] = useState(1)
  const [otherState, setOtherState] = useState(0)

  return (
    <div className="p-4 bg-purple-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">React.memo & Performance</h3>
      <div className="space-y-4">
        <div className="space-x-2">
          <button
            onClick={() => setValue(value + 1)}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Increment Value
          </button>
          <button
            onClick={() => setMultiplier(multiplier + 1)}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Increment Multiplier
          </button>
          <button
            onClick={() => setOtherState(otherState + 1)}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Other State: {otherState}
          </button>
        </div>
        <ExpensiveComponent value={value} multiplier={multiplier} />
        <p className="text-sm text-gray-600">
          Check console to see when expensive component re-renders. It should
          only re-render when value or multiplier changes.
        </p>
      </div>
    </div>
  )
}
// #endregion

// #region Lazy Loading Example
function SlowComponent({ promise }: { promise: Promise<string> }) {
  // Simulate a slow component
  const data = use(promise)

  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Slow Component</h3>
      <p>This component was loaded asynchronously!</p>
      <p>{data}</p>
    </div>
  )
}

function LoadingExample() {
  const [showSlow, setShowSlow] = useState(false)

  const promise = useMemo(() => delay(2000, 'Hello World'), [showSlow])
  return (
    <div className="p-4 bg-yellow-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">
        Slow Component with Suspense
      </h3>
      <div className="space-y-4">
        <button
          onClick={() => setShowSlow(!showSlow)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          {showSlow ? 'Hide' : 'Load'} Slow Component
        </button>

        {showSlow && (
          // The suspense boundary will display a fallback component while waiting for any slow children to load.
          <Suspense
            fallback={
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
                <p className="text-center mt-2">Loading component...</p>
              </div>
            }
          >
            <SlowComponent promise={promise} />
          </Suspense>
        )}
      </div>
    </div>
  )
}
// #endregion

// #region Custom Hook with useReducer
function useToggle(initialValue: boolean = false) {
  const [state, dispatch] = useReducer((state: boolean) => !state, initialValue)

  const toggle = useCallback(() => dispatch(), [])
  const setTrue = useCallback(() => {
    if (!state) dispatch()
  }, [state])
  const setFalse = useCallback(() => {
    if (state) dispatch()
  }, [state])

  return [state, { toggle, setTrue, setFalse }] as const
}

function CustomHookWithReducerExample() {
  const [isOn, { toggle, setTrue, setFalse }] = useToggle(false)

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">
        Custom Hook with useReducer
      </h3>
      <div className="space-y-2">
        <p>State: {isOn ? 'ON' : 'OFF'}</p>
        <div className="space-x-2">
          <button
            onClick={toggle}
            className="px-3 py-1 bg-slate-500 text-white rounded hover:bg-slate-600"
          >
            Toggle
          </button>
          <button
            onClick={setTrue}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Set ON
          </button>
          <button
            onClick={setFalse}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Set OFF
          </button>
        </div>
      </div>
    </div>
  )
}
// #endregion

const basicComponentSource = '' /* code-source: Basic Component */
const propsSource = '' /* code-source: Props Example */
const stateSource = '' /* code-source: State Example */
const useEffectSource = '' /* code-source: useEffect Example */
const useRefSource = '' /* code-source: useRef Example */
const contextSource = '' /* code-source: Context Example */
const useCallbackSource = '' /* code-source: useCallback Example */
const useMemoSource = '' /* code-source: useMemo Example */
const customHookSource = '' /* code-source: Custom Hook Example */
const eventHandlingSource = '' /* code-source: Event Handling Example */
const conditionalSource = '' /* code-source: Conditional Rendering Example */
const listRenderingSource = '' /* code-source: List Rendering Example */
const errorBoundariesSource = '' /* code-source: Error Boundary */
const useReducerSource = '' /* code-source: useReducer Example */
const useLayoutEffectSource = '' /* code-source: useLayoutEffect Example */
const imperativeHandleSource = '' /* code-source: useImperativeHandle Example */
const reactMemoSource = '' /* code-source: React memo Example */
const lazyLoadingSource = '' /* code-source: Lazy Loading Example */
const reducerSource = '' /* code-source: Custom Hook with useReducer */

function ConceptRenderer({
  children,
  title,
  explaination,
  sourceCode,
}: {
  children: React.ReactNode
  title: string
  explaination: React.ReactNode
  sourceCode?: string
}) {
  return (
    <div>
      <h3 className="text-xl font-medium text-gray-700 mb-3">{title}</h3>
      {children}
      <div className="mt-2 p-3 bg-gray-100 rounded text-sm space-y-2">
        <div>
          <strong>Explanation:</strong> {explaination}
        </div>
        {sourceCode && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>View Source</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[calc(100vw_-_5%)]! md:max-w-[calc(100vw_-_20%)]! w-full">
              <DialogHeader>
                <DialogTitle>Source Code: {title}</DialogTitle>
                <DialogDescription>
                  The source code for the '{title}' example.
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-[70vh] overflow-y-auto rounded-md">
                <ShikiHighlighter
                  className="w-full"
                  language="tsx"
                  theme="github-dark"
                  showLineNumbers
                >
                  {sourceCode}
                </ShikiHighlighter>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

function MainPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          React Concepts Guide/Cheatsheet
        </h1>
        <p className="text-lg text-gray-600">
          A comprehensive guide to React concepts from basic to advanced level,
          with interactive examples and explanations.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Basic Concepts */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
            Basic Concepts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ConceptRenderer
              title="Components & JSX"
              explaination="Components are the building blocks
                of React. They are functions that return JSX (JavaScript XML) to
                describe what should be rendered."
              sourceCode={basicComponentSource}
            >
              <BasicComponent />
            </ConceptRenderer>

            <ConceptRenderer
              title="Props"
              explaination="Props are read-only data passed down from parent components. They make components reusable and configurable."
              sourceCode={propsSource}
            >
              <PropsDemo />
            </ConceptRenderer>

            <ConceptRenderer
              title="State"
              explaination="State allows components to manage internal data that can change over time. The useState hook is the most common way to add state to functional components."
              sourceCode={stateSource}
            >
              <StateExample />
            </ConceptRenderer>

            <ConceptRenderer
              title="Event Handling"
              explaination="React uses synthetic events that wrap native browser events. Event handlers are functions that respond to user interactions."
              sourceCode={eventHandlingSource}
            >
              <EventHandlingExample />
            </ConceptRenderer>

            <ConceptRenderer
              title="Conditional Rendering"
              explaination="You can conditionally render components using JavaScript operators like &&, ternary operators, or if statements."
              sourceCode={conditionalSource}
            >
              <ConditionalRenderingExample />
            </ConceptRenderer>

            <ConceptRenderer
              title="List Rendering"
              explaination="Use the map() function to render lists of components. Always provide a unique key prop for each item to help React efficiently update the DOM."
              sourceCode={listRenderingSource}
            >
              <ListRenderingExample />
            </ConceptRenderer>
          </div>
        </section>

        {/* Intermediate Concepts */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-green-500 pb-2">
            Intermediate Concepts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ConceptRenderer
              title="useEffect Hook"
              explaination="useEffect lets you perform side effects in functional components. It's equivalent to componentDidMount, componentDidUpdate, and componentWillUnmount combined."
              sourceCode={useEffectSource}
            >
              <EffectExample />
            </ConceptRenderer>

            <ConceptRenderer
              title="useRef Hook"
              explaination="useRef returns a mutable ref object that persists for the full lifetime of the component. It's commonly used to access DOM elements directly."
              sourceCode={useRefSource}
            >
              <RefExample />
            </ConceptRenderer>

            <ConceptRenderer
              title="Context API"
              explaination="Context provides a way to pass data through the component tree without having to pass props down manually at every level."
              sourceCode={contextSource}
            >
              <ThemeProvider>
                <ContextExample />
              </ThemeProvider>
            </ConceptRenderer>

            <ConceptRenderer
              title="useCallback Hook"
              explaination="useCallback returns a memoized version of the callback that only changes if one of the dependencies has changed. It's useful for optimizing child components that rely on reference equality."
              sourceCode={useCallbackSource}
            >
              <CallbackExample />
            </ConceptRenderer>

            <ConceptRenderer
              title="useMemo Hook"
              explaination="useMemo returns a memoized value. It only recalculates the value when one of the dependencies changes. This optimization helps avoid expensive calculations on every render."
              sourceCode={useMemoSource}
            >
              <MemoExample />
            </ConceptRenderer>

            <ConceptRenderer
              title="Custom Hooks"
              explaination="Custom hooks are JavaScript functions that start with 'use' and may call other hooks. They let you extract component logic into reusable functions."
              sourceCode={customHookSource}
            >
              <CustomHookExample />
            </ConceptRenderer>
          </div>
        </section>

        {/* Advanced Concepts */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-purple-500 pb-2">
            Advanced Concepts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ConceptRenderer
              title="useReducer Hook"
              explaination="useReducer is an alternative to useState for managing complex state logic. It's especially useful when you have multiple sub-values or when the next state depends on the previous one."
              sourceCode={useReducerSource}
            >
              <ReducerExample />
            </ConceptRenderer>

            <ConceptRenderer
              title="useLayoutEffect Hook"
              explaination="useLayoutEffect runs synchronously after all DOM mutations but before the browser paints. Use it when you need to read layout from the DOM and synchronously re-render."
              sourceCode={useLayoutEffectSource}
            >
              <LayoutEffectExample />
            </ConceptRenderer>

            <ConceptRenderer
              title="useImperativeHandle Hook"
              explaination="useImperativeHandle allows you to customize the instance value that is exposed to parent components when using ref. This is useful for exposing imperative methods."
              sourceCode={imperativeHandleSource}
            >
              <ImperativeHandleExample />
            </ConceptRenderer>

            <ConceptRenderer
              title="React.memo & Performance"
              explaination="React.memo is a higher-order component that memoizes the result of a component. It only re-renders if its props have changed, helping with performance optimization."
              sourceCode={reactMemoSource}
            >
              <AdvancedMemoExample />
            </ConceptRenderer>

            <ConceptRenderer
              title="Suspense"
              explaination="Suspense provides a fallback UI while any of the child components are loading asynchronously."
              sourceCode={lazyLoadingSource}
            >
              <LoadingExample />
            </ConceptRenderer>

            <ConceptRenderer
              title="Error Boundaries"
              explaination="Error boundaries catch JavaScript errors anywhere in the component tree, log those errors, and display a fallback UI instead of crashing the entire app."
              sourceCode={errorBoundariesSource}
            >
              <ErrorBoundaryDemo />
            </ConceptRenderer>

            <ConceptRenderer
              title="Custom Hook with useReducer"
              explaination="Custom hooks can use useReducer internally to provide more complex state management patterns while maintaining a simple API."
              sourceCode={reducerSource}
            >
              <CustomHookWithReducerExample />
            </ConceptRenderer>
          </div>
        </section>
      </div>
    </div>
  )
}
