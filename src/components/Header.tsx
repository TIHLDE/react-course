import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-4 flex items-center gap-10 bg-gray-800 text-white shadow-lg">
      <Link to="/" className="text-white no-underline">
        Cheatsheet
      </Link>
      <Link to="/00" className="text-white no-underline">
        00. Interactive Demo
      </Link>
      <Link to="/01" className="text-white no-underline">
        01. React Components
      </Link>
      <Link to="/02" className="text-white no-underline">
        02. React Hooks
      </Link>
      <Link to="/03" className="text-white no-underline">
        03. React With Lists
      </Link>
      <Link to="/04" className="text-white no-underline">
        04. React With TanStack Query
      </Link>
    </header>
  )
}
