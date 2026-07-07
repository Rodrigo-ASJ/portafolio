import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { create, update, remove } from '../controllers/projectsController.js'
import { uploadImage, deleteImage } from '../controllers/uploadController.js'

const router = Router()

router.use(authMiddleware)

router.post('/projects', create)
router.put('/projects/:id', update)
router.delete('/projects/:id', remove)
router.post('/upload', uploadImage)
router.delete('/images', deleteImage)

export default router
