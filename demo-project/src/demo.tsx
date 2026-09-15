import { useState } from "react";


function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1)
  }

  return (
      <button onClick={increment}>Count: {count}</button>
  );
}



export function RenderDemo() {
  return (
    <Counter />
  )
}
