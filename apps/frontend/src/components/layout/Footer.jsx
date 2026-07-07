export default function Footer() {
  return (
    <footer className="border-t border-bg-toolbar py-6 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-text-muted">
        <span>© {new Date().getFullYear()} — portafolio</span>
        <span className="font-mono text-xs">
          {'<'}built with React + Tailwind{'/>'}
        </span>
      </div>
    </footer>
  )
}
