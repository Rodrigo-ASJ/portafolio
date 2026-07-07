import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminDashboard() {
  const { isAuthenticated } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    api.getProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este proyecto?')) return
    setDeleting(id)
    try {
      await api.deleteProject(id)
      setProjects(projects.filter((p) => p._id !== id))
    } catch (err) {
      alert(err.message)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white font-mono">
              <span className="text-accent-purple">$</span> admin
            </h1>
            <p className="text-sm text-text-secondary">Gestión de proyectos</p>
          </div>
          <Link
            to="/admin/projects/new"
            className="px-4 py-2 bg-accent-blue/10 border border-accent-blue/30 text-accent-blue rounded-lg hover:bg-accent-blue/20 transition-colors text-sm font-medium"
          >
            + Nuevo proyecto
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-text-muted font-mono text-sm">Cargando...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 border border-bg-toolbar rounded-lg bg-bg-surface">
            <p className="text-text-muted mb-4 font-mono text-sm">No hay proyectos todavía</p>
            <Link
              to="/admin/projects/new"
              className="text-accent-blue hover:text-accent-blue-bright text-sm"
            >
              Crear primer proyecto →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-lg border border-bg-toolbar bg-bg-surface hover:border-accent-blue/20 transition-all"
              >
                {/* Thumb */}
                <div className="w-16 h-12 rounded overflow-hidden bg-bg-panel shrink-0">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">—</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm truncate">{p.title}</h3>
                  <p className="text-text-muted text-xs truncate">{p.description}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <Link
                    to={`/admin/projects/${p._id}/edit`}
                    className="px-3 py-1.5 text-xs rounded bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 transition-colors"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
                    disabled={deleting === p._id}
                    className="px-3 py-1.5 text-xs rounded bg-accent-red/10 text-accent-red hover:bg-accent-red/20 transition-colors disabled:opacity-50"
                  >
                    {deleting === p._id ? '...' : 'Eliminar'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
