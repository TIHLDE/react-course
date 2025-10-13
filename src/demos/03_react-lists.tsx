import { useEffect, useState } from 'react'

// #region List Rendering Demo
const items = ['Apple', 'Banana', 'Orange']

export function ListRenderingDemo() {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
// #endregion

// #region Raw List Rendering Demo

// prettier-ignore
const elementItems = [
  <li>Apple</li>,
  <li>Banana</li>,
  <li>Orange</li>,
]

export function RawListRenderingDemo() {
  function functionThatReturnsValue() {
    return 'Hello World, from function'
  }

  return (
    <>
      <div>
        <ul>{'Hello World'}</ul>
        <ul>{0}</ul>
        <ul>{true}</ul>
        <ul>{false}</ul>
        <ul>{['Hello', 'World']}</ul>
        <ul>{null}</ul>
        <ul>{undefined}</ul>
        <ul>{functionThatReturnsValue()}</ul>
      </div>

      <div>
        <ul>{elementItems}</ul>
      </div>
    </>
  )
}
// #endregion

// #region Values
const values = ['Apple', 'Banana', 'Orange', 'Peach', 'Pear']
// #endregion

// #region Importance of key prop random

export function ImportanceOfKeyPropRandom() {
  const [toggleFirst, setToggleFirst] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setToggleFirst((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      {toggleFirst
        ? values.map((item) => (
            <input
              type="text"
              defaultValue={item}
              key={Math.random()}
              className="border-2 border-border px-2 rounded-md"
            />
          ))
        : values
            .slice(1, values.length)
            .map((item) => (
              <input
                type="text"
                defaultValue={item}
                key={Math.random()}
                className="border-2 border-border px-2 rounded-md"
              />
            ))}
    </div>
  )
}
// #endregion

// #region Importance of key prop index
export function ImportanceOfKeyPropIndex() {
  const [toggleFirst, setToggleFirst] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setToggleFirst((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      {toggleFirst
        ? values.map((item, index) => (
            <input
              type="text"
              defaultValue={item}
              key={index}
              className="border-2 border-border px-2 rounded-md"
            />
          ))
        : values
            .slice(1, values.length)
            .map((item, index) => (
              <input
                type="text"
                defaultValue={item}
                key={index}
                className="border-2 border-border px-2 rounded-md"
              />
            ))}
    </div>
  )
}
// #endregion

// #region Importance of key prop value
export function ImportanceOfKeyPropValue() {
  const [toggleFirst, setToggleFirst] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setToggleFirst((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      {toggleFirst
        ? values.map((item) => (
            <input
              type="text"
              defaultValue={item}
              key={item}
              className="border-2 border-border px-2 rounded-md"
            />
          ))
        : values
            .slice(1, values.length)
            .map((item) => (
              <input
                type="text"
                defaultValue={item}
                key={item}
                className="border-2 border-border px-2 rounded-md"
              />
            ))}
    </div>
  )
}
// #endregion

const listRenderingSource = '' /* code-source: List Rendering Demo */
const rawListRenderingSource = '' /* code-source: Raw List Rendering Demo */
const keyPropRandomSource = '' /* code-source: Importance of key prop random */
const keyPropIndexSource = '' /* code-source: Importance of key prop index */
const keyPropValueSource = '' /* code-source: Importance of key prop value */
const valuesSource = '' /* code-source: Values */

export const sourceCode = {
  listRenderingSource,
  rawListRenderingSource,
  keyPropRandomSource,
  keyPropIndexSource,
  keyPropValueSource,
  valuesSource,
}
