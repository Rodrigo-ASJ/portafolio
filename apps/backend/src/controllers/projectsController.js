import Project from '../models/Project.js'

export async function getAll(req, res) {
  const { type, tech } = req.query
  const filter = {}
  if (type) filter.type = { $in: [type] }
  if (tech) filter.tech = { $in: [tech] }
  const projects = await Project.find(filter).sort({ createdAt: -1 })
  res.json(projects)
}

export async function getById(req, res) {
  const project = await Project.findById(req.params.id)
  if (!project) return res.status(404).json({ error: 'Project not found' })
  res.json(project)
}

export async function create(req, res) {
  const project = await Project.create(req.body)
  res.status(201).json(project)
}

export async function update(req, res) {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!project) return res.status(404).json({ error: 'Project not found' })
  res.json(project)
}

export async function remove(req, res) {
  const project = await Project.findByIdAndDelete(req.params.id)
  if (!project) return res.status(404).json({ error: 'Project not found' })
  res.json({ message: 'Project deleted' })
}
