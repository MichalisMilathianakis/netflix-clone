import { Link } from "react-router-dom";

export default function NavBar({ value, onChange }) {
  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 py-3">
        <Link to="/" className="text-2xl font-bold tracking-tight text-netflix-red">
          Netflix&nbsp;Clone
        </Link>

        <div className="flex-1" />

        <input
          type="text"
          placeholder="Search…"
          className="w-full max-w-sm p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          value={value}
          onChange={onChange}
        />
      </div>
    </header>
  );
}
