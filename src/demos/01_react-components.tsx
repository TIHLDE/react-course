import { Fragment } from 'react'

// #region Basic Component
export function BasicComponent() {
  return (
    <div>
      <h1>Basic Component</h1>
      <ul>
        <li className="ml-5 list-disc">Item 1</li>
        <li className="ml-5 list-disc">Item 2</li>
        <li className="ml-5 list-disc">Item 3</li>
      </ul>
    </div>
  )
}
// #endregion

// #region Fragment Component
export function FragmentComponent() {
  return (
    <div>
      <p>This the item in the div</p>
      <>
        <h1>This is inside an fragment</h1>
        <Fragment>
          <h2>Dette er også i en fragment</h2>
          <h3>Dette er også i en fragment</h3>
        </Fragment>
        <h4>Dette er også i en fragment</h4>
      </>
    </div>
  )
}
// #endregion

// #region Component Props Demo
export function ComponentPropsDemo() {
  return (
    <div>
      <ComponentWithProps name="John" age={20} />
      <ComponentWithProps name="Jane" age={21} />
      <ComponentWithProps name="Jim" age={22} />
    </div>
  )
}

type Props = {
  name: string
  age: number
}

function ComponentWithProps(props: Props) {
  const { name, age } = props
  return (
    <div className="p-4">
      <h1>Hello {name}</h1>
      <p>You are {age} years old</p>
    </div>
  )
}
// #endregion

const basicComponentSource = '' /* code-source: Basic Component */
const fragmentComponentSource = '' /* code-source: Fragment Component */
const componentPropsSource = '' /* code-source: Component Props Demo */

export const sourceCode = {
  basicComponentSource,
  fragmentComponentSource,
  componentPropsSource,
}
