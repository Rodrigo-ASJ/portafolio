import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const socials = [
  { name: 'GitHub', href: 'https://github.com/Rodrigo-ASJ', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rofer-dev', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { name: 'Email', href: 'mailto:arxrjf@gmail.com', icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch {
      setError('Error al enviar. Intenta de nuevo.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contacto" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2 font-mono">
            <span className="text-accent-purple">$</span> contacto
          </h2>
          <div className="w-12 h-0.5 bg-accent-blue rounded mb-10" />

          <div className="grid md:grid-cols-2 gap-10">
            {/* Left - Contact info */}
            <div className="space-y-6">
              <p className="text-text-secondary">
                <strong>¿Tienes un proyecto en mente?</strong>
                <span className="block">Estoy abierto a colaborar y nuevas oportunidades.</span>
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-accent-green font-mono">$ email:</span>
                  <span className="text-text-secondary">arxrjf@gmail.com</span>
                </div>
                {/*
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-accent-blue font-mono">$</span>
                  <span className="text-text-secondary">+34 123 456 789</span>
                </div> */}
              </div>

              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-bg-toolbar bg-bg-surface hover:border-accent-blue/30 hover:bg-bg-panel transition-all text-text-secondary hover:text-accent-blue"
                    title={s.name}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d={s.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-bg-panel border border-bg-toolbar rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50 text-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Tu email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-bg-panel border border-bg-toolbar rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50 text-sm"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Tu mensaje"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-bg-panel border border-bg-toolbar rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50 text-sm resize-none"
              />
              <button
                type="submit"
                disabled={sending || sent}
                className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                  sent
                    ? 'bg-accent-green/20 text-accent-green border border-accent-green/30'
                    : 'bg-accent-blue/10 border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/20'
                }`}
              >
                {sending ? 'Enviando...' : sent ? '¡Mensaje enviado!' : 'Enviar mensaje'}
              </button>
              {error && <p className="text-sm text-accent-red">{error}</p>}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
