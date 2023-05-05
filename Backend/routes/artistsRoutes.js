import { Router } from 'express'
import { 
    getArtists,
    createArtist
} from '../controllers/artistController.js'

const router = Router()

router.post("/", createArtist)
router.get("/", getArtists)

export default router