import { Router } from 'express'
import { 
    getPlaylists,
    createPlaylist
} from '../controllers/playlistController.js'

const router = Router()

router.post("/", createPlaylist)
router.get("/", getPlaylists)

export default router