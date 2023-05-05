import { Router } from 'express'
import { 
    getTracks,
    createTrack
} from '../controllers/trackController.js'

const router = Router()

router.post("/", createTrack)
router.get("/", getTracks) 

export default router