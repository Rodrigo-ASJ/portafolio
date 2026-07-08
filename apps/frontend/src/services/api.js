const API_BASE = import.meta.env.VITE_API_URL || '/api'

function getToken() {
  return localStorage.getItem('token')
}

async function request(endpoint, options = {}) {
  const token = getToken()
  const headers = { ...options.headers }
  if (token) headers.Authorization = `Bearer ${token}`
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || 'Request failed')
  }
  return res.json()
}

export const api = {
  // Auth
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),

  // Projects (public)
  getProjects: (params) => request('/projects' + toQuery(params)),
  getProject: (id) => request(`/projects/${id}`),

  // Admin
  createProject: (data) => request('/admin/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id, data) => request(`/admin/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id) => request(`/admin/projects/${id}`, { method: 'DELETE' }),
  uploadImage: (data) => request('/admin/upload', { method: 'POST', body: JSON.stringify(data) }),
  deleteImage: (publicId) => request('/admin/images', { method: 'DELETE', body: JSON.stringify({ publicId }) }),
}

function toQuery(params) {
  if (!params) return ''
  const q = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => { if (v) q.set(k, v) })
  const s = q.toString()
  return s ? `?${s}` : ''
}
