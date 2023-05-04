import { Router } from 'express'
import { 
    getAlbums,
    createAlbum
} from '../controllers/albumController.js'

const router = Router()

router.get("/", getAlbums)
router.post("/", createAlbum)

export default router