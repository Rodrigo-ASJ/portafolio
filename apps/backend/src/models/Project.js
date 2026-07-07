import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  longDescription: { type: String, default: '' },
  type: [{ type: String, trim: true }],
  tech: [{ type: String, trim: true }],
  images: [{ type: String }],
  url: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.model('Project', projectSchema)
