import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '../../services/api.js'
import ProjectCard from './ProjectCard.jsx'

const typeOptions = [
  'desarrollo-web', 'frontend', 'backend', 'fullstack',
  'diseño-grafico', 'mobile', 'devops', 'data-science',
]

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('')
  const [filterTech, setFilterTech] = useState('')

  useEffect(() => {
    setLoading(true)
    api.getProjects({ type: filterType, tech: filterTech })
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [filterType, filterTech])

  const clearFilters = () => {
    setFilterType('')
    setFilterTech('')
  }

  const hasFilters = filterType || filterTech

  return (
    <section id="proyectos" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2 font-mono">
            <span className="text-accent-purple">$</span> proyectos
          </h2>
          <div className="w-12 h-0.5 bg-accent-blue rounded mb-6" />

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8 items-center">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1.5 text-sm bg-bg-panel border border-bg-toolbar rounded text-text-primary focus:outline-none focus:border-accent-blue/50"
            >
              <option value="">Todos los tipos</option>
              {typeOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Filtrar por tecnología..."
              value={filterTech}
              onChange={(e) => setFilterTech(e.target.value)}
              className="px-3 py-1.5 text-sm bg-bg-panel border border-bg-toolbar rounded text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50"
            />
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-accent-red hover:text-red-400 transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-12 text-text-muted font-mono text-sm">Cargando proyectos...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 text-text-muted font-mono text-sm">
              {hasFilters ? 'No hay proyectos con esos filtros' : 'No hay proyectos todavía'}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <ProjectCard key={p._id} project={p} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
