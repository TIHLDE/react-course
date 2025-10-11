import { useState } from 'react'

export default function Demo2() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full space-y-10">
      {/* Counter controller */}

      <h1 className="text-center w-full text-7xl font-bold">{count}</h1>

      {/* Counter display */}
      <div className="w-full flex flex-wrap gap-4 justify-center">
        <Counter count={count} setCount={setCount} increment={1} />
        <Counter count={count} setCount={setCount} increment={2} />
        <Counter count={count} setCount={setCount} increment={3} />
        <Counter count={count} setCount={setCount} increment={4} />
        <Counter count={count} setCount={setCount} increment={5} />
      </div>
    </div>
  )
}

type CounterProps = {
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
  increment: number
}

function Counter({ count, setCount, increment }: CounterProps) {
  return (
    <div className="bg-gray-200 p-4 rounded-md shadow-md min-w-40">
      <h2 className="font-bold text-xl">Counter: {count}</h2>
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setCount(count - increment)}>
          - {increment}
        </button>
        <button onClick={() => setCount(count + increment)}>
          + {increment}
        </button>
      </div>
    </div>
  )
}
