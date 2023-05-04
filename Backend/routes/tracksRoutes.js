import { Router } from 'express'
import { 
    getTracks,
    createTrack
} from '../controllers/trackController.js'

const router = Router()

router.get("/", getTracks)
router.post("/", createTrack)

export default router