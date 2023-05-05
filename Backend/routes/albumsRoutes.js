import { Router } from 'express'
import { 
    getAlbums,
    createAlbum
} from '../controllers/albumController.js'

const router = Router()

router.post("/", createAlbum)
router.get("/", getAlbums)

export default router