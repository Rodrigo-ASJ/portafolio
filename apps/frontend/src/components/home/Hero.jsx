import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const codeLines = [
  { text: 'import { Developer } from "./portafolio"', color: 'text-accent-purple', delay: 0 },
  { text: '', color: '', delay: 0.15 },
  { text: 'const dev = new Developer(', color: 'text-accent-blue', delay: 0.3 },
  { text: '  name: "Rodrigo",', color: 'text-text-primary', delay: 0.45 },
  { text: '  role: "Full-Stack Developer",', color: 'text-text-primary', delay: 0.6 },
  { text: '  stack: ["React", "Node", "MongoDB"],', color: 'text-accent-green', delay: 0.75 },
  { text: '  location: "Tu Ciudad",', color: 'text-text-primary', delay: 0.9 },
  { text: '})', color: 'text-accent-blue', delay: 1.05 },
  { text: '', color: '', delay: 1.15 },
  { text: 'dev.availableForWork(); // true', color: 'text-accent-green', delay: 1.3 },
]

export default function Hero() {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-14">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Code editor panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5"
          >
            <div className="rounded-lg overflow-hidden border border-bg-toolbar bg-bg-surface shadow-2xl">
              {/* Window header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-bg-panel border-b border-bg-toolbar">
                <span className="w-3 h-3 rounded-full bg-accent-red" />
                <span className="w-3 h-3 rounded-full bg-accent-orange" />
                <span className="w-3 h-3 rounded-full bg-accent-green" />
                <span className="ml-3 text-xs text-text-muted font-mono">dev.js</span>
              </div>
              {/* Code content */}
              <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: line.delay, duration: 0.4 }}
                    className={line.color || 'h-4'}
                  >
                    {line.text && <span>{line.text}</span>}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-2/5 text-center lg:text-left"
          >
            <p className="text-accent-blue font-mono text-sm mb-2">$ Hola, mundo!</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Soy <span className="text-accent-blue-bright">Tu Nombre</span>
            </h1>
            <p className="text-lg text-text-secondary mb-6">
              Full-Stack Developer apasionado por crear experiencias digitales únicas.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#proyectos"
                onClick={(e) => { e.preventDefault(); document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="px-5 py-2.5 bg-accent-blue/10 border border-accent-blue/30 text-accent-blue rounded-lg hover:bg-accent-blue/20 transition-colors font-medium text-sm"
              >
                Ver proyectos
              </a>
              <a
                href="#contacto"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="px-5 py-2.5 bg-bg-panel border border-bg-hover text-text-primary rounded-lg hover:bg-bg-hover transition-colors font-medium text-sm"
              >
                Contactar
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
