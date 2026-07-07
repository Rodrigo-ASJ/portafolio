import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/admin/projects" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await api.login(form)
      login(data.token, data.username)
      navigate('/admin/projects')
    } catch (err) {
      setError(err.message || 'Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm mx-4"
      >
        <div className="rounded-lg border border-bg-toolbar bg-bg-surface p-6">
          <h1 className="text-xl font-bold text-white mb-1 font-mono">
            <span className="text-accent-purple">$</span> admin login
          </h1>
          <p className="text-sm text-text-secondary mb-6">Ingresa tus credenciales</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Usuario"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              className="w-full px-4 py-2.5 bg-bg-panel border border-bg-toolbar rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50 text-sm"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-4 py-2.5 bg-bg-panel border border-bg-toolbar rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50 text-sm"
            />
            {error && <p className="text-sm text-accent-red">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                loading
                  ? 'bg-bg-toolbar text-text-muted'
                  : 'bg-accent-blue/10 border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/20'
              }`}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
