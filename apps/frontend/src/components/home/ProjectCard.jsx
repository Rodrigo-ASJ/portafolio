import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/project/${project._id}`}
        className="group block rounded-lg border border-bg-toolbar bg-bg-surface overflow-hidden hover:border-accent-blue/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(69,161,255,0.07)]"
      >
        {/* Image */}
        <div className="aspect-video bg-bg-panel overflow-hidden">
          {project.images?.[0] ? (
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted font-mono text-sm">
              no preview
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-white group-hover:text-accent-blue transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2">
            {project.description}
          </p>

          {/* Type tags */}
          {project.type?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.type.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded bg-accent-purple/10 text-accent-purple border border-accent-purple/20"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Tech tags */}
          {project.tech?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded bg-accent-blue/10 text-accent-blue border border-accent-blue/20 font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
