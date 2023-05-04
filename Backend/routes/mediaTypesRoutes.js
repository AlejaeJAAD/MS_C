import { Router } from 'express'
import { 
    getMediaTypes,
    createMediaTypes
} from '../controllers/mediaTypesController.js'

const router = Router()

router.get("/", getMediaTypes)
router.post("/", createMediaTypes)

export default router