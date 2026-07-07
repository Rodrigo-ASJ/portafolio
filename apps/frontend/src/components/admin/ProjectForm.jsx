import { useState, useEffect, useRef } from 'react'

const typeOptions = [
  'desarrollo-web', 'frontend', 'backend', 'fullstack',
  'diseño-grafico', 'mobile', 'devops', 'data-science',
]

export default function ProjectForm({ initialData, onSubmit, loading }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    longDescription: '',
    type: [],
    tech: [],
    images: [],
    url: '',
  })
  const [techInput, setTechInput] = useState('')
  const widgetRef = useRef(null)

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        longDescription: initialData.longDescription || '',
        type: initialData.type || [],
        tech: initialData.tech || [],
        images: initialData.images || [],
        url: initialData.url || '',
      })
    }
  }, [initialData])

  useEffect(() => {
    if (!window.cloudinary) {
      const script = document.createElement('script')
      script.src = 'https://upload-widget.cloudinary.com/global/all.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  const openUploadWidget = () => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    if (!cloudName || !uploadPreset) {
      alert('Configura VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET en .env')
      return
    }

    if (widgetRef.current) {
      widgetRef.current.open()
      return
    }

    widgetRef.current = window.cloudinary.createUploadWidget(
      { cloudName, uploadPreset, folder: 'portafolio' },
      (error, result) => {
        if (!error && result.event === 'success') {
          setForm((prev) => ({
            ...prev,
            images: [...prev.images, result.info.secure_url],
          }))
        }
      }
    )
    widgetRef.current.open()
  }

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const toggleType = (t) => {
    setForm((prev) => ({
      ...prev,
      type: prev.type.includes(t)
        ? prev.type.filter((x) => x !== t)
        : [...prev.type, t],
    }))
  }

  const addTech = () => {
    const t = techInput.trim()
    if (t && !form.tech.includes(t)) {
      setForm((prev) => ({ ...prev, tech: [...prev.tech, t] }))
    }
    setTechInput('')
  }

  const removeTech = (t) => {
    setForm((prev) => ({ ...prev, tech: prev.tech.filter((x) => x !== t) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm text-text-secondary mb-1 font-mono">title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="w-full px-4 py-2.5 bg-bg-panel border border-bg-toolbar rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50 text-sm"
          placeholder="Nombre del proyecto"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm text-text-secondary mb-1 font-mono">description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          rows={2}
          className="w-full px-4 py-2.5 bg-bg-panel border border-bg-toolbar rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50 text-sm resize-none"
          placeholder="Descripción corta para la tarjeta"
        />
      </div>

      {/* Long description */}
      <div>
        <label className="block text-sm text-text-secondary mb-1 font-mono">longDescription</label>
        <textarea
          value={form.longDescription}
          onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
          rows={5}
          className="w-full px-4 py-2.5 bg-bg-panel border border-bg-toolbar rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50 text-sm resize-none"
          placeholder="Descripción detallada del proyecto (opcional)"
        />
      </div>

      {/* URL */}
      <div>
        <label className="block text-sm text-text-secondary mb-1 font-mono">url</label>
        <input
          type="url"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          className="w-full px-4 py-2.5 bg-bg-panel border border-bg-toolbar rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50 text-sm"
          placeholder="https://..."
        />
      </div>

      {/* Type tags */}
      <div>
        <label className="block text-sm text-text-secondary mb-2 font-mono">type</label>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleType(t)}
              className={`px-3 py-1.5 text-xs rounded border transition-all ${
                form.type.includes(t)
                  ? 'bg-accent-purple/20 border-accent-purple/40 text-accent-purple'
                  : 'bg-bg-panel border-bg-toolbar text-text-secondary hover:border-text-muted'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tech tags */}
      <div>
        <label className="block text-sm text-text-secondary mb-2 font-mono">tech</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech() } }}
            className="flex-1 px-4 py-2 bg-bg-panel border border-bg-toolbar rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50 text-sm"
            placeholder="React, Node.js, ..."
          />
          <button
            type="button"
            onClick={addTech}
            className="px-3 py-2 text-xs rounded bg-accent-blue/10 border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/20 transition-colors"
          >
            Añadir
          </button>
        </div>
        {form.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {form.tech.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-accent-blue/10 text-accent-blue border border-accent-blue/20 font-mono"
              >
                {t}
                <button type="button" onClick={() => removeTech(t)} className="hover:text-accent-red">&times;</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm text-text-secondary mb-2 font-mono">images</label>
        <button
          type="button"
          onClick={openUploadWidget}
          className="px-4 py-2 text-sm rounded bg-accent-green/10 border border-accent-green/30 text-accent-green hover:bg-accent-green/20 transition-colors"
        >
          Subir imágenes a Cloudinary
        </button>
        {form.images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {form.images.map((url, i) => (
              <div key={i} className="relative group">
                <img
                  src={url}
                  alt=""
                  className="w-24 h-16 rounded object-cover border border-bg-toolbar"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-accent-red text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
          loading
            ? 'bg-bg-toolbar text-text-muted'
            : 'bg-accent-blue/10 border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/20'
        }`}
      >
        {loading ? 'Guardando...' : initialData ? 'Actualizar proyecto' : 'Crear proyecto'}
      </button>
    </form>
  )
}
