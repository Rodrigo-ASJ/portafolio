import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '../services/api.js'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    setLoading(true)
    api.getProject(id)
      .then(setProject)
      .catch(() => navigate('/', { replace: true }))
      .finally(() => setLoading(false))
  }, [id, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="font-mono text-text-muted text-sm">Cargando proyecto...</span>
      </div>
    )
  }

  if (!project) return null

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back */}
        <Link
          to="/#proyectos"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-blue transition-colors mb-8 font-mono"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          volver
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {project.title}
            </h1>
            <p className="text-text-secondary text-lg">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.type?.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                {t}
              </span>
            ))}
            {project.tech?.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded bg-accent-blue/10 text-accent-blue border border-accent-blue/20 font-mono">
                {t}
              </span>
            ))}
          </div>

          {/* Image gallery */}
          {project.images?.length > 0 && (
            <div className="mb-8 space-y-3">
              <div className="rounded-lg overflow-hidden border border-bg-toolbar bg-bg-surface">
                <img
                  src={project.images[selectedImage]}
                  alt={`${project.title} - ${selectedImage + 1}`}
                  className="w-full aspect-video object-cover"
                />
              </div>
              {project.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {project.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-all ${
                        i === selectedImage ? 'border-accent-blue opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Long description */}
          {project.longDescription && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-3 font-mono">
                <span className="text-accent-purple">$</span> descripción
              </h3>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>
          )}

          {/* URL */}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-blue/10 border border-accent-blue/30 text-accent-blue rounded-lg hover:bg-accent-blue/20 transition-colors text-sm font-medium"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              Visitar proyecto
            </a>
          )}
        </motion.div>
      </div>
    </div>
  )
}
