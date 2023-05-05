import { Router } from 'express'
import { 
    getPlaylistTracks,
    createPlaylistTrack,
    getTracksByPlaylistId
} from '../controllers/playlistTrackController.js'

const router = Router()

router.get("/", getPlaylistTracks)
router.post("/:playlistId/tracks", createPlaylistTrack)
router.get("/:playlistId/tracks", getTracksByPlaylistId)

export default router