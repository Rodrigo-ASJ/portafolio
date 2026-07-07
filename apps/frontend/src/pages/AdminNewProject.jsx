import { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import ProjectForm from '../components/admin/ProjectForm.jsx'

export default function AdminNewProject() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      await api.createProject(data)
      navigate('/admin/projects')
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-blue transition-colors mb-6 font-mono"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            volver
          </Link>

          <h1 className="text-2xl font-bold text-white mb-8 font-mono">
            <span className="text-accent-purple">$</span> nuevo proyecto
          </h1>

          <div className="rounded-lg border border-bg-toolbar bg-bg-surface p-6">
            <ProjectForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
