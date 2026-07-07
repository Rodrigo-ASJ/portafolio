import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="sobre-mi" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2 font-mono">
            <span className="text-accent-purple">$</span> sobre-mi
          </h2>
          <div className="w-12 h-0.5 bg-accent-blue rounded mb-10" />

          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            {/* Photo */}
            <div className="shrink-0">
              <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-accent-blue/30 ring-2 ring-accent-blue/10">
                <img
                  src="/images/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center text-5xl font-mono text-accent-blue bg-bg-panel">
                        ??
                      </div>
                    `
                  }}
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 space-y-4">
              <p className="text-text-primary leading-relaxed">
                Soy un desarrollador full-stack con experiencia en la creación de aplicaciones web modernas.
                Me apasiona el diseño limpio, el código eficiente y resolver problemas complejos.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Trabajo con tecnologías como React, Node.js, MongoDB, y Tailwind CSS para construir
                productos digitales desde la idea hasta el despliegue.
              </p>
              <a
                href="/cv.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-accent-green/10 border border-accent-green/30 text-accent-green rounded-lg hover:bg-accent-green/20 transition-colors text-sm font-medium"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M12 18v-6" />
                  <path d="M9 15l3 3 3-3" />
                </svg>
                Descargar CV
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
