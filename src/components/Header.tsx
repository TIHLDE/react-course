import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-4 flex items-center gap-10 bg-gray-800 text-white shadow-lg">
      <Link to="/">Main</Link>
      <Link to="/00">00. Interactive Demo</Link>
      <Link to="/01">01. React Components</Link>
      <Link to="/02">02. React Hooks</Link>
      <Link to="/03">03. React With Lists</Link>
      <Link to="/04">04. React With TanStack Query</Link>
    </header>
  )
}
