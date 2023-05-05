import { Router } from 'express'
import { 
    getMediaTypes,
    createMediaTypes
} from '../controllers/mediaTypesController.js'

const router = Router()

router.post("/", createMediaTypes)
router.get("/", getMediaTypes)

export default router