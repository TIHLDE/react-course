import { useEffect, useMemo, useRef, useState } from 'react'

// #region State Hook
export function StateHook() {
  const [count, setCount] = useState(0)
  const [inputData, setInputData] = useState('')

  function increment() {
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={increment}>Click me: {count}</button>
      <h1>Input: {inputData}</h1>
      <input
        className="border-2 border-border px-2 rounded-md"
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
    </div>
  )
}
// #endregion

// #region Effect Hook
export function EffectHook() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  useEffect(() => {
    console.log({
      count,
      count2,
    })
  }, [count])

  console.log('Rerender')

  return (
    <div>
      <h1>Count: {count}</h1>
      <h1>Count2: {count2}</h1>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setCount2(count2 + 1)}>Increment Count2</button>
    </div>
  )
}
// #endregion

// #region Memo Hook
export function MemoHook() {
  const [count, setCount] = useState(0)

  const doubled = useMemo(() => {
    return count * 2
  }, [count])

  return (
    <div>
      <h1>Count: {count}</h1>
      <h1>Doubled: {doubled}</h1>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  )
}
// #endregion

// #region Ref Hook
export function RefHook() {
  const inputRef = useRef<HTMLInputElement>(null)

  function focusInput() {
    console.log(inputRef.current)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        className="border-2 border-border px-2 rounded-md focus:ring-2 focus:ring-primary"
      />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  )
}
// #endregion

const stateHookSource = '' /* code-source: State Hook */
const effectHookSource = '' /* code-source: Effect Hook */
const memoHookSource = '' /* code-source: Memo Hook */
const refHookSource = '' /* code-source: Ref Hook */

export const sourceCode = {
  stateHookSource,
  effectHookSource,
  memoHookSource,
  refHookSource,
}
