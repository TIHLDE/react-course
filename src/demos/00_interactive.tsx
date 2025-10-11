import { useState } from 'react'

export default function Demo() {
  const [counterCount, setCounterCount] = useState(1)

  return (
    <div className="grid grid-cols-2 gap-4 min-h-90">
      {/* Counter controller */}
      <div className="space-x-2 w-full bg-gray-200 p-4 rounded-md shadow-md space-y-2">
        <h2 className="font-bold text-xl">Create new counters</h2>
        <button onClick={() => setCounterCount(counterCount + 1)}>
          Add Counter
        </button>
        <br />
        <button onClick={() => setCounterCount(counterCount - 1)}>
          Remove Counter
        </button>
      </div>

      {/* Counter display */}
      <div className="w-full space-y-2">
        {Array.from({ length: counterCount }).map((_, index) => (
          <Counter start={index} />
        ))}
      </div>
    </div>
  )
}

type CounterProps = {
  start: number
}

function Counter({ start }: CounterProps) {
  const [count, setCount] = useState(start)

  return (
    <div className="bg-gray-200 p-4 rounded-md shadow-md w-full space-y-2 space-x-2">
      <h2 className="font-bold text-xl">Counter started at: {start}</h2>
      <h3 className="text-md font-bold">Count: {count}</h3>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
