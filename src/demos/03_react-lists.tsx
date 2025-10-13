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

const listRenderingSource = '' /* code-source: List Rendering Demo */

export const sourceCode = {
  listRenderingSource,
}
