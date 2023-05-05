import { Router } from 'express'
import { 
    getGenres,
    createGenre
} from '../controllers/genreController.js'

const router = Router()

router.post("/", createGenre)
router.get("/", getGenres)

export default router