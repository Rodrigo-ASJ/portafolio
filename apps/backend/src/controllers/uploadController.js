import cloudinary from '../config/cloudinary.js'

export async function uploadImage(req, res) {
  try {
    const { image } = req.body
    if (!image) {
      return res.status(400).json({ error: 'No image data provided' })
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: 'portafolio',
      resource_type: 'image',
    })

    res.json({ url: result.secure_url, publicId: result.public_id })
  } catch (err) {
    console.error('Upload error:', err)
    res.status(500).json({ error: 'Upload failed' })
  }
}

export async function deleteImage(req, res) {
  try {
    const { publicId } = req.body
    if (!publicId) {
      return res.status(400).json({ error: 'No publicId provided' })
    }

    await cloudinary.uploader.destroy(publicId)
    res.json({ message: 'Image deleted' })
  } catch (err) {
    console.error('Delete error:', err)
    res.status(500).json({ error: 'Delete failed' })
  }
}
