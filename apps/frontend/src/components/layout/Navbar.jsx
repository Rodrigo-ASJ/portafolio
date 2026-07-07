import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#skills', label: 'Skills' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated, username, logout } = useAuth()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    if (!isHome && href.startsWith('#')) {
      e.preventDefault()
      window.location.href = '/' + href
      return
    }
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-body/90 backdrop-blur-md border-b border-bg-toolbar' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-mono text-accent-blue text-lg tracking-tight hover:text-accent-blue-bright transition-colors">
          ~/portafolio
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          {isAuthenticated ? (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-bg-toolbar">
              <Link
                to="/admin/projects"
                className="text-sm text-accent-blue hover:text-accent-blue-bright transition-colors"
              >
                Admin ({username})
              </Link>
              <button onClick={logout} className="text-sm text-accent-red hover:text-red-400 transition-colors">
                Salir
              </button>
            </div>
          ) : (
            <Link
              to="/admin/login"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors ml-4 pl-4 border-l border-bg-toolbar"
            >
              Admin
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-bg-surface border-b border-bg-toolbar">
          <div className="px-4 py-3 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 border-t border-bg-toolbar">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <Link to="/admin/projects" className="text-sm text-accent-blue">Admin ({username})</Link>
                  <button onClick={logout} className="text-sm text-accent-red">Salir</button>
                </div>
              ) : (
                <Link to="/admin/login" className="text-sm text-accent-blue">Admin</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
